import passport from 'passport';
import  {Router} from "express";
const router = new Router();
// import { newUser, result, destroyUser, checkCookie} from "../Controllers/cookies.js";
import  {getDatos, getLogin, postLogin, getFaillogin, getLogout, failRoute, getSignup, postSignup, getFailsignup, checkAuthentication} from "../Controllers/users.js";
router.get("/inicio",getLogin ).post("/inicio", passport.authenticate("login", {failureRedirect: "/Error-log"}), postLogin )
router.get("/Error-log", getFaillogin )
router.get("/registro", getSignup).post(
  "/registro",
  passport.authenticate("register", { failureRedirect: "/Error-sign" }),
  postSignup
);
router.get("/Error-sign", getFailsignup);

router.get("/Datos", checkAuthentication, getDatos); 







router.get("/logout", getLogout);

router.get("*", failRoute);















export default  router;
