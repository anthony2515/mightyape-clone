import request from "superagent";
import { DisplayProducts, NewProducts } from "../../models/newProducts";

const route = '/api/v1/products'
export async function getAllProductsAPI(){
  try{
    const response = await request.get(route)
    return response.body
  }
  catch(e){
    console.log(e.message)
  }
  
}
const adminRoute = '/api/v1/admin'
export async function addProducts(text:NewProducts){
  try{
    const response = await request.post(adminRoute).send(text)
    return response.body
  }catch(e){
    throw new Error(`An error occurred while adding product`)
  }
}
export async function deleteProduct(id:number){
  try{
    const response = await request.delete(`${adminRoute}/${id}`)
    return response.body
  }catch(e){
    throw new Error(`An error occurred while deleting product`)

  }
}
export async function getProduct(id:number){
  try{
    const response = await request.get(`${adminRoute}/${id}`)
    
    return response.body
  }catch(e){
    throw new Error(`An error occurred while deleting product`)
  }
}