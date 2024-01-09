import { Router } from 'express';
import CartManager from '../manager/carts/CartManager.js';
import ProductManager from '../manager/ProductManager.js';

const router = Router();

const cartmanager = new CartManager();
const productmanager = new ProductManager();

router.post('/:cid/product/:pid', async (req,res)=>{
    let pId = Number(req.params.pid);
    let cId = Number(req.params.cid);

    try {
        const  product = await productmanager.getProductsById(pId);
        const cart = await cartmanager.addToCart(cId, product);
    } catch (error) {
        console.log(error);
    }

    res.send({status: 'success'});
})

router.get('/:cid', async (req,res) =>{
    let id = Number(req.params.cid);
    const cart = await cartmanager.getCartById(id);
    res.send({cart})
})

router.post('/', async (req,res)=>{
    await cartmanager.newCart();
    res.send({status: 'success'});
})



export default router;