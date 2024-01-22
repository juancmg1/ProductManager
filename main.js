import crypto from 'crypto'

console.log(crypto.randomBytes(10).toString('hex'))

class Product {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}

class ProductManager {
    constructor(){
        this.products = []
    }

    addProduct(producto){
        
        if (!producto.title || !producto.description || !producto.price || !producto.thumbnail || !producto.code || !producto.stock) {
            console.log("Todos los campos son obligatorios. Producto no agregado.");
            return;
        }


        const existe = this.products.includes(prod => prod.code === producto.code)

        if(existe){
            return 'Este producto ya existe'

        } else{
            producto.id = crypto.randomBytes(10).toString('hex')
            this.products.push(producto)
            
        }
        
    }
    getProducts() {
        return this.products;
    }
    getProductById(id) {
        const producto = this.products.find(prod => prod.id === id);

        if (producto) {
            return producto;
        } else {
            console.log('Error: Producto no encontrado');
            return null;
        }
    }
}

const productManager = new ProductManager();

// Agregar productos
const product1 = new Product("Producto 1", "Descripción del producto 1", 19.99, "imagen1.jpg", "P001", 50);
const product2 = new Product("Producto 2", "Descripción del producto 2", 29.99, "imagen2.jpg", "P002", 30);

productManager.addProduct(product1);
productManager.addProduct(product2);

// Mostrar todos los productos
console.log("Todos los productos:", productManager.getProducts());

// Obtener un producto por ID (reemplaza 'ID_A_BUSCAR' con un ID existente)
const productIdToFind = 'ID_A_BUSCAR';
const foundProduct = productManager.getProductById(productIdToFind);
console.log("Producto encontrado:", foundProduct);