const mongoose = require("mongoose");

const profesorSchema = new mongoose.Schema(
  {
    legajo: String,
    nombre: String,
    apellido: String,
    materias: [String],
  },
  { collection: "profesor", versionKey: false }
);

module.exports = mongoose.model("Profesor", profesorSchema);
