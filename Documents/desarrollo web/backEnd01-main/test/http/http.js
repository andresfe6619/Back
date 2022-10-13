import http from "http"


let id 
let req
const test = async () => {
// const options = {
//   hostname: "127.0.0.1",
//   port: 8080,
//   path: "/api/productos/Listado",
//   method: "GET",

// };


// req =   http.request(options, (res) => {
//    console.log("Trayendo productos metodo GET")
//     console.log("status code:"+ res.statusCode);

//   res.on("data", (data) => {
   
//     console.log(JSON.parse(data.toString("utf8")))

//   } )


// }) 
// req.on("error", (err) => {
//     console.log(err)
// })

// req.end()


// const options1 = {
//   hostname: "127.0.0.1",
//   port: 8080,
//   path: "/api/productos/agregar",
//   method: "POST",

// };
// const data =JSON.stringify({
//     title: "varita magica",
//       price: 1000,
//       thumbnail: "https://",
//       descrip: "con ella podras ser un poderoso hechicero",          
//       stock: 1,                  
//       codigo: "900",
// })



//  req =  http.request(options1, (res) => {
//    console.log("Agregando productos metodo POST")
//     console.log("status code:"+ res.statusCode);

//   res.on("data", (data) => {
//    const proof = JSON.parse(data.toString("utf8"))
//     console.log(proof._id)


//   } )


// }) 
// req.on("error", (err) => {
//     console.log(err)
// })
// req.write(data)
// req.end()

   id = "63470a220895ce0e943a9c00"

// const options2 = {
//     hostname: "127.0.0.1",
//     port: 8080,
//     path: `/api/productos/Listado/${id}`,
//     method: "PUT",
  
//   }
//   const data1 =JSON.stringify({
//       title: "varita de voldemort",
//       price: 1000,
//       thumbnail: "https://",
//       descrip: "con ella podras ser un poderoso hechicero",          
//       stock: 1,                  
//       codigo: "900",
//   })
  
  
  
//    req = http.request(options2, (res) => {
//      console.log("Actualizando productos metodo PUT")
//     console.log("status code:"+ res.statusCode);
  
//     res.on("data", (data) => {
     
//       console.log(JSON.parse(data.toString("utf8")))
  
//     } )
  
  
//   }) 
//   req.on("error", (err) => {
//       console.log(err)
//   })
//   req.write(data1)
//   req.end()
const options3 = {
    hostname: "127.0.0.1",
    port: 8080,
    path: `/api/productos/Listado/${id}`,
    method: "DELETE",
  
  }
  
   req = http.request(options3, (res) => {
    console.log("borrando producto metodo DELETE")
    console.log("status code:"+ res.statusCode);
  
    res.on("data", (data) => {
     
      console.log(JSON.parse(data.toString("utf8")))
  
    } )
  
  
  }) 
  req.on("error", (err) => {
      console.log(err)
  })
 
  req.end()

}


try{
test()
}catch(err){
    console.log(err)
  }