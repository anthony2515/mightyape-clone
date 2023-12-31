import express from 'express'
import { insertProducts ,deleteProduct,displayProduct, getFileNameById} from '../db/db.ts'
import multer from 'multer'
import path from 'path'
import fs from 'fs'
// import { Path } from 'react-router-dom'
const router = express.Router()
router.use(express.urlencoded({extended:true}))
router.use(express.json())

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination path where you want to save the uploaded file
    cb(null, 'public/');
  },
  filename: function (req, file, cb) {
    // Use the original file name for the uploaded file
    cb(null, Date.now()+ "--" + file.originalname);
  },
})

const upload = multer({storage:storage})
// //api/v1/admin
router.post('/',upload.single('product_image'),async(req,res)=>{
  try {
    
    const input = req.body
   
    const result = {
      product_name:input.product_name,
      product_price:input.product_price,
      product_image:req.file?.filename,
      product_type:input.product_type
    }
    
    const response = await insertProducts(result)
    res.status(200).send(response)
    
  } catch (error) {
    console.error(error);
    res.status(500).send("broken")
  }
})
router.delete('/:id',async(req,res)=>{
  try{
    const id = Number(req.params.id)
    const filename = await getFileNameById(id)
    if (filename[0].product_image) { // check if has uploaded image
    const filePath = path.join('public', filename[0].product_image);
    
      // Delete the file from the filesystem
       fs.unlink(filePath,(err)=>{ 
        if(err) return console.log(err);
        console.log('file deleted successfully');});
        const response = await deleteProduct(id)
        
        res.json(response)
    }
    if(!filename[0].product_image){ //check if no uploaded image
      const response = await deleteProduct(id)
      res.json(response)
    }
    
  } catch(error){
    res.status(500).send("deletion failed")
  }
  
})
router.get('/:id',async(req,res)=>{
  try{
    const id = Number(req.params.id)
    const response = await displayProduct(id)
    
    res.json(response)
  }catch(error){
    res.status(500).send("Cannot get product")
  }
})
export default router

