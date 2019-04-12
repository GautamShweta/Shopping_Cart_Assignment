const route=require('express').Router();

const {
    products,vendors,users}=require('../db.js')
route.get('/', async (req, res) => {

    const Products = await products.findAll({
      include:[
        {model:vendors},
        
      ]
    })
   
    //console.log(products);
    res.send(Products)
    
  })
  
  route.post('/', async (req, res) => {
  
    try {
       await products.create({
        'name': req.body.name,
        'price':req.body.price,
        'qty':req.body.quantity,
        'vendorId':req.body.vendorId
      })
      res.send({success: true})
    } catch (e) {
      res.send({success: false, err: e.message})
    }
  })

  route.delete('/',async(req,res) => {
    try{
    // console.log("inside delete")
    products.destroy({
    where:{'id':req.body.id}
    })
    
    res.send({success:true})}
    catch(e)
    {
    res.send({success: false,err: e.message})
    }
    }) 
  

  


  module.exports={
      route
  }