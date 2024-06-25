document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    event.preventDefault();

    const searchLegajo = document.forms["searchForm"]["searchLegajo"].value;

    const response = await fetch(
      `http://localhost:3000/api/profesor/${searchLegajo}`
    );

    if (response.ok) {
      const profesor = await response.json();
      document.forms["searchForm"]["resultLegajo"].value = profesor.legajo;
      document.forms["searchForm"]["resultNombre"].value = profesor.nombre;
      document.forms["searchForm"]["resultApellido"].value = profesor.apellido;
      document.forms["searchForm"]["resultMaterias"].value =
        profesor.materias.join(", ");
    } else {
      document.forms["searchForm"]["resultLegajo"].value = "";
      document.forms["searchForm"]["resultNombre"].value = "";
      document.forms["searchForm"]["resultApellido"].value = "";
      document.forms["searchForm"]["resultMaterias"].value =
        "Profesor no encontrado";
    }
  });
