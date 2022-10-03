import {productDao} from "../Models/Daos/indexDao.js"
const getAll = async () => {
    const data = await productDao.getAll();
    
    const result = await data.map(product =>  {
        
     return{ 
        id : product.id ,
        title : product.title,
        price : product.price, 
        thumbnai:product.thumbnail,
        descrip : product.descrip,
        stock :product.stock,
        codigo : product.codigo,
        

     }                    
    }
    )

//debes copiar el id del producto
return result 
}

const getById = async (cart) => {
    const result = await  productDao.getById(cart);

    return result


}
const saveObject = async (productToSave) => {
    productToSave.timestamp = new Date().toLocaleString("fr-FR");
     
    return productToSave


    }
const updateById = async (IdToUpdate) => {
   const update = await productDao.updateById(IdToUpdate)
return update
}
const deleteById = async (IdToDelete) => {
 const Deleted12 = await productDao.deleteById(IdToDelete)
 return Deleted12
}






export const productService = {
    getAll, 
    getById, 
    saveObject,
    updateById,
    deleteById




}
