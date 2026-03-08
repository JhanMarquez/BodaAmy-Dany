const sql = require('mssql');

const config = {
  server: process.env.SQL_SERVER || '',
  database: process.env.SQL_DATABASE || '',
  user: process.env.SQL_USER || '',
  password: process.env.SQL_PASSWORD || '',
  options: {
    encrypt: true,
    trustServerCertificate: false,
    enableArithAbort: true
  }
};

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

module.exports = async function (context, req) {
  // CORS preflight
  if (req.method === 'OPTIONS') {
    context.res = { status: 204, headers: corsHeaders, body: '' };
    return;
  }

  context.res = {
    headers: corsHeaders
  };

  if (req.method !== 'POST') {
    context.res.status = 405;
    context.res.body = { error: 'Método no permitido' };
    return;
  }

  let nombre = (req.body && req.body.nombre) ? String(req.body.nombre).trim() : '';
  let cantidad = req.body && req.body.cantidad != null ? parseInt(req.body.cantidad, 10) : 0;

  if (!nombre || nombre.length > 100) {
    context.res.status = 400;
    context.res.body = { error: 'Nombre requerido (máx. 100 caracteres)' };
    return;
  }
  if (isNaN(cantidad) || cantidad < 1 || cantidad > 20) {
    context.res.status = 400;
    context.res.body = { error: 'Cantidad debe ser entre 1 y 20' };
    return;
  }

  if (!config.server || !config.database || !config.user || !config.password) {
    context.log.error('Faltan variables de entorno: SQL_SERVER, SQL_DATABASE, SQL_USER, SQL_PASSWORD');
    context.res.status = 500;
    context.res.body = { error: 'Error de configuración del servidor' };
    return;
  }

  let pool;
  try {
    pool = await sql.connect(config);
    const result = await pool.request()
      .input('fecha', sql.Date, new Date())
      .input('nombre', sql.VarChar(100), nombre)
      .input('cantidad_personas', sql.Int, cantidad)
      .query(`
        INSERT INTO registro_personas (fecha, nombre, cantidad_personas)
        VALUES (@fecha, @nombre, @cantidad_personas);
        SELECT SCOPE_IDENTITY() AS id;
      `);
    context.res.status = 200;
    context.res.body = { ok: true, id: result.recordset[0].id };
  } catch (err) {
    context.log.error('SQL error:', err);
    context.res.status = 500;
    context.res.body = { error: 'No se pudo guardar la confirmación. Intenta más tarde.' };
  } finally {
    if (pool) try { pool.close(); } catch (_) {}
  }
};
