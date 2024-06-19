import mongoose from "mongoose";

import productModel from "../src/models/product.js";
import varenv from '../src/dotenv.js'
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(varenv.mongo_url)

describe('Test CRUD de productos en la ruta /api/products', function () {

    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los productos mediante el metodo GET', async () => {
        const products = await productModel.find()

        assert.strictEqual(Array.isArray(products), true)
    })

    it('Obtener un producto dado su id mediante el metodo GET', async () => {
        const user = await productModel.findById('664bf735ae501e26c4d4c728')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un producto mediante el metodo POST', async () => {
        const newProduct = {
            title: "Car",
            description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            stock: 97,
            category: "Clothing",
            status: true,
            code: "978000",
            price: 833
        }

        const productCreated = await productModel.create(newProduct)

        assert.ok(productCreated._id)
    })

    it('Actualizar un producto dado un id como parametro mediante el metodo PUT', async () => {
        const updateProduct = {
            title: "Car",
            description: "New range of formal shirts are designed keeping you in mind. With fits and styling that will make you stand apart",
            stock: 97,
            category: "Clothing",
            status: true,
            code: "978444",
            price: 833
        }

        const productUpdated = await productModel.findByIdAndUpdate('664bf735ae501e26c4d4c73c', updateProduct)
        assert.ok(productUpdated._id)
    })

    it('Eliminar un producto dado un id como parametro mediante el metodo DELETE', async () => {

        const rta = await productModel.findByIdAndDelete('664bf735ae501e26c4d4c73e')
        assert.strictEqual(typeof rta, 'object')
    })


})