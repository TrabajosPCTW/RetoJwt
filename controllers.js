var asyncHandler = require("express-async-handler");
var usuario = require("./modelUser.js");
let jwt = require("jsonwebtoken");
let config = require("./config.js")


const getUsuarios = ( (req, res) => {
    const user =  usuario.findOne({ role: req.decoded.role }); 
    if (req.decoded.role == 0 || req.decoded.role == 2) {
      const users = await usuario.find();
      res.send(users);
    } else {
      res.status(401);
      res.send("No tiene permisos de lectura");
    }
  });

const autenticar = ((req, res) => {
  const { username, password } = req.body;
  const user =  usuario.findOne({ username });
  if (user && user.validPassword(password)) {
    let token = jwt.sign({ username }, config.secret, {
      expiresIn: "24h",
    });
    res.send({
      success: true,
      message: "Autenticación correcta",
      token: token,
    });
  } else {
    res.status(401);
    res.send("Usuario no encontrado o contraseña incorrecta");
  }
  res.send({ username, password });
});

const createUsuario = ((req, res) => {

  const usuarioActual = usuario.findOne({ username: req.decoded.username });

  if (req.decoded.role == 1 || req.decoded.role == 2) {

    const { username, password, role } = req.body;

    const user = usuario.create({username, password, role,});

    if (user) {
      let token = jwt.sign({ username }, config.secret, {
        expiresIn: "24h",
      });
      res.status(201).send({
        _id: user._id,
        username: user.username,
        role: user.role,
        token: token,
      });
    } else {
      res.status(400);
      throw new Error("Error");
    }
  } else {
    res.status(401);
    res.send("No tiene permisos de escritura");
  }
});

module.exports = { autenticar, getUsuarios, createUsuario};