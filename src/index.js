import express from 'express'
import cartRouter from './routes/cartRouter.js'
import productsRouter from './routes/productsRoutes.js'
import upload from './config/multer.js'
import { __dirname } from './path.js'
import { engine } from 'express-handlebars'
import { Server } from 'socket.io'

//Configuraciones o declaraciones
const app = express()
const PORT = 8082

//Middlewares
app.use(express.json())
app.use('/static', express.static(__dirname + '/public'))
app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', __dirname + '/views')


//Routes
app.use('/static', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter, express.static(__dirname + '/public'))
app.use('/api/cart', cartRouter)
app.post('/upload', upload.single('product'), (req, res) => {
    try {
        console.log(req.file)
        res.status(200).send("Imagen cargada correctamente")
    } catch (e) {
        res.status(500).send("Error al cargar imagen")
    }
})
app.get('/static',(req, res) =>{
    res.render('templates/home', {
        mostrarProductos: true,
        productos: prods,
        css: 'product.css'
    })
})
//Server
app.listen(PORT, () => {
    console.log(`Server on port ${PORT}`)
})