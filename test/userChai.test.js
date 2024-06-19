import mongoose from "mongoose";
import { userModel } from "../src/models/user.js";
import {expect} from 'chai'
import varenv from '../src/dotenv.js'




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

        //expect(users).equal([])
        //expect(Array.isArray(users)).to.be.ok //Si es verdadero o no
        expect(users).not.to.be.deep.equal([]) //Que el interior del array no sea igual a array vacio
       // expect(users).to.have.lengthOf(0)
    })

    
    it('Obtener un usuario dado su id mediante el metodo GET', async () => {
        const user = await userModel.findById('665e57c109f2e86982cafe75')
        //assert.strictEqual(typeof user, 'object')
        expect(user).to.have.property('_id')
    })

    it('Crear un usuario mediante el metodo POST', async () => {
        const newUser = {
            first_name: "Leo",
            last_name: "Lopez",
            email: "leokkkaao@leo.com",
            password: "1234",
            age: 30
        }

        const userCreated = await userModel.create(newUser)

        expect(userCreated).to.have.property('_id')
    })

    it('Actualizar un usuario dado un id como parametro mediante el metodo PUT', async () => {
        const updateUser = {
            first_name: "Leonor",
            last_name: "Lopez",
            email: "leeeeqwqwq1331231eo@l31231eeeeo.com",
            password: "1234",
            age: 30
        }

        const userUpdated = await userModel.findByIdAndUpdate('6670c9ea14f5c9ee0e756495', updateUser)
        expect(userUpdated).to.have.property('_id')
    })

    it('Eliminar un usuario dado un id como parametro mediante el metodo DELETE', async () => {

        const rta = await userModel.findByIdAndDelete('6670c9ea14f5c9ee0e756495')
        expect(rta).to.be.ok
    })


})