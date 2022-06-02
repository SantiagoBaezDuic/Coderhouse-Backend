const fs = require(`fs`);

class Contenedor{
    constructor(fileName){
        this.fileName = fileName;
    }

    async save(obj){
        try{
            let contenido = await fs.promises.readFile(this.fileName, `utf-8`)
            let data = JSON.parse(contenido);
            obj = {...obj, id: 1};
            if(data != `` && data != `[]`){
                data.push(obj);
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            } else {
                let array = [];
                array.push(obj);
                await fs.promises.writeFile(this.fileName, JSON.stringify(array));
            }
        }
        catch (error){
            console.log(`Hubo un error ${error}`);
        }
    }

    async getByID(id){
        try {
            let contenido = await fs.promises.readFile(this.fileName, `utf-8`);
            let array = JSON.parse(contenido);
            if(array.find((element) => {element.id == id}) !== undefined){
                console.log(array.find((element) => {element.id == id}));
            } else {
                console.log(`No se encontró un elemento con id ${id}`);
            }
        }
        catch (error){
            console.log(`Hubo un error: ${error}`);
        }
    }

    async getAll(){
        try {
            let contenido = await fs.promises.readFile(this.fileName, `utf-8`)
            console.log(`${JSON.parse(contenido)} - getAll`);
        }
        catch (error){
            console.log(`Hubo un error: ${error}`);
        }
    }

    async deleteByID(id){
        try{
            let contenido = await fs.promises.readFile(this.fileName, `utf-8`)
            let data = JSON.parse(contenido);
            let filtrado = data.filter((el) => el.id !== id);
            await fs.promises.writeFile(this.fileName, filtrado);
            console.log(`El item con id ${id} ha sido eliminado.`);
        }
        catch (error){
            console.log(`Hubo un error: ${error}`);
        }

    }

    async deleteAll(){
        try {
            await fs.promises.writeFile(this.fileName, `[]`);
            console.log(`Se borraron todos los items.`);
        }
        catch (error){
            console.log(`Hubo un error: ${error}`);
        }
    }
}

let container = new Contenedor("./cont.txt");

async function main(){
    await container.save({titulo: `nombre`, price: 1, thumbnail: `link`});
    await container.save({titulo: `nombre2`, price: 2, thumbnail: `link2`});
    await container.save({titulo: "nombre3", price: 3, thumbnail: "link3"});
    await container.getAll();
    await container.getByID(1);
    setTimeout(() => {
        container.deleteAll();
    }, 6000)
}

main();