#!/bin/bash
# Carga nvm y Node, luego publica la función en Azure.
# Antes: instala Azure CLI (https://learn.microsoft.com/cli/azure/install-azure-cli-macos)
#        y ejecuta: az login

export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"

cd "$(dirname "$0")"
echo "Publicando en boda-amy-dany..."
func azure functionapp publish boda-amy-dany --javascript
