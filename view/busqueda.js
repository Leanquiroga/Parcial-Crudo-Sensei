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
                          <p>Materias: ${profesor.materias.join(", ")}</p>`;
    } else {
      result.innerHTML = "<p>Profesor no encontrado</p>";
    }
  });
