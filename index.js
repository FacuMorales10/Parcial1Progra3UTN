// Obtiene el carrito del LocalStorage parseado como array (si no existe, inicia vacío)
function obtenerCarrito() {
    const carritoJSON = localStorage.getItem("carrito");
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

// Imprime en consola y guarda el estado actual en LocalStorage
function guardarCarrito(carrito) {
    console.log("Carrito antes de actualizar LocalStorage:", carrito);
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function sumarAlCarrito(e) {
    const elementoClickeado = e.target; // <--- Variable, NO lleva ()
    
    // Subimos al contenedor <li> para buscar los datos de este producto en particular
    const cardProducto = elementoClickeado.closest("li");
    const nombre = cardProducto.querySelector(".nombre-producto").textContent.trim();
    
    // Sacamos el "$" para poder operar el precio como un número entero puro
    const precioTexto = cardProducto.querySelector(".precio-producto").textContent;
    const precio = parseInt(precioTexto.replace("$", ""));

    let carrito = obtenerCarrito();

    // Buscamos si el producto ya fue agregado antes
    const productoExistente = carrito.find(item => item.nombre === nombre);

    if (productoExistente) {
        productoExistente.cantidad += 1;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            cantidad: 1
        });
    }

    guardarCarrito(carrito);
    alert(`Un/una: ${nombre} fue agregado al carrito.`);
}

function restarDelCarrito(e) {
    const elementoClickeado = e.target; // <--- Variable, NO lleva ()
    const cardProducto = elementoClickeado.closest("li");
    const nombre = cardProducto.querySelector(".nombre-producto").textContent.trim();

    let carrito = obtenerCarrito();

    if (carrito.length === 0) {
        alert("No hay ningún producto guardado en el carrito.");
        return;
    }

    const indice = carrito.findIndex(item => item.nombre === nombre);

    if (indice === -1) {
        alert(`No hay más ${nombre} en el carrito.`);
    } else {
        carrito[indice].cantidad -= 1;
        alert(`Un/una: ${nombre} fue eliminado del carrito.`);

        if (carrito[indice].cantidad === 0) {
            carrito.splice(indice, 1);
        }

        guardarCarrito(carrito);
    }
}

// Vinculación limpia de los eventos "click" cuando el DOM está completamente cargado
window.addEventListener("DOMContentLoaded", () => {
    const botonesSumar = document.querySelectorAll(".btn-sumar-a-carrito");
    const botonesRestar = document.querySelectorAll(".btn-restar-a-carrito");

    botonesSumar.forEach(btn => btn.addEventListener("click", sumarAlCarrito));
    botonesRestar.forEach(btn => btn.addEventListener("click", restarDelCarrito));
});