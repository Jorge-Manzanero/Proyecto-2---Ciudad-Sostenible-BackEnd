require("dotenv").config();

const express = require("express");
const fileUpload = require("express-fileupload");
const morgan = require("morgan");
const cors = require("cors");
const isAuth = require("./middlewares/isAuth");

// Creamos el servidor.
const app = express();

// Middleware que evita problemas con las CORS a la hora de conectar el cliente con el servidor.
app.use(cors());

// Middleware que indica al servidor cuál es el directorio de ficheros estáticos.
app.use(express.static(process.env.UPLOADS_DIR));

// Middleware que muestra información por consola sobre la petición entrante.
app.use(morgan("dev"));

// Middleware que permite deserializar un body en formato "raw" creando la propiedad
// "body" en el objeto "request".
app.use(express.json());

// Middleware que permite deserializar un body en formato "form-data" creando la propiedad
// "body" y "files" en el objeto "request".
app.use(fileUpload());

/**
 * ##########################
 * ## Controladores Users ##
 * ##########################
 */
const {
  newUser,
  validateUser,
  loginUser,
  getMe,
} = require("./controllers/users");

// Crear un usuario.
app.post("/users", newUser);

// Devuelve la información del usuario del token
app.get("/user", isAuth, getMe);

// Validamos un usuario.
app.put("/users/validate/:registrationCode", validateUser);

// Login de usuario.
app.post("/users/login", loginUser);

/**
 * ##########################
 * ## Controladores Post ##
 * ##########################
 */
const {
  selectPostById,
  selectAllPost,
  solvePost,
  newPost,
  deletePost,
} = require("./controllers/post");

//Crear un nuevo Post
app.post("/posts", isAuth, newPost);

//Resolver o activar un Post
app.put("/posts/:id", isAuth, solvePost);

//Seleciona todos los post por palabra clave
app.get("/posts", selectAllPost);

//Selecionamos un único post por su id
app.get("/posts/:id", selectPostById);

//Eliminar un post
app.delete("/posts/:id", isAuth, deletePost);

// Middleware de error.
app.use((err, req, res, next) => {
  console.error(err);

  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});

// Middleware de ruta no encontrada.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada",
  });
});

// Ponemos el servidor a escuchar peticiones en un puerto dado.
app.listen(process.env.PORT, () => {
  console.log(`Server listenting at http://localhost:${process.env.PORT}`);
});
