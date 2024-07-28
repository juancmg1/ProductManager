import { userModel } from "../models/user.js";

export const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({}, 'first_name last_name email rol');
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

export const deleteOldUsers = async (req, res) => {
    try {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        console.log("Two hours ago:", twoHoursAgo);

        // Imprimir usuarios que serán eliminados (opcional, para depuración)
        const oldUsers = await userModel.find({ create: { $lt: twoHoursAgo } });
        console.log("Usuarios que serán eliminados:", oldUsers);

        // Eliminar usuarios antiguos
        const result = await userModel.deleteMany({ create: { $lt: twoHoursAgo } });
        console.log("Resultado de eliminación:", result);

        res.status(200).send(`Usuarios eliminados: ${result.deletedCount}`);
    } catch (e) {
        console.error("Error al eliminar usuarios antiguos:", e);
        req.logger.error(`Metodo: ${req.method} en ruta ${req.url} - ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}`);
        res.status(500).send(`Error al eliminar usuarios antiguos: ${e.message}`);
    }
};
