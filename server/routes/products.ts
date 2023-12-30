import express from 'express'
import { displayProducts } from '../db/db'

const router = express.Router()

//api/v1/products
router.get('/',async(req,res)=>{
  try{
    console.log('Request to /api/v1/products received');
    const response = await displayProducts()
    console.log('Sending response:', response);
  res.json(response)
  }catch(e){
    console.error("ERRRRROR",e)
    res.status(500).send("Borken")
  }
  
})


export default router