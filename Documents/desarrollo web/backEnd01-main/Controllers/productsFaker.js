
import {Router } from "express";
import {faker} from "@faker-js/faker";
const router = new Router();
import {logger} from "../logs/loggers.js"

const test = async(req, res) => {
    let productos = [];
    for (let i = 0; i < 5; i++) {
      productos.push({
        id : productos.length+1,
         title : faker.commerce.productName(),
        price: faker.commerce.price(),
        thumbnail: faker.image.image(),
    })
    }
    const prods = productos; 
    logger.info("faker is ready")
    res.render("products", {prods, hasAny: true});
}

export default test;