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
const deleteProduct = async({id}) => {
    try{
    
    const deleteProd = await productDao.deleteByIdgraph(id)
    
    return deleteProd
    }catch(err){
        logger.error(err)
    }
}

//Consultas para hacer en graphiql:
// {
//     getProd(id: "6347706175b676a012c54db6") {
//       title price stock thumbnail descrip
//     }
//   }
  
//   {
//     getProds{
//       title price thumbnail
//     }
//   }
  
//   mutation createProduct {
//     createProd(datos: {title: "producto desde graphql", descrip: "este es el producto creado desde graphql", codigo: "codigo graphql", thumbnail: "thumbnail graphql", price: 1, stock: 1}) {
//       id title descrip codigo thumbnail price stock
//     }
//   }
//   mutation updateProduct {
//     updateProd(id: "63476a7fa59e86e56593c81b", datos: {title: "producto desde graphql Actualizado", descrip: "este es el producto creado desde graphql", codigo: "codigo graphql", thumbnail: "thumbnail graphql", price: 1, stock: 1}) {
//       id title descrip codigo thumbnail price stock
//     }
//   }
//   mutation deleteProduct {
//     deleteProd(id: "63476a7fa59e86e56593c81b") {
//        title price stock thumbnail descrip
//     }
//   }
export const productGraphl ={ getProduct, getProducts, createProduct, updateProduct, deleteProduct}