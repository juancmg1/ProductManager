import { Router } from "express";
import { getUsers, sendDocuments, deleteOldUsers } from "../controllers/userController.js";

const userRouter = Router()

userRouter.get('/', getUsers)
userRouter.post('/:uid/documents', sendDocuments)
userRouter.delete('/', deleteOldUsers)

export default userRouter