require("dotenv").config();

const io = require("socket.io-client");
const { exec } = require("child_process");

const DEVICE_NAME = process.env.DEVICE_NAME;
const SERVER_URL = process.env.SERVER_URL;

const socket = io(SERVER_URL, {
  auth: {
    device: DEVICE_NAME
  }
});

socket.on("connect", () => {
  console.log("Conectado al panel");
});

socket.on("command", (cmd) => {

  console.log("Ejecutando:", cmd);

  exec(cmd, (error, stdout, stderr) => {

    socket.emit("result", {
      device: DEVICE_NAME,
      output: stdout || stderr
    });

  });

});