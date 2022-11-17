
import moment from "moment";
import Desafio from "./desafios.js"
import { Router } from "express";
import carro from "./carro.js";
import Productos from "./Productos.js";
import Users from "./Users.js";
const router = Router();
let visitas = 0;
router.use((req, res, next) => {
  visitas++;
  next();
});

router.get("/visitas", (req, res) => {
  res.send(`Cantidad de visitas ${visitas}`);
});

router.get("/fyh", (req, res) => {
  const fecha = moment().format("YYYY-MM-DD");
  res.send(`Hoy es ${fecha}`);
});

router.use("/productos", Productos);
router.use("/carro", carro);
router.use("/users", Users);
router.use("/desafios", Desafio )
export default router;
