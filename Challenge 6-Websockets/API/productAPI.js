const productsArray = [
    {name: "Silksong", price: 60, thumbnail: "https://assets1.ignimgs.com/2019/06/24/hollowknight-silksong-1561419170041.jpg", id: 1,},
    {name: "V Rising", price: 30, thumbnail: "https://media.vandal.net/i/1200x630/5-2022/20225211150639_1.jpg", id: 2,},
    {name: "Minecraft Legends", price: 45, thumbnail: "https://cdn.cloudflare.steamstatic.com/steam/apps/1928870/capsule_616x353.jpg?t=1655221437", id: 3,},
]

const addProduct = (req) => {
    const { name, price, thumbnail } = req.body
    let lastProduct = productsArray.length - 1;
    let id = productsArray[lastProduct].id + 1;
    productsArray.push({ name, price, thumbnail, id: id});
}

module.exports = {addProduct, productsArray};