const routes = require('../routes/index.js')

const {productsArray} = require(`../API/productAPI.js`);

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
const chatArray = [];

io.on(`connection`, (socket) => {
    console.log(`Se conectó un usuario con id: ${socket.id}`);
    socket.emit(`server:products`, productsArray);
    socket.on(`client:message`, (info) => {
        chatArray.push(info);
        io.emit(`server:chatUpdate`, chatArray);
    })
    socket.on(`client:sentProd`, () => {
        io.emit(`server:prodRecieved`, productsArray);
    })
})

//rutas
app.use(`/`, routes);