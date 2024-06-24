document
  .getElementById("formInsertar")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const legajo = document.forms["formInsertar"]["legajo"].value;
    const nombre = document.forms["formInsertar"]["nombre"].value;
    const apellido = document.forms["formInsertar"]["apellido"].value;

    const checkboxes = document.querySelectorAll(
      'input[name="materias"]:checked'
    );
    const materias = [];
    for (let i = 0; i < checkboxes.length; i++) {
      materias.push(checkboxes[i].value);
    }

    const response = await fetch("http://localhost:3000/api/profesor", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ legajo, nombre, apellido, materias }),
    });

    if (response.ok) {
      alert("Profesor y materias guardados exitosamente");
    } else {
      alert("Error al guardar el profesor y materias");
    }
  });
