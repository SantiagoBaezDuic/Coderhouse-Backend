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
                console.log(data);
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
            const contenido = await fs.promises.readFile(this.fileName, `utf-8`);
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
            const contenido = await fs.promises.readFile(this.fileName, `utf-8`)
            console.log(`${JSON.parse(contenido)} - getAll`);
        }
        catch (error){
            console.log(`Hubo un error: ${error}`);
        }
    }

    deleteByID(id){

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

container.save({titulo: `nombre`, price: 1, thumbnail: `link`});
container.save({titulo: `nombre2`, price: 2, thumbnail: `link2`});

container.getByID(1);

//  setTimeout(() => {
//      container.deleteAll();
//  }, 2000);





// container.save({titulo: "nombre3", price: 3, thumbnail: "link3"});

// container.getAll();

// container.deleteAll();

// container.getAll();