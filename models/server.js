const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();
const port = 3000;

// Middlewares
app.use(express.static(path.join(__dirname, "public")));
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
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

// Esquema y modelo de Mongoose
const profesorSchema = new mongoose.Schema(
  {
    legajo: String,
    nombre: String,
    apellido: String,
    materias: [String],
  },
  { collection: "profesor", versionKey: false }
);

const Profesor = mongoose.model("Profesor", profesorSchema);

// Ruta para guardar datos
app.post("/api/profesor", async (req, res) => {
  const { legajo, nombre, apellido, materias } = req.body;
  const newProfesor = new Profesor({ legajo, nombre, apellido, materias });
  try {
    await newProfesor.save();
    res.status(201).send("Profesor y materias guardados exitosamente");
  } catch (error) {
    res.status(400).send("Error al guardar el profesor y materias");
  }
});

// Ruta para obtener un usuario por legajo
app.get("/api/profesor/:legajo", async (req, res) => {
  const { legajo } = req.params;
  try {
    const profesor = await Profesor.findOne({ legajo });
    if (profesor) {
      res.status(200).json(profesor);
    } else {
      res.status(404).send("Profesor no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el Profesor");
  }
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
