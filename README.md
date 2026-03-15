# ⚡ Picolas Control

Panel para controlar **celulares con Termux** desde un navegador.

Permite ejecutar comandos en celulares conectados a través de una interfaz web.

---

# 🧠 Arquitectura

El sistema funciona con dos componentes:

```
Celular 1
SERVER + PANEL WEB
↓
Celular 2
AGENT conectado
```

El **server** recibe conexiones de agentes y permite ejecutar comandos desde el navegador.

---

# 📁 Estructura del proyecto

```
picolas-control
│
├ agent
│   └ agent.js
│
├ server
│   ├ index.js
│   └ panel
│       └ index.html
│
├ setup.sh
├ start-server.sh
├ start-agent.sh
│
├ package.json
└ README.md
```

---

# 📱 Requisitos

Instalar **Termux** en los celulares.

---

# 🚀 Instalación

## 1️⃣ Instalar paquetes básicos

En **cada celular** abrir Termux y ejecutar:

```
pkg update
pkg upgrade
pkg install git nodejs
```

---

# 📱 CELULAR 1 — SERVER

Este celular ejecutará el **panel web**.

## Clonar el proyecto

```
git clone https://github.com/TU_USUARIO/picolas-control
cd picolas-control
```

Dar permisos a scripts:

```
chmod +x *.sh
```

Instalar dependencias:

```
./setup.sh
```

Elegir opción:

```
1
```

(Iniciar SERVER)

---

## Iniciar servidor

```
./start-server.sh
```

El panel quedará disponible en:

```
http://localhost:3000
```

Para ver la IP del celular:

```
ip a
```

Buscar algo como:

```
111.111.1.111
```

Panel accesible desde la red:

```
http://111.111.1.111:3000
```

---

# 📱 CELULAR 2 — AGENT

Este celular ejecutará comandos enviados desde el panel.

## Clonar proyecto

```
git clone https://github.com/TU_USUARIO/picolas-control
cd picolas-control
```

Dar permisos:

```
chmod +x *.sh
```

Instalar agent:

```
./setup.sh
```

Elegir opción:

```
2
```

---

## Configurar conexión al server

Editar archivo:

```
nano agent/.env
```

Ejemplo:

```
SERVER_URL=http://111.111.1.111:3000
DEVICE_NAME=celular2
```

Guardar.

---

## Iniciar agent

```
./start-agent.sh
```

Si todo funciona verás:

```
Conectado al panel
```

---

# 🌐 Usar el panel

Abrir navegador en la misma red:

```
http://IP_DEL_SERVER:3000
```

Ejemplo:

```
http://111.111.1.111:3000
```

Desde ahí podrás ejecutar comandos en los celulares conectados.

---

# 💻 Ejemplo

Ejecutar comando:

```
ls
```

Resultado en terminal web:

```
agent.js
node_modules
package.json
```

---

# 🔧 Comandos útiles

Reiniciar server:

```
pm2 restart picolas-server
```

Reiniciar agent:

```
pm2 restart picolas-agent
```

Ver procesos:

```
pm2 list
```

---

# 🚀 Ideas futuras

* Terminal real tipo SSH
* Estadísticas de CPU / RAM
* Batería del celular
* Subir archivos
* Interfaz más avanzada
* Sistema de autenticación

---

# 👨‍💻 Autor

Picolas
