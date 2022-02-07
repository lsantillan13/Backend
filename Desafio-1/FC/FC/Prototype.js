"use strict";

// Funcion constructora
function Usuario(nombre = "", apellido = "", libros = [], mascotas = []) {
    this.nombre = nombre;
    this.apellido = apellido;
    this.libros = libros;
    this.mascotas = mascotas;
}

// Mis métodos
Usuario.prototype.getFullName = function () {
    return `${this.nombre} ${this.apellido}`;
};

Usuario.prototype.addMascota = function (mascota) {
    if (typeof mascota === "string") this.mascotas.push(mascota);
};

Usuario.prototype.getMascotas = function () {
    return this.mascotas.length;
};

Usuario.prototype.addBook = function (book, autor) {
    if (typeof book === "string" && typeof autor === "string")
        this.libros.push({ nombre: book, autor });
};

Usuario.prototype.getBooks = function () {
    return this.libros.map((libro) => libro.nombre);
};

// Mi objeto
const USUARIO = new Usuario("Lautaro", "Santillán");

console.log("Nombre completo:", USUARIO.getFullName());

// Agregar mascotas
USUARIO.addMascota("Perro");
USUARIO.addMascota("Gato");

console.log("Cantidad de mascotas:", USUARIO.getMascotas());

// Agregar libros
USUARIO.addBook("El Hobbit", "J.R.R. Tolkien");
USUARIO.addBook("Fundamentos de Programacion", "Lius Joyanes Aguilar");

console.log("Libros leídos", USUARIO.getBooks());
