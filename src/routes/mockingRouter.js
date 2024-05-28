import { faker } from '@faker-js/faker'
import { Router } from "express";
import productModel from "../models/product.js";


const products = []
const mockingRouter = Router()

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
mockingRouter.post('/', async (req, res) => {

    try {
            const products = [];
            for (let i = 0; i < 100; i++) {
                products.push(createRandomProduct())
            }     
            const mensaje = await productModel.create(products);
            res.status(201).send(mensaje);   
            
            //res.status(201).send(products); // Enviar todos los productos creados en una sola respuesta
            //res.end();
        } catch (error) {
            req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
            res.status(500).send(`Error interno del servidor al crear productos: ${error}`);
        }
    }
)

/*mockingRouter.post('/', async (req, res) => {
    const batchSize = 10; // Tamaño del lote
    const totalProducts = 100; // Total de productos a crear
    const products = [];

    try {
        // Crear productos
        for (let i = 0; i < totalProducts; i++) {
            products.push(createRandomProduct());
        }

        // Insertar productos en lotes
        for (let i = 0; i < totalProducts; i += batchSize) {
            const batch = products.slice(i, i + batchSize);
            await productModel.create(batch);
        }

        res.status(201).send('Productos creados exitosamente');
    } catch (error) {
        res.status(500).send(`Error interno del servidor al crear productos: ${error}`);
    }
});*/
//MAIL - PASSWORD - USERNAME - ID - Avatar - Img - birthdate - registeredAt

const createRandomProduct = () => {
    return {
        title:faker.commerce.product(),
        description:faker.commerce.productDescription(),
        stock:faker.number.int(100),
        category:faker.commerce.department() ,
        status: faker.datatype.boolean() ,
        code:faker.commerce.isbn(),
        price: faker.commerce.price()
    }
}





export default mockingRouter