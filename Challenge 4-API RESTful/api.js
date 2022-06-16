class Api {
    constructor(){
        this.products = [];
        this.currentId = 0;
    }

    getProducts(){
        return this.products;
    }

    getByID(id){
        let filtered = this.products.filter(el => el.id === id);
        if(filtered.length === 0){
            return `error: producto no encontrado.`
        } else {
            return filtered;
        }
    }

    saveProduct(obj){
            this.products.push({...obj, id: this.currentId});
            let index = this.currentId;
            this.currentId ++;
            return this.products[index];
    }

    updateProduct(id, obj){
        let index = this.products.findIndex(el => el.id === id);
        if(index != -1){
            obj.id = id;
            this.products[index] = obj;
            return this.products[index];
        } else {
            return `No existe un producto con el id ${id}`
        }
    }

    deleteProduct(id){
        let index = this.products.findIndex(el => el.id === id);
        if(index !== -1){
            this.products.splice(index, 1);
            return `El objeto con id: ${id} ha sido eliminado.`
        } else {
            return `No existe un producto con el id ${id}`
        }
    }

}

module.exports = Api;