// ============================================================
// Súper Fresco — Reseñas de clientes
// ============================================================

// Clase que representa una reseña
class Resena {
  constructor(autor, producto, comentario, calificacion) {
    this.autor = autor;
    this.producto = producto;
    this.comentario = comentario;
    this.calificacion = calificacion;
  }
}

// Datos de reseñas (dados, no se modifica su tamaño)
let resenas = [
  new Resena("Marta", "Manzanas", "Muy frescas, llegaron en buen estado", 5),
  new Resena("Luis", "Leche", "Buen precio pero la entrega tardó", 3),
  new Resena("Ana", "Pan artesanal", "Delicioso, lo recomiendo", 5),
  new Resena("Carlos", "Zanahorias", "Llegaron algo golpeadas", 2),
  new Resena("Sofía", "Café", "Excelente sabor y aroma", 4),
  new Resena("Pedro", "Manzanas", "Buen sabor, aunque algo pequeñas", 4),
  new Resena("Diana", "Leche", "Siempre llega fresca", 3),
  new Resena("Jorge", "Café", "El mejor café que he probado aquí", 5),
  new Resena("Valeria", "Pan artesanal", "Un poco duro esta vez", 2),
  new Resena("Miguel", "Zanahorias", "Buena calidad, volveré a comprar", 4),
];

// 1. Crea y regresa una tarjeta (un div) con los datos de la reseña:
//    autor, producto, calificación y comentario. No la inserta en la
//    página, solo la regresa.
function crearTarjetaResena(autor, producto, calificacion, comentario) {
  const tarjeta = document.createElement("div");
  tarjeta.classList.add("tarjeta-resena");
  
  // Guardamos autor y calificación en dataset para facilitar las búsquedas y el filtro del DOM
  tarjeta.dataset.autor = autor;
  tarjeta.dataset.calificacion = calificacion;

  // Estructura interna acorde a los selectores de style.css:
  // .tarjeta-resena strong, .producto, p, .calificacion
  tarjeta.innerHTML = `
    <strong>${autor}</strong> <span class="producto">(${producto})</span>
    <p>${comentario}</p>
    <span class="calificacion">Calificación: ${calificacion}/5</span>
  `;

  return tarjeta;
}

// 2. Igual que crearTarjetaResena, pero si se da claseExtra se la agrega
//    a la tarjeta antes de regresarla.
function crearTarjetaConClase(autor, producto, calificacion, comentario, claseExtra = "") {
  const tarjeta = crearTarjetaResena(autor, producto, calificacion, comentario);
  if (claseExtra && claseExtra.trim() !== "") {
    tarjeta.classList.add(claseExtra.trim());
  }
  return tarjeta;
}

// 3. Regresa un string con los datos de la reseña.
//    Formato exacto: "autor opinó sobre producto: calificacion estrellas"
//    ej: "Marta opinó sobre Manzanas: 5 estrellas"
function datosResena({ autor, producto, calificacion }) {
  return `${autor} opinó sobre ${producto}: ${calificacion} estrellas`;
}

// 4. Limpia el contenedor #listaResenas y pinta una tarjeta por cada
//    reseña del arreglo, usando crearTarjetaConClase.
function renderizarResenas(resenas = []) {
  const contenedor = document.querySelector("#listaResenas");
  if (!contenedor) return;

  contenedor.innerHTML = "";

  resenas.forEach(({ autor, producto, calificacion, comentario }) => {
    const tarjeta = crearTarjetaConClase(autor, producto, calificacion, comentario);
    contenedor.appendChild(tarjeta);
  });
}

// 5. Regresa el elemento de la tarjeta de ese autor (o null si no existe).
function buscarTarjeta(autor) {
  const tarjetas = document.querySelectorAll("#listaResenas .tarjeta-resena");
  for (const tarjeta of tarjetas) {
    const nombreAutor = tarjeta.dataset.autor || tarjeta.querySelector("strong")?.textContent;
    if (nombreAutor === autor) {
      return tarjeta;
    }
  }
  return null;
}

