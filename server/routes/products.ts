import express from 'express'
import { displayProducts } from '../db/db'

const router = express.Router()

//api/v1/products
router.get('/',async(req,res)=>{
  try{
    const response = await displayProducts()
  console.log("get",response)
  res.json(response)
  }catch(e){
    res.status(500).send("Borken")
  }
  
})


export default router