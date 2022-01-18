"use strict";

// Definicion de clase
class Usuario {
    constructor(nombre = "", apellido = "", libros = [], mascotas = []) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.libros = libros;
        this.mascotas = mascotas;
    }

    getFullName() {
        return `${this.nombre} ${this.apellido}`;
    }

    addMascota(mascota) {
        if (typeof mascota === "string") this.mascotas.push(mascota);
    }

    getMascotas() {
        return this.mascotas.length;
    }

    addBook(book, autor) {
        if (typeof book === "string" && typeof autor === "string") this.libros.push({ nombre: book, autor });
    }

    getBooks() {
        return this.libros.map(libro => libro.nombre);
    }
}

// Mi objeto
const USUARIO = new Usuario("Lautaro", "Santillán");

// Mostrar nombre
console.log("Nombre completo:", USUARIO.getFullName());

// Agreagr mascotas
USUARIO.addMascota("Perro");
USUARIO.addMascota("Gato");
USUARIO.addMascota("Loro");

// Mostrar mascotas
console.log("Cantidad de mascotas:", USUARIO.getMascotas());

// Agregar libros
USUARIO.addBook("El Hobbit", "J.R.R. Tolkien");
USUARIO.addBook("Fundamentos de Programacion", "Lius Joyanes Aguilar");

// Mostrar libros
console.log("Libros leídos", USUARIO.getBooks());
