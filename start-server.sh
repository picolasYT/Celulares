#!/data/data/com.termux/files/usr/bin/bash

echo "Iniciando Picolas Control Server..."

cd server

pm2 start index.js --name picolas-server

pm2 save

echo ""
echo "Servidor iniciado."
echo ""
echo "Abrir en navegador:"
echo "http://localhost:3000"