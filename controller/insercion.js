// Añadimos un event listener para manejar el evento 'submit' del formulario con ID 'formInsertar'
document
  .getElementById("formInsertar")
  .addEventListener("submit", async function (event) {
    // Prevenimos el comportamiento por defecto del formulario (que recargaría la página)
    event.preventDefault();

    // Obtenemos los valores de los campos del formulario
    const legajo = document.forms["formInsertar"]["legajo"].value;
    const nombre = document.forms["formInsertar"]["nombre"].value;
    const apellido = document.forms["formInsertar"]["apellido"].value;

    // Seleccionamos todos los inputs marcados con el nombre 'materias' y obtenemos sus valores
    const checkboxes = document.querySelectorAll(
      'input[name="materias"]:checked'
    );
    const materias = [];
    for (let i = 0; i < checkboxes.length; i++) {
      materias.push(checkboxes[i].value);
    }

    // Hacemos una solicitud POST a la URL especificada para guardar los datos del profesor
    const response = await fetch("http://localhost:3000/api/profesor", {
      method: "POST", // Método HTTP utilizado
      headers: {
        "Content-Type": "application/json", // Especificamos que el contenido es JSON
      },
      body: JSON.stringify({ legajo, nombre, apellido, materias }), // Convertimos los datos a JSON y los enviamos en el cuerpo de la solicitud
    });

    // Verificamos si la respuesta de la solicitud fue exitosa
    if (response.ok) {
      alert("Profesor y materias guardados exitosamente"); // Mostramos un mensaje de éxito
    } else {
      alert("Error al guardar el profesor y materias"); // Mostramos un mensaje de error
    }
  });
