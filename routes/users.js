const router = express.Router();
var express = require("express");
var middleware = require("../middleware.js");

var { getUsuarios, autenticar, createUsuario} = require("../controllers.js");

router.route("/usuarios").get(middleware.checkToken, getUsuarios);

router.post("/autenticar", autenticar);

router.route("/registrar").post(middleware.checkToken, createUsuario);

module.exports = router;