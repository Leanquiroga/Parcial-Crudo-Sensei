const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const profesorController = require("../controllers/profesorController");

const app = express();
const port = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "view")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "view", "index.html"));
});
app.use(express.json());
app.use(cors());

// Conexión a MongoDB
mongoose
  .connect("mongodb://localhost:27017/UTN-FRT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Conectado a MongoDB");
  })
  .catch((err) => {
    console.error("Error al conectar a MongoDB", err);
  });

// Rutas
app.post("/api/profesor", profesorController.createProfesor);
app.get("/api/profesor/:legajo", profesorController.getProfesor);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
