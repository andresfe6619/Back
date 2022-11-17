import express from "express";
import passport from "passport";
import { Router } from "express";
import { fileURLToPath } from "url";
//Dejé lo de las cookies en caso de que lo quiseras ver
//import { newUser, result, destroyUser, checkCookie} from "../Controllers/cookies.js";
import path from "path";
import { upload } from "../services/users.service.js";
import {getDatos, getLogin, postLogin, getFaillogin, getLogout, failRoute, getSignup, postSignup, getFailsignup, checkAuthentication,} from "../Controllers/route-controller-dao/users.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = new Router();
router
  .get("/inicio", getLogin)
  .post(
    "/inicio",
    passport.authenticate("login", { failureRedirect: "/api/users/Error-log" }),
    postLogin
  );
router.get("/Error-log", getFaillogin);
router
  .get("/registro", getSignup)
  .post(
    "/registro",
    upload.single("Avatar"),
    passport.authenticate("register", {
      failureRedirect: "/api/users/Error-sign",
    }),
    postSignup
  );
router.get("/Error-sign", getFailsignup);
router.use(checkAuthentication);
router.use(express.static(path.join(__dirname, "../Avatars")));
router.get("/home", getDatos);

router.get("/logout", getLogout);

router.get("*", failRoute);

export default router;
