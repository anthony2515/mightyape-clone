import { getAllProductsAPI,deleteProduct } from '../apis/apiClient'
import { useQuery,useMutation,useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { Link,Outlet,useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { IfAuthenticated, IfNotAuthenticated } from './Authenticated'
import {DisplayProducts} from '../../models/newProducts'
import DeletePoduct from './DeleteProduct'
function App() {
  //--Handle Authentication
  const { logout, loginWithRedirect, user } = useAuth0()
  const handleSignOut = () => {
    return logout()
  }
  const handleSignIn = () => {
    return loginWithRedirect()
  }
   //handle buttons from admin
   const navigate = useNavigate()
   const navigate2 = useNavigate()

  //Display Products from server
  const {
    data: products,
    isLoading,
    error,
  } = useQuery({ queryKey: ['products'], queryFn: getAllProductsAPI })
  //useMutation to delete product as admin
  const queryClient = useQueryClient()
  const deleteProductMutation = useMutation({
    mutationFn:deleteProduct,
    onSuccess:async()=>{
      queryClient.invalidateQueries(['products'])
    }
  })
  const [productToDelete, setProductToDelete] = useState(null);
  const [getProductName,setGetProductName] = useState(null)

  
  //when delete button is clicked this function trigger
  const handleDeleteButtonClick = (id:number,name:string) => {
    
    setGetProductName(name)
    setProductToDelete(id)
  };

  if (error) {
    return <p>This is an Error</p>
  }
  if (!products || isLoading) {
    return <p>Loading....</p>
  }
  
  return (
    <>
    {/* Displays a confirmation if user wants to delete a product */}
    {productToDelete && (
        <div className="modalContainer">
          <p>Are you sure you want to delete {getProductName}?</p>
          <button onClick={() => setProductToDelete(null)}>Cancel</button>
          <button onClick={() => {
            // Perform the delete action for the specific product
            deleteProductMutation.mutate(productToDelete);
            // Hide the confirmation modal
            setProductToDelete(null);
          }}>Confirm</button>
        </div>
      )}

      <IfAuthenticated>
        <button onClick={handleSignOut}>Sign out</button>
        {<p>Hello {user?.name}</p>}
        {user?.email == 'santiagoanthony114@gmail.com' ? (
          <Link className="adminButton" to="/addProduct">
            Add New
          </Link>
        ) : null}
      </IfAuthenticated>
      <IfNotAuthenticated>
        <button onClick={handleSignIn}>Sign in</button>
      </IfNotAuthenticated>
      <header className="header">
        <h1 className="title">Ton's Grocery</h1>
      </header>
      <section className="main">
        {/* Display products using map */}
        {products.map((data:DisplayProducts) => {
          return (
            <div className="product_container" key={data.product_id}>
              <IfAuthenticated>
                {user?.email == 'santiagoanthony114@gmail.com' ? (
                  <div className="adminButtonContainer">
                    <button onClick = {() => {
                    
                      navigate(`/editProduct/${data.product_id}`)
                    }}>Edit</button>
                    
                    <button onClick = {()=>{
                      handleDeleteButtonClick(data.product_id,data.product_name)
                    }}>Delete</button>
                    
                  </div>
                ) : <div className = "userButtonContainer">
                    <button> Buy </button>                  
                  </div>}
              </IfAuthenticated>
              <div className="product_image">
                <img src={data.product_image} alt="" />
              </div>

              <div className="product_details">
                <p className="priceFont">{data.product_price}</p>
                <span className="productNameFont">{data.product_name}</span>
              </div>
              
            </div>
            
          )
        })
        
        }
      </section>
      
    </>
    
  )
}

export default App
