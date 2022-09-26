import {carroDao} from "../Models/Daos/indexDao"

const getAll = async () => {
    const data = await carroDao.getAll();

    return data;
}
const getById = async (cart) => {
    const result = carroDao.getById(cart);

    return result


}







export const CartService = {
getAll, 
getById, 



}
