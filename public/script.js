document
  .getElementById("formInsertar")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const legajo = document.forms["formInsertar"]["legajo"].value;
    const nombre = document.forms["formInsertar"]["nombre"].value;
    const apellido = document.forms["formInsertar"]["apellido"].value;

    const materias = Array.from(
      document.querySelectorAll('input[name="materias"]:checked')
    ).map((el) => el.value);

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

///

document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchLegajo = document.getElementById("searchLegajo").value;

    const response = await fetch(
      `http://localhost:3000/api/profesor/${searchLegajo}`
    );

    const result = document.getElementById("searchResult");
    result.innerHTML = "";

    if (response.ok) {
      const profesor = await response.json();
      result.innerHTML = `<p>Legajo: ${profesor.legajo}</p>
                                    <p>Nombre: ${profesor.nombre}</p>
                                    <p>Apellido: ${profesor.apellido}</p>
                                    <p>Materias: ${profesor.materias.join(
                                      ", "
                                    )}</p>`;
    } else {
      result.innerHTML = "<p>Profesor no encontrado</p>";
    }
  });
