Hola Salva!, como estas?, espero que te encuentres muy bien, primero que nada quiero agradecerte por haber sido el profesor tan genial y paciente que fuiste, de verdad, uno de los mejores, disfruté mucho de la cursada contigo, espero algun dia ser igual de grandioso que tu, aqui dejaré un mini tutorial de mi proyecto que en si creo que todo es bastante explicito, aún asi, para acceder a las rutas es, api/usuarios/rutas de usuario, api/productos/rutas de productos, api/carro/rutas de carro, api/desafios/ rutas de desafios

abajo dejo los resultados de los tests en caso de que les quieras dejar una ojeada

Gracias por todo!
LINK A herokuapp
https://backend6620.herokuapp.com


Test	Carpeta
Axios	/test/Axios/
Http	/test/http/
Mocha	/test/mocha/
Axios Se realizaron sus debidas pruebas a las direcciones de productos, en las cuales traje todos los productos, creé un producto nuevo, luego lo actualizé y por ultimo lo borré, el resultado del script fue el siguiente:
\test\Axios>node axios.test.js
trayendo productos metodo GET 
200 [
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f0f62b416c3d34bc79e5',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f1aa6157e1fb4539554b',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f1e0b6e1fa3f3dc57e6d',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'espada',
    stock: 10,
    price: 50,
    id: '6346f1f4372c8e40556e8ca7',
    arsPrice: 14500,
    colPrice: 225600,
    mexPrice: 1000
  }
]
nuevo producto metodo POST
200 {
  title: 'machete',
  price: 30,
  thumbnail: 'https://',
  descrip: 'esto es un machete muy afilado',
  stock: 10,
  codigo: '886',
  _id: '6346f34bb62919314c77a7ef',
  __v: 0
}
actualizando un producto metodo PUT
200 {
  title: 'espada',
  price: 50,
  thumbnail: 'https://',
  descrip: 'esta es una espada',
  stock: 10,
  codigo: '886'
}
borrando producto metodo DELETE
200 {
  _id: '6346f34bb62919314c77a7ef',
  title: 'espada',
  price: 50,
  thumbnail: 'https://',
  descrip: 'esta es una espada',
  stock: 10,
  codigo: '886',
  __v: 0
}


Http Se realizaron las mismas operaciones que con Axios pero con la librería nativa http(el reporte entero esta en su txxt dado que las respuestas de la base de datos fueron extensas ya que tenia muchos productos), el resultado fue:
\test\http>node http.js
Trayendo productos metodo GET
status code:200
[
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f0f62b416c3d34bc79e5',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f1aa6157e1fb4539554b',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'machete',
    stock: 10,
    price: 30,
    id: '6346f1e0b6e1fa3f3dc57e6d',
    arsPrice: 8700,
    colPrice: 135360,
    mexPrice: 600
  },
  {
    title: 'espada',
    stock: 10,
    price: 50,
    id: '6346f1f4372c8e40556e8ca7',
    arsPrice: 14500,
    colPrice: 225600,
    mexPrice: 1000
  }
]

Agregando productos metodo POST
status code:200
{ _id: '634701dade5ac79fbc0b015a', __v: 0 }

Actualizando productos metodo PUT
status code: 200
{id: '63470c1d87a1d4413d4756d7'}

borrando producto metodo DELETE
status code:200
{ _id: '63470a220895ce0e943a9c00', __v: 0 }



Mocha Con lo combinación Mocha/Supertest/Chai se realizo la misma operacion y se obtuvo el  siguiente resultado:
\test\mocha>npm test

> andres-felipe@1.0.0 test
> mocha ./test/mocha/mocha.js



  test API
    -GET /productos/Listado
      ✔ should return 200 (314ms)
    -POST /productos/agregar
      ✔ should return 200 (266ms)
      ✔ it should be ok with the product model
      ✔ it should return created Prod
      -PUT /api/productos/Listado/undefined
        ✔ Should return 200 (214ms)
        ✔ it should return the product updated
      -DELETE /api/productos/Listado/undefined
        ✔ it should return 200 (191ms)
        ✔ it should return the deleted info


  8 passing (1s)
Suite completa En este caso se repitió la combinación anterior se agregó el test de obtener un producto por su id, ya que en la consigna se dice que es una suite completa a las respuestas de dichos metodos Con el siguiente resultado:
\>npm test
> andres-felipe@1.0.0 test
> mocha ./test/suite/suite.js



  test API
    -GET /productos/Listado
      ✔ should return 200 (280ms)
      ✔ it should be there 28 products
    -POST /productos/agregar
      ✔ should return 200 (232ms)
      ✔ it should be ok with the product model
      ✔ it should return created Prod
      -PUT /api/productos/Listado/undefined
        ✔ Should return 200 (191ms)
        ✔ it should return the product updated
      -DELETE /api/productos/Listado/undefined
        ✔ it should return 200 (186ms)
        ✔ it should return the deleted info
        ✔ the product deleted shouldnt exist (180ms)
      -GET /api/productos/Listado/:id
        ✔ it should return 200 (177ms)
        ✔ it should return the asked product


  12 passing (1s)
