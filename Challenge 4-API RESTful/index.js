const express = require("express");

const { Router } = express;

const app = express();

const router = Router();

const port = 8080;

const Api = require("./api.js");

const productsArray = new Api;

//Middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", express.static(__dirname + "/public"))

//Rutas

router.get("/", (req, res) => {
    res.json(productsArray.getProducts());
})

router.get("/:id", (req, res) => {
    res.json(productsArray.getByID(Number(req.params.id)));
})

router.post("/", (req, res) => {
    res.json(productsArray.saveProduct(req.body));
})

router.put("/:id", (req, res) => {
    res.json(productsArray.updateProduct(Number(req.params.id), req.body))
})

router.delete("/:id", (req, res) => {
    res.json(productsArray.deleteProduct(Number(req.params.id)))
})

app.use("/api/productos", router);

//Inicialización

const server = app.listen(port, () => {
        console.log(`Servidor abierto escuchando el puerto: ${port}`)
});

server.on("error", error => console.log(`Error en el servidor: ${error}`));

//Seteo de productos default

productsArray.saveProduct({name: "Silksong", price: 60, thumbnail: "https://assets1.ignimgs.com/2019/06/24/hollowknight-silksong-1561419170041.jpg",});
productsArray.saveProduct({name: "V Rising", price: 30, thumbnail: "https://media.vandal.net/i/1200x630/5-2022/20225211150639_1.jpg",});
productsArray.saveProduct({name: "Minecraft Legends", price: 45, thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/1928870/capsule_616x353.jpg?t=1655221437",});