// Añadimos un event listener para manejar el evento 'submit' del formulario con ID 'searchForm'
document
  .getElementById("searchForm")
  .addEventListener("submit", async function (event) {
    // Prevenimos el comportamiento por defecto del formulario (que recargaría la página)
    event.preventDefault();

    // Obtenemos el valor del campo de texto con ID 'searchLegajo'
    const searchLegajo = document.getElementById("searchLegajo").value;

    // Hacemos una solicitud GET a la URL especificada para obtener los datos del profesor
    const response = await fetch(
      `http://localhost:3000/api/profesor/${searchLegajo}`
    );

    // Obtenemos el elemento donde se mostrará el resultado de la búsqueda
    const result = document.getElementById("searchResult");
    result.innerHTML = ""; // Limpiamos cualquier contenido previo en el elemento de resultados

    // Verificamos si la respuesta de la solicitud fue exitosa
    if (response.ok) {
      const profesor = await response.json(); // Convertimos la respuesta JSON a un objeto JavaScript
      // Mostramos los detalles del profesor en el elemento de resultados
      result.innerHTML = `<p>Legajo: ${profesor.legajo}</p>
                          <p>Nombre: ${profesor.nombre}</p>
                          <p>Apellido: ${profesor.apellido}</p>
                          <p>Materias: ${profesor.materias.join(", ")}</p>`;
    } else {
      result.innerHTML = "<p>Profesor no encontrado</p>"; // Mostramos un mensaje indicando que el profesor no fue encontrado
    }
  });
