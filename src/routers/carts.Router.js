import { Router } from "express"
import {ManagerCart } from "../../managerCart.js"
import { __dirname } from "../utils.js"

const router = Router()

const managerCart = new ManagerCart(__dirname + "/Carts.json")

router

router.post("/", async(req, res)=>{
    const newCart =await managerCart.crearCarrito()
    res.json({cart:newCart})
})


router.get("/:idCart", async (req, res) => {
    const { idCart } = req.params
    const cart = await managerCart.getCart(+idCart)
    res.json({ cart })
})

router.post("/:idCart/producto/:idProducto",async (req,res)=>{
    const {idCart, idProducto}=req.params
    const addproducto=await managerCart.addProductoToCars(+idCart,+idProducto)
    res.json({message:addproducto})
})







export default router
