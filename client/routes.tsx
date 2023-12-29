import { Navigate, Route, createRoutesFromElements } from 'react-router-dom'

import App from './components/App.tsx'
import AdminForm from './components/AdminForm.tsx'
import EditProduct from './components/EditProduct.tsx'
import DeletePoduct from './components/DeleteProduct.tsx'
export const routes = createRoutesFromElements(

  <>
    <Route path = "/" element={<App />}/>
      <Route path = "asdf" element = {<DeletePoduct />}/>
   
    <Route path="/addProduct" element={<AdminForm />} />
    <Route path = "/editProduct/:id" element = {<EditProduct />} />

  </>


  
)
