import {port, mode} from "./yargs.js" 
import {saveCart } from "./Controllers/route-controller-dao/CartController.js";
import express from 'express';
import {transporter} from "./Controllers/Gmail-Wpp.js"
import cookieParser from "cookie-parser";
import session from "express-session";
import os from "os"
import cluster from "cluster"
import MongoStore from "connect-mongo";
import bcrypt from 'bcrypt';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';
import {usersSchema} from "./Models/usersModel.js";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import  { Server } from "socket.io"
import rutas from './Rutas/index.js';
import { engine }  from 'express-handlebars'
import path from 'path';
import {normalizeM, denormalizeM} from  './normalizr.js';
import dotenv from "dotenv";
dotenv.config({path: ".env"});
const puerto= process.env.PORT;
import{contenedorProductos}  from './DB/MariaDB/contenedor.js';
import chatDao from './DB/mongoChat/ChatDao.js';
const chat = new chatDao();
import {logger} from "./logs/loggers.js"
import compression from "compression"
import {idAvatar} from "./Controllers/users.js"
if (mode === "cluster" && cluster.isPrimary){
os.cpus().map(() => {
  cluster.fork();
}
)
cluster.on("exit", worker=>{
  logger.warn(`Worker ${worker.process.pid} died, a new one is being created`)
   cluster.fork()
} )

}else{
  
app.use(compression())
app.use((req, res, next)=>{
    logger.info(`New request: ${req.method} - ${req.path}`)
    next()
})



  function cryptPass(password){
    const salt = bcrypt.genSaltSync(10);
    return  bcrypt.hashSync(password, salt);
}

function comparePass(password, hash){
    return bcrypt.compareSync(password, hash);
}

const expressServer= app.listen(process.env.PORT || port , (err) => {
  if(!err){
    logger.info(`Servidor corriendo en el puerto ${port}`);
  } else{
    logger.error("error iniciando el servidor")
  }
  })

const io = new Server(expressServer);
app.use(express.static(path.join(__dirname, './public')))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
app.use(cookieParser());
app.use(
  session({
    store: MongoStore.create({
      mongoUrl:
     process.env.MONGOCOOKIE,
      mongoOptions,
    }),
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    rolling: true,
    cookie: {
    httpOnly : false,
    secure : false,
    maxAge: 10000,
    },
  })
);
app.use (passport.initialize());
app.use (passport.session());

const register = new LocalStrategy(
  { passReqToCallback: true },
  async (req, username, password, done) => {
    try {
      const existingUser = await usersSchema.findOne({ username });

      if (existingUser) {
        return done(null, null);
      }
      const userCart= await saveCart()
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

const mailOps=  {
 from : "server Node.js",
 to : process.env.MAIL,
 subject: "Nuevo usuario",
 html : `<div>Nombre de usuario : ${newUser.username}</div>
 <div>contraseña (encriptada) : ${newUser.password}</div>
 <div>email : ${newUser.email}</div>
 <div>primer nombre : ${newUser.firstName}</div>
 <div>apellido : ${newUser.lastName}</div>
 <div>edad : ${newUser.Age}</div>
 <div>telefono : ${newUser.phone}</div>
 <div>Avatar : ${newUser.avatar}</div>
 <div>Direccion : ${newUser.Direction}</div>
 ` ,
//  attachments: [{
// path: new URL(`./Avatars/${idAvatar}`, import.meta.url).pathname
// }]
    
}
        
           

const createdUser = await usersSchema.create(newUser);
const message = transporter.sendMail(mailOps)




      done(null, createdUser);
    } catch (err) {
      logger.warn("Error registrando usuario", err);
    
      done("Error en registro", null);
    }
  }
);
const login = new LocalStrategy(async (username, password, done) => {
  try {
    const user = await usersSchema.findOne({ username });

    if (!user || !comparePass(password, user.password)) {
      return done(null, null);
    }

    done(null, user);
  } catch (err) {
    logger.error("Error login", err);
    done("Error login", null);
  }
});
passport.use("register", register);
passport.use("login", login);
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  usersSchema.findById(id, done);
});



app.use("/api", rutas)

app.use((req, res) => {
  logger.error(`Ruta no encontrada: ${req.method} - ${req.path}`)
  res.status(404).json({ error404: `Ruta no encontrada ${req.method} ${req.path}` });
})

io.on("connection", async (socket) => { 
  logger.info( "un cliente se ha conectado")

const products = await contenedorProductos.getAll()
const messages = await chat.getAll()
const nos=  JSON.stringify(messages).length
const normalize = normalizeM(messages)
const denormalize = denormalizeM(normalize)
const longitudNormalized = JSON.stringify(normalize).length;
const longitudDenormalized = JSON.stringify(denormalize).length;
const Optimization = (100- (longitudNormalized * 100) / nos).toFixed();   
console.log (longitudNormalized)
console.log (longitudDenormalized)
console.log (nos)
//console.log(`normalizados: ${JSON.stringify(normalize)}`)
socket.emit("server: productos", products)
socket.emit('server:mensajes', messages)
socket.emit("server:porcentajes", Optimization)

socket.on ("client: new product", async product => {
  await  contenedorProductos.save(product)
   
  io.emit("server: productos", products)})
    
socket.on('client:message', async author12 => {
  const message = {author: {id : author12.id , nombre: author12.nombre , apellido: author12.apellido , edad : author12.edad, alias: author12.alias , avatar: author12.avatar}, Message: author12.Message}
logger.info(`Mensaje nuevo : ${message}`)

await chat.save(message) 
  
 io.emit('server:mensajes', messages)

})
})
//Handlebars
app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
    layoutsDir: path.join(__dirname,  './views/layout'),
    partialsDir: path.join(__dirname, './views/partials')
}))

app.set('views', path.join(__dirname, './views'))
app.set('view engine', 'hbs')
}
