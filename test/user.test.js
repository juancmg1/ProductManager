import mongoose from "mongoose";
import { userModel } from "../src/models/user.js";
import varenv from '../src/dotenv.js'
import Assert from 'assert'

const assert = Assert.strict

await mongoose.connect(varenv.mongo_url)

describe('Test CRUD de usuarios en la ruta /api/users', function () {

    //Previo a comenzar todo el test
    before(() => {
        console.log("Arrancando el test")
    })

    //Previo a comenzar cada test individual
    beforeEach(() => {
        console.log("Comienza el test!")
    })

    it('Obtener todos los usuarios mediante el metodo GET', async () => {
        const users = await userModel.find()

        assert.strictEqual(Array.isArray(users), true)
    })

    it('Obtener un usuario dado su id mediante el metodo GET', async () => {
        const user = await userModel.findById('665e57c109f2e86982cafe75')
        //assert.strictEqual(typeof user, 'object')
        assert.ok(user._id)
    })

    it('Crear un usuario mediante el metodo POST', async () => {
        const newUser = {
            first_name: "Leo",
            last_name: "Lopez",
            email: "leoko@leo.com",
            password: "1234",
            age: 30
        }

        const userCreated = await userModel.create(newUser)

        assert.ok(userCreated._id)
    })

    it('Actualizar un usuario dado un id como parametro mediante el metodo PUT', async () => {
        const updateUser = {
            first_name: "Federico",
            last_name: "Fedex",
            email: "fede@fede.com",
            password: "1234",
            age: 30
        }

        const userUpdated = await userModel.findByIdAndUpdate('6670c6c5cacf3d6207482013', updateUser)
        assert.ok(userUpdated._id)
    })

    it('Eliminar un usuario dado un id como parametro mediante el metodo DELETE', async () => {

        const rta = await userModel.findByIdAndDelete('6670c6c5cacf3d6207482013')
        assert.strictEqual(typeof rta, 'object')
    })


})