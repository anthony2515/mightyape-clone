import { getAllProductsAPI } from "../apis/apiClient"
import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import AdminForm from "./AdminForm"
import {Link} from 'react-router-dom'
import { useAuth0 } from "@auth0/auth0-react"
import { IfAuthenticated, IfNotAuthenticated } from "./Authenticated"
function App() {
  const {logout,loginWithRedirect,user} = useAuth0()
  // const user = {
  //   nickname: 'john.doe',
  // }
  console.log(user)
  const handleSignOut = () => {
    console.log('sign out')
    return logout()
  }

  const handleSignIn = () => {
    console.log('sign in')
    return loginWithRedirect()
  }

  const {data:products,isLoading,error} = useQuery({queryKey:['products'],queryFn:getAllProductsAPI})
  if (error) {
    return <p>This is an Error</p>
  }
  if (!products || isLoading) {
    return <p>Internal Server Error</p>
  }
  
  return (
    <>
    <IfAuthenticated>
          <button onClick={handleSignOut}>Sign out</button>
          {<p>Hello {user?.name}</p>}
          {user?.email=="santiagoanthony114@gmail.com"?(<Link className="adminButton" to = "/admin">Admin</Link>):null}
          
        </IfAuthenticated>
        <IfNotAuthenticated>
          <button onClick={handleSignIn}>Sign in</button>
        </IfNotAuthenticated>
      <header className="header">
        <h1 className = "title">Ton's Grocery</h1>
        
      </header>
      <section className="main">{products.map((data)=>{
        return(
        <div className="product_container"key = {data.id}>

          <div className = "product_image">
            <img src={data.product_image} alt="" />
          </div>

          <div className = "product_details">
            <p className = "priceFont">{data.product_price}</p>
            <span className = "productNameFont">{data.product_name}</span>
          </div>
         
        </div>
        )
      })}</section>
    </>
  )
}

export default App
