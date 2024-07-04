import { userModel } from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find()
        res.status(200).send(users)
    } catch (e) {
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`)
        res.status(500).send("Error al consultar users: ", e)
    }

}

export const sendDocuments = async (req,res) => {
    try {
        const {uid} = req.params
        const newDocs = req.body
        const user = await userModel.findByIdAndUpdate(uid, {$push: {documents: {$each:{
            newDocs
        }} }})
        if (!user) {
            res.status(404).send("User no existe")
            
        }else{

        }
    } catch (e) {
        res.status(500).send(e)
    }
}

