const express = require('express');
const { resolve } = require('path');

const app = express();
const port = 3010;

let cors = require('cors');
app.use(cors());

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 }
];
function addObjToArr(ArrObj,pid,pname,price,pquantity){
    ArrObj.push({
        productId: pid,
        name: pname,
        price:price,
        quantity:pquantity
    });
    return ArrObj;
};
app.get("/cart/add",(req,res)=>{
    console.log(cart);
    let productId=parseInt(req.query.productId);
    let name=req.query.name;
    let price=parseInt(req.query.price);
    let quantity=parseInt(req.query.quantity);
    let cartItems=addObjToArr(cart,productId,name,price,quantity);
    cart=cartItems;
    console.log(cart);
    res.json({cartItems});
});

// endpoint 2: Edit Quantity of an Item in the Cart
function UpdateQuantityInCart(ArrObj,id,val){
    for(let i=0;i<ArrObj.length;i++){
        if(ArrObj[i].productId===id){
            ArrObj[i].quantity=val;
            break;
        };
    };
    return ArrObj;
};
app.get("/cart/edit",(req,res)=>{
    let productId=parseInt(req.query.productId);
    let quantity=parseInt(req.query.quantity);
    let cartItems=UpdateQuantityInCart(cart,productId,quantity);
    cart=cartItems;
    res.json({cartItems});
});

//Endpoint 3: Delete an Item from the Cart
function DeleteItemFromCart(ArrObj,id){
    return ArrObj.filter(el=> el.productId!==id);
};
app.get("/cart/delete",(req,res)=>{
    let productId=parseInt(req.query.productId);
    let result=DeleteItemFromCart(cart,productId);
    cartItems=result;
    cart=cartItems;
    res.json({cartItems});
});

//Endpoint 4: Read Items in the Cart
app.get("/cart",(req,res)=>{
    let cartItems=cart;
    res.json({cartItems});
});

//Endpoint 5: Calculate Total Quantity of Items in the Cart
function TotalCartQuant(ArrObj){
    let total=0;
    for(let i=0;i<ArrObj.length;i++){
        total=total+ArrObj[i].quantity;
    };
    return total;
};
app.get("/cart/total-quantity",(req,res)=>{
    let cartItems=TotalCartQuant(cart);
    res.json({cartItems});
});

//Endpoint 6: Calculate Total Price of Items in the Cart
function TotalCartPrice(ArrObj){
    let total=0;
    for(let i=0;i<ArrObj.length;i++){
        total=total+ArrObj[i].price;
    };
    return total;
};
app.get("/cart/total-price",(req,res)=>{
    let totalPrice=TotalCartPrice(cart);
    res.json({totalPrice});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
