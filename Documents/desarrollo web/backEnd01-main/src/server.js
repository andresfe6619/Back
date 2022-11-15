import { port, mode } from "./yargs.js";
import express from "express";
import cookieParser from "cookie-parser";
import session from "express-session";
import os from "os";
import cluster from "cluster";
import MongoStore from "connect-mongo";
import passport from "passport";
import {normalizeM, denormalizeM} from "./services/normalizr.js"
import { usersSchema } from "./Models/Daos/mongo/usersModel.js";
import { userDao } from "./Models/Daos/indexDaoFactory.js";
const app = express();
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import { Server } from "socket.io";
import rutas from "./Rutas/index.js";
import { engine } from "express-handlebars";
import path from "path";
import dotenv from "dotenv";
import { contenedorProductos } from "./DB/MariaDB/contenedor.js";
import chatDao from "./DB/mongoChat/ChatDao.js";
import { logger } from "./logs/loggers.js";
import compression from "compression";
import {login, register } from "./services/users.service.js";
const chat = new chatDao();
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
  
  const products = await contenedorProductos.getAll()
  const messagePool= []

  const messages = await chat.getAll()
  messagePool.push(messages)
  const nos=  JSON.stringify(messages).length
  const normalize = normalizeM(messages)
  const denormalize = denormalizeM(normalize)
  const longitudNormalized = JSON.stringify(normalize).length;
  const longitudDenormalized = JSON.stringify(denormalize).length;
  const Optimization = (100- (longitudNormalized * 100) / nos).toFixed();   

  socket.emit("server: productos", products)
  socket.emit('server:mensajes', messagePool)
  socket.emit("server:porcentajes", Optimization)
  
  socket.on ("client: new product", async product => {
    await  contenedorProductos.save(product)
     
    io.emit("server: productos", products)})
      
  socket.on('client:message', async author12 => {
    const message = {author: {id : author12.id , nombre: author12.nombre , apellido: author12.apellido , edad : author12.edad, alias: author12.alias , avatar: author12.avatar}, Message: author12.Message}
  logger.info(`Mensaje nuevo : ${message}`)
  
  await chat.save(message) 
  messagePool.push(message)  
   io.emit('server:mensajes', messagePool)
  
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