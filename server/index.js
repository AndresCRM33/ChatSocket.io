import express from "express";
import logger from "morgan";

import {Server} from "socket.io";
import {createServer} from "node:http"

// Numero del puero como variable de entorno, o en su defecto que sea 3000
const port = process.env.PORT ?? 3000

// Inicializamos la aplicación llamando a express
const app = express()

// Creamos el servidor HTTP con node y le pasamos la app
const server = createServer(app)

// Creamos el servidor de socket.io y le pasamos el servidor HTTP
const io = new Server(server)

io.on("connection", (socket) => {
    console.log("a user has connected!")

    socket.on("disconnect", () =>{
        console.log("an user has disconnected!")
    })

    socket.on("chat message", (msg) => {
        io.emit("chat message", msg)
    })
})


app.use(logger("dev"))

// Cuando estemos en la ruta "/" el servidor nos dara una respuesta
// app.get("/", (req, res) => {
//     res.send("<h1>Esto es el chat!!</h1>")
// })
app.get("/", (req, res) => {
    res.sendFile(process.cwd() + "/client/index.html") //inicializamos el archivo desde index.html
})


// Inicializamos el servidor
server.listen(port, () =>{
    console.log(`Server running in port: ${port}`)
})