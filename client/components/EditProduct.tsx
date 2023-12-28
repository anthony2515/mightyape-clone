import { useParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../apis/apiClient"
export default function EditProduct(){
  const params = useParams()
  //display product by product_id
  const {
    data: product,
    isLoading,
    error,
  } = useQuery( 
     ['editProduct'],
     ()=>getProduct(Number(params.id))
    )
  
  if (error) {
    return <p>This is an Error</p>
  }
  if (!product || isLoading) {
    return <p>Internal Server Error</p>
  }
  

  return(
    <div className = "editComponent">
      <h1>Hi</h1>
    </div>
  )
}