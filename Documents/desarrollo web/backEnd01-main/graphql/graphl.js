import {buildSchema} from "graphql"

const productSchema= buildSchema(`
input ProductInput {
    title:  String,
    price: Int,
    thumbnail: String,
    descrip:  String,          
    stock:  Int,                  
    codigo: String,
}
type Product {
    id: ID!,
    title: String,
    descrip: String,
    codigo: String,
    thumbnail: String,
    price: Int,
    stock: Int,
}
type Query {
    getProd(id: ID!): Product,
    getProds(campo: String, valor: String): [Product],
}
type Mutation {
    createProd(datos: ProductInput): Product,
    updateProd(id: ID!, datos: ProductInput): Product,
    deleteProd(id: ID!): Product,
}
`);

export default productSchema