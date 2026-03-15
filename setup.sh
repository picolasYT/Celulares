#!/data/data/com.termux/files/usr/bin/bash

echo "================================="
echo "   PICOLAS CONTROL INSTALLER"
echo "================================="
echo ""
echo "Selecciona modo de instalación:"
echo ""
echo "1) SERVER (panel web)"
echo "2) AGENT (celular controlado)"
echo ""
read -p "Opción: " mode

echo ""
echo "Actualizando Termux..."

pkg update -y
pkg upgrade -y

echo ""
echo "Instalando paquetes necesarios..."

pkg install nodejs git -y

echo ""
echo "Instalando PM2..."

npm install -g pm2

if [ "$mode" = "1" ]; then

    echo ""
    echo "Instalando SERVER..."

    cd server

    npm install express socket.io

    echo ""
    echo "SERVER instalado."
    echo ""

    echo "Para iniciar el server:"
    echo "./start-server.sh"

elif [ "$mode" = "2" ]; then

    echo ""
    echo "Instalando AGENT..."

    cd agent

    npm install socket.io-client

    echo ""
    echo "AGENT instalado."
    echo ""

    echo "Para iniciar el agent:"
    echo "./start-agent.sh"

else

    echo "Opción inválida."

fi