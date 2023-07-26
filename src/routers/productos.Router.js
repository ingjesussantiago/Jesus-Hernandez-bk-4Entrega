import { Router } from "express"
import { managerProducto } from "../../managerProducto.js"
import { __dirname } from "../utils.js"

const router = Router()

const ManagerProducto = new managerProducto( __dirname +"/productos.json")


router.get("/", async (req, res) => {
    const productos = await ManagerProducto.getProduct()
    res.json({ productos })
})

router.post("/", async (req, res) => {
    const producto = req.body
    const nuevoProducto = await ManagerProducto.addProduct(producto)
    res.json({ message: "Prodcuto creado", producto: nuevoProducto })
})

router.get("/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const producto = await ManagerProducto.getProductoById(+idProducto)
    res.json({ producto })
})

router.delete("/", async (req, res) => {
    const message = await ManagerProducto.delateProduct()
    res.json({ message })
})

router.delete("/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const message = await ManagerProducto.delateProductById(+idProducto)
    res.json({ message })
})

router.put("/:idProducto", async (req, res) => {
    const { idProducto } = req.params
    const productoup = req.body
    const producto = await ManagerProducto.upDateProduc(+idProducto, productoup)
    res.json({ producto })
})




export default router