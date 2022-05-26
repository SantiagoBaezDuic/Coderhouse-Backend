class Usuario {
    constructor(nombre, apellido, libros, mascotas){
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName(){
        console.log(`El nombre del usuario es ${this.nombre} ${this.apellido}`);
    }

    addMascota(nombre){
        this.mascotas.push(nombre);
    }

    countMascotas(){
        console.log(`El usuario tiene ${this.mascotas.length} mascotas.`)
    }

    addBook(nombre, autor){
        this.libros.push({nombre: nombre, autor: autor});
    }

    getBookNames(){
        let listado = [];
        this.libros.map((obj) => listado.push(obj.nombre));
        console.log(listado);
    }
}

let user = new Usuario("John", "Doe", [{nombre: "El imperio final", autor: "Brandon Sanderson"}, {nombre: "El hobbit", autor: "J.R.R Tolkien"}], ["perro", "cobayo"]);

console.log(user);

user.countMascotas();

user.addMascota("gato");

user.countMascotas();

user.getBookNames();

user.addBook("Harry Potter y la piedra filosofal", "J.K Rowling")

user.getBookNames();

user.getFullName();