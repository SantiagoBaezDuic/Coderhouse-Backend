const {options} = require(`../options/mariaDB.js`);

let productsDB = [];

const read = async () => {
    try {
        const productsFromDB = await options.from('producto').select('*')
        productsFromDB.forEach(prod => {
            productsDB.push({name: prod.name, price: prod.price, thumbnail: prod.thumbnail})
        })
        console.log(productsDB);
    } catch (error) {
        console.log(error);
        options.destroy();
    }
}

const add = async (name, price, thumbnail) => {
    await options(`producto`).insert({name: name, price: price, thumbnail: thumbnail})
    .then(() => console.log(`Datos insertados`))
    -then(() => read())
    .catch((error) => console.log(error))
    .finally(() => options.destroy())
}

read()

module.exports = {read, add, productsDB};