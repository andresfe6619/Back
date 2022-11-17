
import { logger } from "../logs/loggers.js";
//Como el acceso a estas rutas las tiene el admin, no es necesario definir un front, asi que hice una plantilla por 
//si acaso pero le deje un res.json
//tambien lo hice con el username para que lo puedas probar tú
const checkAdmin = async (req, res, next) => {
    var user = req.user
    if(user != undefined) {
    if (user.username === 'andresfe6620') {
      logger.info("admin is true");
      next();
    } else {
      logger.warn({
        error: -1,
        descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`,
      });
      res.json({error: -1,
        descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`,})
//    res.render("Error") 
    }}
    else{
      res.json({error: -1,
        descripcion: `Ruta '${req.path}' Método '${req.method}' - No Autorizada`,})
      }
//   res.render("Error") 
    };


export default checkAdmin;
