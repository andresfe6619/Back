import  {Router} from "express";
import {desafio, numbers} from "../Controllers/desafio.js"
import compression from "compression"

const router = new Router();
router.get("/process",compression(), desafio)
router.get("/randoms", numbers )
export default router;