#!/data/data/com.termux/files/usr/bin/bash

echo "Iniciando Picolas Agent..."

cd agent

pm2 start agent.js --name picolas-agent

pm2 save

echo ""
echo "Agent iniciado."