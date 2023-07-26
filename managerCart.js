import fs from "fs"

export class ManagerCart {

    constructor(path) {
        this.path = path
    }

    getCarts = async () => {
        if (fs.existsSync(this.path)) {
            const buscarCart = await fs.promises.readFile(this.path, "utf-8")
            const carts = JSON.parse(buscarCart)
            return carts
        } else {
            console.log("no hay carritos")
            return []

        }
    }
    getCart = async (id) => {
        const cartsFile = await this.getCarts()
        const cart = cartsFile.find((cart) => cart.id === id)
        if (cart) {
            return cart
        } else {
            return null
        }

    }

    crearCarrito = async () => {
        const cartsFile = await this.getCarts()
        const newCart = {
            id: this.#generarId(cartsFile),
            productos: []
        }

        cartsFile.push(newCart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        return newCart

    }

    addProductoToCars = async (idCart, idProducto) => {
        const cart = await this.getCart(idCart)
        if (!cart) return "carrito no existe"

   
        const productoIndex = cart.productos.findIndex((p)=>p.producto===idProducto)
        if (productoIndex === -1) {
            cart.productos.push({ producto: idProducto, quantity: 1 })
        } else {
            cart.productos[productoIndex].quantity++
        }

        const cartsFile = await this.getCarts()
        const cartIndex = cartsFile.findIndex(c => c.id === idCart)
        cartsFile.splice(cartIndex,1,cart)
        await fs.promises.writeFile(this.path, JSON.stringify(cartsFile))
        return "producto add"



    }









    #generarId = (carts) => {

        let id
        if (carts.length === 0) {
            id = 1
        } else {
            id = carts[carts.length - 1].id + 1
        }
        return id

    }

}