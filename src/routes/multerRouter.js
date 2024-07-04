import { Router } from "express";
import { insertImg } from "../controllers/multerController.js";
import {uploadDocs,uploadPerds,uploadProds} from "../config/multer.js";
const multerRouter = Router()

multerRouter.post('/profiles', uploadPerds('profile'), insertImg)
multerRouter.post('/docs', uploadDocs('docs'), insertImg)
multerRouter.post('/products', uploadProds('product'), insertImg)

export default multerRouter