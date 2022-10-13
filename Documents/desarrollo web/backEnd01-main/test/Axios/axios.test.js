import axios from 'axios'
const instance = "http://localhost:8080/api/productos"

const test = async () => {
try{
   
console.log("trayendo productos metodo GET ")
let response= await axios.get(`${instance}/Listado`)
 console.log(response.status, response.data)
console.log("nuevo producto metodo POST")
 
 response = await axios.post(`${instance}/agregar` ,{
    title: "machete",
    price: 30,
    thumbnail: "https://",
    descrip: "esto es un machete muy afilado",          
    stock: 10,                  
    codigo: "886",
 }) 
const createdProd = response.data
console.log(response.status, response.data)

console.log("actualizando un producto metodo PUT")

response = await axios.put(instance + `/Listado/${createdProd._id}`, {
    title: "espada",
    price: 50,
    thumbnail: "https://",
    descrip: "esta es una espada",          
    stock: 10,                  
    codigo: "886",

} )
console.log(response.status, response.data)
console.log("borrando producto metodo DELETE")

response = await axios.delete(instance + `/Listado/${createdProd._id}` )
console.log(response.status, response.data)


}
catch(error){
 console.log(error)
}
}

test()