import { port, mode } from "./yargs.js";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import os from "os";
import cluster from "cluster";
import MongoStore from "connect-mongo";
import passport from "passport";
import {normalizeM, denormalizeM} from "./services/normalizr.js"
import { userDao, chatDao } from "./Models/indexDaoFactory.js";
import { fileURLToPath } from "url";
import { Server } from "socket.io";
import rutas from "./Rutas/index.js";
import { engine } from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
import { productService } from "./services/Product.service.js";
import { logger } from "./logs/loggers.js";
import compression from "compression";
import {login, register } from "./services/users.service.js";

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: ".env" });

if (process.env.MODE === "cluster" && cluster.isPrimary) {
  os.cpus().map(() => {
    cluster.fork();
  });
    cluster.on("exit", (worker) => {
    logger.warn(
    `Worker ${worker.process.pid} died, a new one is being created`
    );
    cluster.fork();
  });
} else {
  app.use(compression());
  app.use((req, res, next) => {
    logger.info(`New request: ${req.method} - ${req.path}`);
    next();
  });
  const puerto = process.env.PORT || port;
  const expressServer = app.listen(puerto, (err) => {
    if (!err) {
      logger.info(`Servidor corriendo en el puerto ${puerto}`);
    } else {
      logger.error("error iniciando el servidor");
    }
  });

  const io = new Server(expressServer);
  app.use(express.static(path.join(__dirname, "./public")));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  const mongoOptions = { useNewUrlParser: true, useUnifiedTopology: true };
  app.use(cookieParser());
  app.use(
    session({
      store: MongoStore.create({
        mongoUrl: process.env.MONGOCOOKIE,
        mongoOptions,
      }),
      secret: process.env.SECRET,
      resave: false,
      saveUninitialized: false,
      rolling: true,
      cookie: {
        httpOnly: false,
        secure: false,
        maxAge: 10000,
      },
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.use("register", register);
  passport.use("login", login);
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });

  passport.deserializeUser((id, done) => {
    userDao.findName(id, done);

  });

  app.use("/api", rutas);

  app.use((req, res) => {
    logger.error(`Ruta no encontrada: ${req.method} - ${req.path}`);
    res
      .status(404)
      .json({ error404: `Ruta no encontrada ${req.method} ${req.path}` });
  });

  io.on("connection", async (socket) => { 
    logger.info( "un cliente se ha conectado")

  const products = await productService.getAll()

 
  const messages = await chatDao.getAll()


  const normalize = normalizeM(messages)
  const denormalize = denormalizeM(normalize)
  const longitudNormalized = JSON.stringify(normalize).length;
  const longitudDenormalized = JSON.stringify(denormalize).length;
  const Optimization = (100 - (longitudDenormalized * 100) / longitudNormalized).toFixed();   
  socket.emit("server: productos", products)
  socket.emit('server:mensajes', messages)
  socket.emit("server:porcentajes", Optimization)
  
  socket.on ("client: new product", async product => {
    await  productService.saveObject(product)
    const newProd = await productService.getAll()
    io.emit("server: productos", newProd)})
      
  socket.on('client:message', async author12 => {
    const message = {author: {id : author12.id , nombre: author12.nombre , apellido: author12.apellido , edad : author12.edad, alias: author12.alias , avatar: author12.avatar}, Message: author12.Message}
    logger.info(`Mensaje nuevo : ${message}`)
  
    await chatDao.saveObject(message) 
    const newMsg= await chatDao.getAll()
   
   io.emit('server:mensajes', newMsg)
 
  })
  })
  //Handlebars
  app.engine('hbs', engine({
      extname: '.hbs',
      defaultLayout: path.join(__dirname, './views/layouts/main.hbs'),
      layoutsDir: path.join(__dirname,  './views/layouts'),
      partialsDir: path.join(__dirname, './views/partials')
  }))
  
  app.set('views', path.join(__dirname, './views'))
  app.set('view engine', 'hbs')
  }
