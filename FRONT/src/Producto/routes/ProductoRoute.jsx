import { Route, Routes } from "react-router-dom"
import { ProductoPage } from "../pages/ProductoPage"
import { CreateProductoPage } from "../pages/CreateProductoPage"
import { EditProductoPage } from "../pages/EditProductoPage"


export const ProductoRoute=()=>{
    
    return(
        <>
            <Routes>
                <Route path="/*" element={<ProductoPage/>}></Route>
                <Route path="/:id" element={<EditProductoPage/>}></Route>
                <Route path="/create" element={<CreateProductoPage/>}></Route>
                
            </Routes>
        </>
    )
}