import { Product } from "./Product.js";
import { ProductManager } from "./ProductManager.js";

const producto1 = new Product("salsa", "Muy rico", 1200, 20, "A123")
const producto2 = new Product("Lentejas", "Sanas", 1500, 25, "L123")
const producto3 = new Product("Yerba mate", "Del norte pa", 3000, 22, "Y243")
const producto4 = new Product("Azucar", "La sonrisa", 400, 14, "A433")



const productManager = new ProductManager('./products.json')

productManager.addProduct(producto1)