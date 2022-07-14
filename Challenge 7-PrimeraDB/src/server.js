const {productsDB, read} = require(`../API/productDB.js`);
const {chatArray} = require(`../API/chatDB.js`);

//path
const path = require(`path`);

//express
const express = require(`express`);
const app = express();
const PORT = 8080;
const expressSV = app.listen(PORT, () => console.log(`Servidor escuchando el puerto: ${PORT}`));

//socket.io
const { Server: IOServer } = require(`socket.io`);
const io = new IOServer(expressSV);

//body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static
app.use(express.static(path.join(__dirname, `../public`)));

//logica del websocket

io.on(`connection`, (socket) => {
    console.log(`Se conectó un usuario con id: ${socket.id}`);
    socket.emit(`server:products`, productsDB);
    socket.on(`client:message`, (info) => {
        chatArray.push(info);
        io.emit(`server:chatUpdate`, chatArray);
    })
    socket.on(`client:sentProd`, async () => {
        await read();
        io.emit(`server:prodRecieved`, productsDB);
    })
})