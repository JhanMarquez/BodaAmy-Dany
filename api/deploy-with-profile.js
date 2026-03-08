#!/usr/bin/env node
/**
 * Despliega la Function App usando el perfil de publicación (no requiere Azure CLI).
 * 1. En Azure Portal → tu Function App (boda-amy-dany) → "Obtener perfil de publicación"
 * 2. Guarda el archivo como: api/publish-profile.xml
 * 3. Ejecuta: node deploy-with-profile.js
 */

const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

const apiDir = path.resolve(__dirname);
const zipPath = path.join(apiDir, 'deploy.zip');

// Aceptar publish-profile.xml o cualquier archivo .PublishSettings en esta carpeta
let profilePath = path.join(apiDir, 'publish-profile.xml');
if (!fs.existsSync(profilePath)) {
  const files = fs.readdirSync(apiDir);
  const pub = files.find((f) => f.endsWith('.PublishSettings'));
  if (pub) profilePath = path.join(apiDir, pub);
}
if (!fs.existsSync(profilePath)) {
  console.error('No se encontró publish-profile.xml ni ningún .PublishSettings');
  console.error('Descárgalo desde Azure Portal y guárdalo en la carpeta api.');
  process.exit(1);
}

const xml = fs.readFileSync(profilePath, 'utf8');
// Buscar el bloque del perfil Zip Deploy (tiene la URL SCM correcta)
const zipBlock = xml.match(/publishProfile[^>]*publishMethod="ZipDeploy"[^>]*>/);
const block = zipBlock ? zipBlock[0] : xml;
const publishUrlMatch = block.match(/publishUrl="([^"]+)"/);
const userNameMatch = block.match(/userName="([^"]+)"/);
const userPWDMatch = block.match(/userPWD="([^"]+)"/);
if (!publishUrlMatch || !userNameMatch || !userPWDMatch) {
  console.error('El perfil de publicación no tiene publishUrl, userName o userPWD.');
  process.exit(1);
}
const publishUrl = publishUrlMatch[1].replace(/:443$/, '');
const userName = userNameMatch[1];
const userPWD = userPWDMatch[1];
const scmUrl = publishUrl.startsWith('http') ? publishUrl : `https://${publishUrl}`;

// Crear zip (excluir archivos sensibles y el propio zip)
const filesToZip = ['host.json', 'package.json', 'RegistroConfirmacion', 'node_modules'];
if (fs.existsSync(path.join(apiDir, 'package-lock.json'))) filesToZip.push('package-lock.json');

try {
  fs.existsSync(zipPath) && fs.unlinkSync(zipPath);
  execSync(
    `cd "${apiDir}" && zip -r deploy.zip ${filesToZip.join(' ')} -x "*.git*" -x "local.settings.json" -x "*.DS_Store" -x "publish-profile.xml" -x "deploy-with-profile.js" -x "publicar.sh"`,
    { stdio: 'inherit' }
  );
} catch (e) {
  console.error('Error al crear el zip:', e.message);
  process.exit(1);
}

const zipBuffer = fs.readFileSync(zipPath);
const auth = Buffer.from(`${userName}:${userPWD}`).toString('base64');

const deployUrl = scmUrl.includes('/') ? `${scmUrl.replace(/\/+$/, '')}/api/zipdeploy` : `https://${scmUrl}/api/zipdeploy`;
const url = new URL(deployUrl);
const options = {
  hostname: url.hostname,
  port: 443,
  path: url.pathname + url.search,
  method: 'POST',
  headers: {
    'Authorization': `Basic ${auth}`,
    'Content-Type': 'application/zip',
    'Content-Length': zipBuffer.length
  }
};

const req = https.request(options, (res) => {
  let body = '';
  res.on('data', (chunk) => { body += chunk; });
  res.on('end', () => {
    fs.unlinkSync(zipPath);
    if (res.statusCode >= 200 && res.statusCode < 300) {
      console.log('Despliegue correcto.');
      const destMatch = xml.match(/destinationAppUrl="([^"]+)"/);
      const baseUrl = destMatch ? destMatch[1] : `https://${url.hostname.replace('.scm.', '.')}`;
      console.log('URL de la función:', baseUrl.replace(/\/+$/, '') + '/RegistroConfirmacion');
    } else {
      console.error('Error', res.statusCode, body || res.statusMessage);
      if (res.statusCode === 401) {
        console.error('\nSi es 401: en Azure Portal → Function App → Configuración → General → activa "Credenciales de publicación locales" (o "Local credentials") y vuelve a intentar.');
      }
      if (res.statusCode === 404) {
        console.error('\n404: Tu Function App está en plan "Consumo flexible" (Flex). Ese plan NO admite zip deploy.');
        console.error('Despliega con Azure CLI desde la Terminal:');
        console.error('  1. Instala Azure CLI: https://learn.microsoft.com/cli/azure/install-azure-cli-macos');
        console.error('  2. az login');
        console.error('  3. cd ' + apiDir);
        console.error('  4. func azure functionapp publish boda-amy-dany');
      }
      process.exit(1);
    }
  });
});
req.on('error', (e) => {
  fs.existsSync(zipPath) && fs.unlinkSync(zipPath);
  console.error('Error de conexión:', e.message);
  process.exit(1);
});
req.write(zipBuffer);
req.end();
