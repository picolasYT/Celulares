const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(__dirname + "/panel"));

let devices = {};

io.on("connection", (socket) => {

    const device = socket.handshake.auth.device;

    if (device) {
        devices[device] = socket.id;
        console.log("Dispositivo conectado:", device);
    }

    socket.on("result", (data) => {
        io.emit("terminal-output", data);
    });

    socket.on("disconnect", () => {

        for (let d in devices) {
            if (devices[d] === socket.id) {
                delete devices[d];
            }
        }

        console.log("Dispositivo desconectado");
    });

});

app.get("/devices", (req, res) => {
    res.json(Object.keys(devices));
});

app.get("/exec/:device/:cmd", (req, res) => {

    const { device, cmd } = req.params;

    const socketId = devices[device];

    if (!socketId) {
        return res.send("dispositivo offline");
    }

    io.to(socketId).emit("command", cmd);

    res.send("comando enviado");

});

server.listen(3000, () => {
    console.log("Picolas Control corriendo en http://localhost:3000");
});