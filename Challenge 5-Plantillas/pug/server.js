const express = require('express');
const app = express();
const routes = require('./routes/index.js')
const port = 8080;
const path = require('path');
const {engine} = require('express-handlebars');

//views

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'pug');

//body

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//static

app.use('/public', express.static( __dirname + '/public' ));

//routes

app.use(`/`, routes);

//server initialization

app.listen(port, (error) => {
    if(error){
        console.log(`Hubo un error: ${error}`);
    } else {
        console.log(`Servidor escuchando el puerto ${port}`);
    }
})