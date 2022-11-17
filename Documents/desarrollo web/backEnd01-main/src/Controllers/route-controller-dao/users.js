import dotenv from "dotenv";
import { logger } from "../../logs/loggers.js";

dotenv.config({ path: ".env" });

function getRoot(req, res) {}
function getLogin(req, res) {
  if (req.isAuthenticated()) {
    var user = req.user;
    logger.info(user.username);
 
    res.render("userForm", {username: user.username, firstName: user.firstName, lastName: user.lastName, email: user.email,});

  } else {
    logger.warn("user NO logueado");
    
    res.render("userForm");
  }
}
  
function getSignup(req, res) {
 
  res.render("register");
}

function postLogin(req, res) {
  var userSes = req.user;
  if (userSes) {

    res.render("userForm", {welcome: userSes.username, message: "bienvenido", Avatar: userSes.avatar, user: true} );
  } else {
  
    res.render("userForm", {welcome: "", user: false} );
  }
}

function postSignup(req, res) {
  var userSes = req.user;
  if (userSes) {
    logger.info("has sido registrado");
   
    res.render("register", {welcome: userSes.firstName , message: "has sido registrado", user: true} );
  } else {

    res.render("register", {welcome: "", user: false} );
  }
}

function checkAuthentication(req, res, next) {
  if (req.isAuthenticated()) {
    logger.info("authenticationis is true");
    next();
  } else {
    logger.warn("Authentication failed");
    res.redirect("/api/users/inicio");
  }
}

function getFaillogin(req, res) {
  logger.error("error en login");
  res.render("fails", { message: "Error logueandose", user: true} );};


function getFailsignup(req, res) {
  logger.error("error en signup");

  res.render("fails", { message: "Error en el sign up", user: false} );
}

function getLogout(req, res) {
  logger.warn("logged out");
  req.session.destroy();

  res.render("logout");
}

function failRoute(req, res) {
  logger.error(404 + "error");
  res.status(404).send("Error");
}
function getDatos(req, res) {
  var userSes = req.user;

  if (userSes) {
    logger.info("usuario logueado");
    res.render("userForm", {welcome:`nombre de usuario: ${userSes.username}` , message:`email : ${userSes.email}, `,
    phone: `telefono: ${userSes.phone}`, Age: `edad: ${userSes.Age}`, firstName: `Nombre :${userSes.firstName}`, lastName: `Apellido: ${userSes.lastName}`,
    Avatar: userSes.avatar,
    Directions:`direccion: ${userSes.Direction}`,
    user: true} );
  } else {
  
    res.render("userForm", {welcome: "", user: false} );
  }
}

export {
  getRoot,
  getLogin,
  postLogin,
  getFaillogin,
  getLogout,
  failRoute,
  getSignup,
  postSignup,
  getFailsignup,
  checkAuthentication,
  getDatos,
};
