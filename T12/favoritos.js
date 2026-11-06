const productsList = document.querySelector("#products-list");
const searchInput = document.querySelector("#search-input");
const favCount = document.querySelector("#fav-count");

const addProductForm = document.querySelector("#add-product-form");
const newProductNameInput = document.querySelector("#new-product-name");
const newProductCategorySelect = document.querySelector("#new-product-category");
const categoryPreview = document.querySelector("#category-preview");
const addProductError = document.querySelector("#add-product-error");

let selectedProduct = null;

const nombresCategorias = {
  frutas: "Frutas y verduras",
  lacteos: "Lácteos",
  panaderia: "Panadería",
  bebidas: "Bebidas",
  abarrotes: "Abarrotes",
};

// 1. Crea una función createProductItem(nombre, categoria) que construya y
//    regrese un <li> con la misma estructura que los productos que ya están
//    pintados en el HTML (clase "producto cat-<categoria>", el nombre, el
//    badge de categoría con su texto, y el botón de favorito "♡").
function createProductItem(nombre, categoria) {
  const li = document.createElement("li");
  li.className = `producto cat-${categoria}`;
  li.tabIndex = 0;

  const divInfo = document.createElement("div");
  divInfo.className = "producto-info";

  const spanNombre = document.createElement("span");
  spanNombre.className = "producto-nombre";
  spanNombre.textContent = nombre;

  const spanCategoria = document.createElement("span");
  spanCategoria.className = `producto-categoria cat-${categoria}`;
  spanCategoria.textContent = nombresCategorias[categoria] || categoria;

  divInfo.appendChild(spanNombre);
  divInfo.appendChild(spanCategoria);

  const divAcciones = document.createElement("div");
  divAcciones.className = "producto-acciones";

  const btnFavorito = document.createElement("button");
  btnFavorito.className = "btn-favorito";
  btnFavorito.textContent = "♡";

  divAcciones.appendChild(btnFavorito);

  li.appendChild(divInfo);
  li.appendChild(divAcciones);

  return li;
}

// 2. Crea una función selectProduct(li) que le quite la clase "selected" al
//    producto que estaba seleccionado antes (si había uno) y se la ponga al
//    producto nuevo.
function selectProduct(li) {
  if (!li) return;

  if (selectedProduct) {
    selectedProduct.classList.remove("selected");
  }

  selectedProduct = li;
  selectedProduct.classList.add("selected");
}

// 3. Crea una función toggleFavorite(li, btn) que alterne (toggle) la clase
//    "favorito" en el producto, cambie el texto del botón entre "♡" y "♥",
//    y actualice #fav-count contando cuántos .producto.favorito hay en total.
function toggleFavorite(li, btn) {
  if (!li) return;

  const boton = btn || li.querySelector(".btn-favorito");
  const esFavorito = li.classList.toggle("favorito");

  if (boton) {
    boton.textContent = esFavorito ? "♥" : "♡";
  }

  const totalFavoritos = productsList.querySelectorAll(".producto.favorito").length;
  favCount.textContent = totalFavoritos;
}

// 4. Agrega UN SOLO listener de click en #products-list (delegación): si el
//    clic fue en el botón ".btn-favorito" llama a toggleFavorite; si fue en
//    cualquier otra parte de la tarjeta, llama a selectProduct. Debe
//    funcionar también en los productos que se agreguen después.
productsList.addEventListener("click", (event) => {
  const btn = event.target.closest(".btn-favorito");
  const li = event.target.closest(".producto");

  if (!li) return;

  if (btn) {
    toggleFavorite(li, btn);
  } else {
    selectProduct(li);
  }
});

// 5. Agrega un listener de keydown en document: si hay un producto
//    seleccionado y la tecla presionada es "f" (sin importar mayúscula o
//    minúscula), llama a toggleFavorite sobre ese producto. No debe
//    activarse si el usuario está escribiendo dentro de un input o textarea.
document.addEventListener("keydown", (event) => {
  const tag = event.target.tagName;
  if (tag === "INPUT" || tag === "TEXTAREA") return;

  if (selectedProduct && event.key.toLowerCase() === "f") {
    const btn = selectedProduct.querySelector(".btn-favorito");
    toggleFavorite(selectedProduct, btn);
  }
});

// 6. Agrega un listener de change en el select de categoría que actualice
//    el texto y la clase de #category-preview para reflejar la categoría
//    que se acaba de elegir.
newProductCategorySelect.addEventListener("change", () => {
  const categoria = newProductCategorySelect.value;
  categoryPreview.className = `producto-categoria cat-${categoria}`;
  categoryPreview.textContent = nombresCategorias[categoria];
});

// 7. Agrega un listener de submit en el formulario de alta de productos que
//    use preventDefault, lea el nombre (sin espacios al inicio/final), y
//    revise si ya existe un producto con ese nombre exacto entre los que ya
//    están pintados (sin importar mayúsculas/minúsculas). Si ya existe,
//    muestra el mensaje de error en #add-product-error y no continúes.
// 8. Si el nombre es válido, crea el producto con createProductItem y
//    agrégalo a la lista, limpia el formulario, y regresa la vista previa
//    de categoría a su valor por defecto.
addProductForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const nombre = newProductNameInput.value.trim();
  const categoria = newProductCategorySelect.value;

  if (!nombre) return;

  const productosExistentes = productsList.querySelectorAll(".producto-nombre");
  const yaExiste = Array.from(productosExistentes).some(
    (span) => span.textContent.trim().toLowerCase() === nombre.toLowerCase()
  );

  if (yaExiste) {
    addProductError.textContent = "Este producto ya existe en la lista.";
    addProductError.hidden = false;
    return;
  }

  addProductError.hidden = true;
  addProductError.textContent = "";

  const nuevoProducto = createProductItem(nombre, categoria);

  // Si hay una búsqueda activa, evaluar si el nuevo producto debe mostrarse u ocultarse
  const textoBuscado = searchInput.value.trim().toLowerCase();
  if (textoBuscado && !nombre.toLowerCase().includes(textoBuscado)) {
    nuevoProducto.classList.add("oculto");
  }

  productsList.appendChild(nuevoProducto);

  addProductForm.reset();

  const categoriaPorDefecto = newProductCategorySelect.value;
  categoryPreview.className = `producto-categoria cat-${categoriaPorDefecto}`;
  categoryPreview.textContent = nombresCategorias[categoriaPorDefecto];
});

// 9. Agrega un listener de input en el campo de nombre nuevo que oculte el
//    mensaje de error en cuanto el usuario vuelva a escribir.
newProductNameInput.addEventListener("input", () => {
  addProductError.hidden = true;
  addProductError.textContent = "";
});

// 10. Agrega un listener de input en el buscador que oculte (clase
//     "oculto") los productos cuyo nombre no incluya el texto buscado, sin
//     importar mayúsculas o minúsculas.
searchInput.addEventListener("input", () => {
  const filtro = searchInput.value.toLowerCase();
  const productos = productsList.querySelectorAll(".producto");

  productos.forEach((li) => {
    const nombreProducto = li.querySelector(".producto-nombre").textContent.toLowerCase();
    const coincide = nombreProducto.includes(filtro);
    li.classList.toggle("oculto", !coincide);
  });
});