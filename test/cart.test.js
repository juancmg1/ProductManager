import mongoose from "mongoose";
import cartModel from "../src/models/cart.js";
import productModel from "../src/models/product.js";
import varenv from '../src/dotenv.js'
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(varenv.mongo_url)

describe('Test CRUD de carrito en la ruta /api/cart', function () {

    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los carritos mediante el metodo GET', async () => {
        const cart = await cartModel.find()

        assert.strictEqual(Array.isArray(cart), true)
    })

    it('Obtener un producto dado su id mediante el metodo GET', async () => {
        const cart = await cartModel.findById('65f73b0ab2b442098724a74e')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(cart._id)
    })

    it('Crear un carrito mediante el metodo POST', async () => {
        const newCart = {
            id_prod: "664bf735ae501e26c4d4c728",
            quantity: 5
        }

        const cartCreated = await cartModel.create(newCart)

        assert.ok(cartCreated._id)
    })

  
    // it('Eliminar un producto dado un id como parametro mediante el metodo DELETE', async () => {

    //     const rta = await productModel.findByIdAndDelete('664bf735ae501e26c4d4c73e')
    //     assert.strictEqual(typeof rta, 'object')
    // })


})