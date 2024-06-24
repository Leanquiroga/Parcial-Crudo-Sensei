const Profesor = require("../models/profesorModel");

exports.createProfesor = async (req, res) => {
  const { legajo, nombre, apellido, materias } = req.body;
  const newProfesor = new Profesor({ legajo, nombre, apellido, materias });
  try {
    await newProfesor.save();
    res.status(201).send("Profesor y materias guardados exitosamente");
  } catch (error) {
    res.status(400).send("Error al guardar el profesor y materias");
  }
};

exports.getProfesor = async (req, res) => {
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
};
