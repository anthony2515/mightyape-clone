import express from 'express'
import { displayProducts } from '../db/db'

const router = express.Router()

//api/v1/products
router.get('/',async(req,res)=>{
  try{
    const response = await displayProducts()
 
  res.json(response)
  }catch(e){
    console.error("ERRRRROR",e)
    res.status(500).send("Borken")
  }
  
})


export default router