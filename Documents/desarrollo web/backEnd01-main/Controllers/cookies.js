import {logger} from "../logs/loggers.js"
const newUser =  async (req, res) => {
    try {
      logger.info("renderizando plantilla")  
     res.render("userForm")

    } catch (error) {
        logger.error(error);
    }
}

const result = async (req, res) => {
 req.session.user = req.body;
    if (req.session.user) {
        logger.info("renderizando")
        res.render("userForm", {welcome: req.session.user,message: "bienvenido", user: true} );}
    
    else {
        res.render("userForm", {welcome: "", user: false} );
    }
}

const destroyUser = async (req, res) => {
    res.render("log-out", {welcome: req.session.user,message: "Hasta luego"} ); 
    req.session.destroy((err)=>{
        if (err) {
           logger.error(err)
        } else {
            
        logger.info("exito")
    
            
        }} )

    }


const checkCookie = async (req, res, next) => { 
if (req.session.user) {
    logger.info("user already")
    next()}
else {
    logger.warn("user does not exists")
    res.redirect("/api/users/inicio")
}




}









export {newUser, result, destroyUser, checkCookie}









