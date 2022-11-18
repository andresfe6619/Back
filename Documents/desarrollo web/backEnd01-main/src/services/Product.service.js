import { productDao } from "../Models/indexDaoFactory.js";
import Cotizador from "../DTO/cotizador.js";
import productDTO from "../DTO/productDTO.js";

const cotizador = new Cotizador();

const getAll = async () => {
  const data = await productDao.getAll();

  const result = await data.map((product) => {
    const currencies = {
      arsPrice: cotizador.getCurrencyPrice(product.price, "ARS"),
      colPrice: cotizador.getCurrencyPrice(product.price, "COL"),
      mexPrice: cotizador.getCurrencyPrice(product.price, "MEX"),
    };
    const prods = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnail: product.thumbnail,
      stock: product.stock,
    };
    return new productDTO(prods, currencies);
  });

  //debes copiar el id del producto
  return result;
};

const getById = async (id) => {
  const product = await productDao.getById(id);

  const currencies = {
      arsPrice: cotizador.getCurrencyPrice(product.price, "ARS"),
      colPrice: cotizador.getCurrencyPrice(product.price, "COL"),
      mexPrice: cotizador.getCurrencyPrice(product.price, "MEX"),
    };
    const prod = {
      id: product.id,
      title: product.title,
      price: product.price,
      thumbnai: product.thumbnail,
      stock: product.stock,
    };
    
    const filtered = new productDTO(prod, currencies); 
     
    return filtered
   
 
  };


const saveObject = async (productToSave) => {
  productToSave.timestamp = new Date().toLocaleString("fr-FR");
  const resultado = await productDao.saveObject(productToSave);
  return resultado;
};
const updateById = async (IdToUpdate, newProd) => {
  const update = await productDao.updateById(IdToUpdate, newProd);
  return update;
};
const deleteById = async (IdToDelete) => {
  const Deleted12 = await productDao.deleteById(IdToDelete);
  return Deleted12;
};

export const productService = {
  getAll,
  getById,
  saveObject,
  updateById,
  deleteById,
};
