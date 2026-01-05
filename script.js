document.getElementById("camionForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const numeroCamion = document.getElementById("numeroCamion").value;
  const nombreRuta = document.getElementById("nombreRuta").value;
  const carril = document.getElementById("carril").value;
  const horaLlegada = new Date().toLocaleTimeString();

  const nuevoCamion = {
    numeroCamion,
    nombreRuta,
    carril,
    horaLlegada
  };

  // Guardar en localStorage
  const camiones = JSON.parse(localStorage.getItem("camiones") || "[]");
  camiones.push(nuevoCamion);
  localStorage.setItem("camiones", JSON.stringify(camiones));

  // Mostrar en tabla
  const tabla = document.getElementById("tablaCamiones").querySelector("tbody");
  const fila = document.createElement("tr");
  fila.innerHTML = `
    <td>${tabla.rows.length + 1}</td>
    <td>${numeroCamion}</td>
    <td>${nombreRuta}</td>
    <td>${carril}</td>
    <td>${horaLlegada}</td>
  `;
  tabla.appendChild(fila);

  document.getElementById("camionForm").reset();
});
tarjeta.innerHTML = `
  <div class="card shadow h-100">
    <img src="https://copilot.microsoft.com/th/id/BCO.1571b350-2ead-454d-b01b-320ad0c38d9e.png" class="card-img-top" alt="Camión">
    <div class="card-body">
      <h5 class="card-title">Camión #${camion.numeroCamion}</h5>
      <p><strong>Ruta:</strong> ${camion.nombreRuta}</p>
      <p><strong>Carril:</strong> ${camion.carril}</p>
      <p><strong>Hora de Llegada:</strong> ${camion.horaLlegada}</p>
    </div>
  </div>
`;
function limpiarPorCarril() {
  const letra = document.getElementById("carrilSeleccionado").value;
  if (!letra) return alert("Selecciona un carril para limpiar.");

  const mapaCarriles = {
    "A": "1", "B": "2", "C": "3", "D": "4",
    "E": "5", "F": "6", "G": "7", "H": "8",
    "I": "9", "J": "10"
  };

  const carrilNum = mapaCarriles[letra];
  let camiones = JSON.parse(localStorage.getItem("camiones") || "[]");
  camiones = camiones.filter(c => c.carril !== carrilNum);
  localStorage.setItem("camiones", JSON.stringify(camiones));
  location.reload();
}

function limpiarTodo() {
  if (confirm("¿Estás seguro de que quieres borrar todo el historial?")) {
    localStorage.removeItem("camiones");
    location.reload();
  }
}

