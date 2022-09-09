import  {Router} from "express";
const router = new Router();
import {desafio, numbers} from "../Controllers/desafio.js"
import compression from "compression"

router.get("/process",compression(), desafio)
router.get("/randoms", numbers )
export default router;