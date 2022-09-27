import multer from "multer"
import {Strategy as LocalStrategy} from 'passport-local';
import {sendGmail} from "../services/Gmail-Wpp.js"
import {findName, createUser, comparePass, cryptPass} from "../Models/Daos/users.Dao.js"
import {logger} from "../logs/loggers.js"
import {CartService} from "./cart.service.js"
var date = new Date();
    var components = [
        date.getYear(),
        date.getMonth(),
        date.getDate(),
        date.getHours(),
        date.getMinutes(),
        date.getSeconds(),
        date.getMilliseconds()
    ];
    
    var idAvatar = `${components.join("")}.jpg`
    
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'Avatars')
  },
  filename: (req, file, cb) => {
  
    cb(null, idAvatar)
  }
})
const upload = multer({ storage })


const register = new LocalStrategy(
    { passReqToCallback: true },
    async (req, username, password, done) => {
      try {
        const existingUser = await findName(username);
  
        if (existingUser) {
          return done(null, null);
        }
        const userCart= await CartService.saveCart(date)
        const newUser = {
          username,
          password: cryptPass(password),
          email: req.body.email,
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          Age: req.body.Age,
          phone: req.body.country + req.body.phone,
          avatar : idAvatar,
          Direction : req.body.direccion,
          UserCart : userCart
        };
  
  
          
             
  sendGmail("Nuevo usuario",`<div>Nombre de usuario : ${newUser.username}</div>
  <div>contraseña (encriptada) : ${newUser.password}</div>
  <div>email : ${newUser.email}</div>
  <div>primer nombre : ${newUser.firstName}</div>
  <div>apellido : ${newUser.lastName}</div>
  <div>edad : ${newUser.Age}</div>
  <div>telefono : ${newUser.phone}</div>
  <div>Avatar : ${newUser.avatar}</div>
  <div>Direccion : ${newUser.Direction}</div>`)
  const createdUser = await createUser(newUser);
  
  
  
  
  
        done(null, createdUser);
      } catch (err) {
        logger.warn("Error registrando usuario", err);
      
        done("Error en registro", null);
      }
    }
  );


  const login = new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findName(username);
  
      if (!user || !comparePass(password, user.password)) {
        return done(null, null);
      }
  
      done(null, user);
    } catch (err) {
      logger.error("Error login", err);
      done("Error login", null);
    }
  });

export {
 upload, idAvatar, login, register
}