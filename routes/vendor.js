const route=require('express').Router();

const {
    vendors}=require('../db.js')
route.get('/', async (req, res) => {

    const Vendors = await vendors.findAll();
   
    res.send(Vendors)
  })
  
  route.post('/', async (req, res) => {
  
    try {
      const result = await vendors.create({
        'name': req.body.name,
        
      })
      res.send({success: true})
    } catch (e) {
      res.send({success: false, err: e.message})
    }
  })

  
route.delete('/',async(req,res) => {
  try{
  // console.log("inside delete")
  vendors.destroy({
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