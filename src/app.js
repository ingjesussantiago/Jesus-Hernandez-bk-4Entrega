import express from "express"
import { __dirname } from "./utils.js"
import productosRouter from "./routers/productos.Router.js"
import cartsRouter from "./routers/carts.Router.js"


const app = express()



app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static(__dirname + "/public"))
app.use("/api/productos",productosRouter)
app.use("/api/carts",cartsRouter)


app.get("/", (req, res) => {
    res.send("desde navegador 5")
})


app.listen(8080, () => {
    console.log("escuchando puerto")
})