// 6. Le agrega la clase "destacada" a la tarjeta de ese autor.
function destacarResena(autor) {
  const tarjeta = buscarTarjeta(autor);
  if (tarjeta) {
    tarjeta.classList.add("destacada");
  }
}

// 7. Le quita la clase "destacada" a la tarjeta de ese autor.
function quitarDestacado(autor) {
  const tarjeta = buscarTarjeta(autor);
  if (tarjeta) {
    tarjeta.classList.remove("destacada");
  }
}

// 8. Elimina la tarjeta de ese autor de la pantalla.
function quitarResena(autor) {
  const tarjeta = buscarTarjeta(autor);
  if (tarjeta) {
    tarjeta.remove();
  }
}

// 9. Regresa un objeto nuevo que combina base y extra, sin modificar
//    ninguno de los dos. Si un campo se repite, el valor de extra gana.
function combinarFiltros(base, extra = {}) {
  return { ...base, ...extra };
}

// 10. Alterna (toggle) la clase "destacada" en todas las tarjetas ya
//     pintadas cuya calificación esté entre las que se reciban como
//     argumentos: si no la tenía se la pone, si ya la tenía se la quita.
function destacarPorCalificacion(...calificaciones) {
  const calificacionesNum = calificaciones.map(Number);
  const tarjetas = document.querySelectorAll("#listaResenas .tarjeta-resena");

  tarjetas.forEach((tarjeta) => {
    const califTarjeta = Number(tarjeta.dataset.calificacion);
    if (calificacionesNum.includes(califTarjeta)) {
      tarjeta.classList.toggle("destacada");
    }
  });
}

// ============================================================
// A partir de aquí solo es DOM de la página de demo, para probar
// a mano. Esto NO es lo que se revisa.
// ============================================================

function manejarDestacar() {
  const autor = document.querySelector("#inputAutor").value.trim();
  destacarResena(autor);
}

function manejarQuitarDestacado() {
  const autor = document.querySelector("#inputAutor").value.trim();
  quitarDestacado(autor);
}

function manejarEliminar() {
  const autor = document.querySelector("#inputAutor").value.trim();
  quitarResena(autor);
}

function manejarDestacarPorCalificacion() {
  const texto = document.querySelector("#inputCalificaciones").value.trim();
  const calificaciones = texto
    .split(",")
    .map((valor) => Number(valor.trim()))
    .filter((valor) => !Number.isNaN(valor));
  destacarPorCalificacion(...calificaciones);
}

// Muestra TODAS las reseñas del producto buscado, no solo una.
function manejarVerDatos() {
  const producto = document.querySelector("#inputProductoDatos").value.trim();
  const coincidencias = resenas.filter((resena) => resena.producto === producto);
  const resultadoEl = document.querySelector("#resultadoDatos");
  resultadoEl.innerHTML = coincidencias.length
    ? coincidencias.map((resena) => datosResena(resena)).join("<br>")
    : "No se encontraron reseñas de ese producto";
}

// Filtro real: junta un filtro base (se ve todo por default) con la
// calificación mínima que escriba el usuario, usando combinarFiltros,
// y oculta las tarjetas que no cumplan.
function manejarBuscar() {
  const filtroBase = { calificacionMinima: 1 };
  const valor = document.querySelector("#inputCalifMinima").value.trim();
  const extra = valor ? { calificacionMinima: Number(valor) } : {};
  const filtro = combinarFiltros(filtroBase, extra);

  document.querySelectorAll("#listaResenas .tarjeta-resena").forEach((tarjeta) => {
    const coincide = Number(tarjeta.dataset.calificacion) >= filtro.calificacionMinima;
    tarjeta.classList.toggle("oculta", !coincide);
  });

  document.querySelector("#resultadoBusqueda").textContent =
    `Mostrando reseñas con calificación >= ${filtro.calificacionMinima}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderizarResenas(resenas);
});