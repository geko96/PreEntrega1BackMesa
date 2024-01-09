import { Router } from 'express';
import ProductManager from '../manager/ProductManager.js';

const router = Router();
const productmanager = new ProductManager();

router.get('/:pid', async (req,res) =>{
    let id = Number(req.params.pid);
    const product = await productmanager.getProductsById(id);
    res.send({product})
});

router.delete('/:pid', async (req,res) =>{
    let id = Number(req.params.pid);
    const product = await productmanager.deleteProduct(id);
    res.send({status: "success"})
});

router.put('/:pid', async (req,res)=>{
    let id = Number(req.params.pid);
    const {title,description,price,thumbnail,status,code,stock} = req.body
    await productmanager.updateProduct(id, {title,description,price,thumbnail,status,code,stock});
    res.send({status:"success"})
})

router.post('/', async (req,res) =>{
    const {title,description,price,thumbnail,status,code,stock} = req.body;
    await productmanager.addProduct( 
        title,
        description,
        price,
        thumbnail,
        status,
        code,
        stock
);
    res.send({status: "success"});
});

router.get('/', async (req, res)=>{
    const products = await productmanager.getProducts();
    const limit = Number(req.query.limit);

    if (!limit){
        res.send({products});
    }else {
        const limitedProducts = products.slice(0, limit);
        res.send({limitedProducts});
    };
});

export default router;