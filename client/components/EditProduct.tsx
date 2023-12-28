import { useParams } from "react-router-dom"

export default function EditProduct(){
  const params = useParams()
  console.log("asdf",params.id)
  return(
    <h1>Hi</h1>
  )
}