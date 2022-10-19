import {productDao} from "../Models/Daos/indexDaoFactory.js"
import {logger} from "../logs/loggers.js"
const getProduct = async ({id}) => {
    try {
        const product = await productDao.getByIdgraph(id)
        
        return product
    } catch (error) {
        logger.error(error)
    }
}

const getProducts = async () => {
    try {
        const products = await productDao.getAllgraph()
        
        return products
    } catch (error) {
        logger.error(error)
    }
}

const createProduct = async ({datos}) => {
    try {
        const newProduct = {
            title: datos.title,
            descrip: datos.descrip,
            codigo: datos.code,
            thumbnail: datos.thumbnail,
            price: datos.price,
            stock: datos.stock
        }
        const createNewProduct = await productDao.createProductGraph(newProduct)

        return createNewProduct
    } catch (error) {
        logger.error(error)
    }

}
const updateProduct = async({id, datos}) => {
    try{
    const newProduct = {
        title: datos.title,
        descrip: datos.descrip,
        codigo: datos.code,
        thumbnail: datos.thumbnail,
        price: datos.price,
        stock: datos.stock
    }
    const newProd= await productDao.updateProductGraph(id, newProduct)
    return newProd
}catch(err){
        logger.error(err)
    }
}
const deleteProduct = async(id) => {
    try{
    const deleteProd = await productDao.deleteByIdgraph(id)
    return deleteProd 
    }catch(err){
        logger.error(err)
    }
}

//Consultas para hacer en graphiql:
// {
//     getProduct(id: "62dc6faea37be7f856862ba6") {
//       title price stock thumbnail description
//     }
//   }
  
//   {
//     getProducts{
//       title price thumbnail
//     }
//   }
  
//   mutation crearProductoNuevo {
//     createProduct(datos: {title: "producto desde graphql", description: "este es el producto creado desde graphql", code: "codigo graphql", thumbnail: "thumbnail graphql", price: 1, stock: 1}) {
//       id title description code thumbnail price stock
//     }
//   }

export const productGraphl ={ getProduct, getProducts, createProduct, updateProduct, deleteProduct}