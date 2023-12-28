import { useParams,useLocation } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import { getProduct } from "../apis/apiClient"
export default function EditProduct(){
  const params = useParams()
  //display product by product_id
  const {
    data: product,
    isLoading,
    error,
  } = useQuery({queryKey:['product'],
  queryFn:()=>getProduct(Number(params.id))
})
  console.log(product)
  if (error) {
    return <p>Internal Server Error</p>
  }
  if (!product || isLoading) {
    return <p>Loading....</p>
  }
  

  return(
    <div className = "editComponent">
      {/* I didn't use product.map as it only return 1 index */}
      <img src={`/${product[0].product_image}`} alt={product[0].product_image} />
      <h1>{product[0].product_name}</h1>
      <h2>{product[0].product_price}</h2>

    </div>
  )
}