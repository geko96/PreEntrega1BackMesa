import fs from 'fs';

export default class CartManager {
    constructor(){
        this.cartPath = './src/manager/carts/carrito.json';
        this.cartModel = {
            products: []
        }
    }

    addID = async (cart) =>{
        const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
        const data = JSON.parse(rawdata, null, "\n")
        if (data.length === 0){
            cart.id = 0;
        } else {
            cart.id = data[data.length -1].id +1;
            return cart;
        }    
    }

    newCart = async () =>{
        const cart = this.cartModel;

        let rawdata = await fs.promises.readFile(this.cartPath, 'utf-8');
        let data = JSON.parse(rawdata, null, "\n");
        
        this.addID(cart);
        data.push(cart);

        let newCart= data;

        await fs.promises.writeFile(this.cartPath, JSON.stringify(newCart, null, '\t'));
    }

    getCartById = async (id) =>{
        try {
            const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8')
            let data = JSON.parse(rawdata).find(cart => cart.id === id)
            if (!data){
                throw new Error("Not found")
            }else {
                return data;
            }
        } catch (error) {
            return error.message;
        }    
    }
    
    addToCart = async (cId, product) =>{
        try {
            const rawdata = await fs.promises.readFile(this.cartPath, 'utf-8');
            const data = JSON.parse(rawdata);
            if (!data){
                throw new Error("Not found");
            };
            
            data.map((object) => {
                if (cId === object.id) {
                  const index = object.products.findIndex(p => p.id === product.id);
              
                  if (index >= 0) {
                    object.products[index].quantity += 1;
                  } else {
                    object.products.push({ id: product.id, quantity: 1 });
                  }
                }
            });

            await fs.promises.writeFile(this.cartPath, JSON.stringify(data, null, '\t'));
        
            } catch (error) {
            return error.message;
        }    
    }
}