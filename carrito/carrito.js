// Obtiene el carrito del LocalStorage parseado (si no existe, retorna array vacío)
function obtenerCarrito() 
{
    const carritoJSON = localStorage.getItem("carrito"); // a) Lee el LocalStorage
    return carritoJSON ? JSON.parse(carritoJSON) : [];
}

// Renderiza dinámicamente las filas de la tabla con los productos comprados
function cargarProductosCarrito() 
{
    let tabla = document.getElementById("tabla-carrito");
    let contenedorValorFinal = document.getElementById("valor-final");
    
    const carrito = obtenerCarrito();

    // Removemos las filas de productos viejos para no duplicar datos al recargar, 
    // pero manteniendo intacta la primera fila que es el encabezado (fila-header-carrito)
    const filasViejas = tabla.querySelectorAll("tr:not(.fila-header-carrito)");
    filasViejas.forEach(fila => fila.remove());

    // e) Si no hay productos agregados, el monto final debe decir obligatoriamente $0
    if (carrito.length === 0) {
        contenedorValorFinal.textContent = "El valor final a pagar es de: $0";
        
        // Agregamos una fila sutil que avise que está vacío
        let filaVacia = document.createElement("tr");
        filaVacia.innerHTML = `<td colspan="3" style="color: #808080; padding: 15px;">Tu carrito está vacío</td>`;
        tabla.appendChild(filaVacia);
        return;
    }

    let acumuladorTotal = 0;

    // a) Recorremos el listado sin repetir productos, ya que manejamos el campo cantidad
    carrito.forEach(producto => {
        let nuevaFila = document.createElement("tr");

        // b, c) Estructuramos las celdas respetando el orden estricto: Nombre - Cantidad - Precio unitario
        nuevaFila.innerHTML = `
            <td>${producto.nombre}</td>
            <td>${producto.cantidad}</td>
            <td style="color: #ca9013;">$${producto.precio}</td>
        `;

        tabla.appendChild(nuevaFila);

        // f) El monto total considera la cantidad de los productos (Precio * Cantidad)
        acumuladorTotal += producto.precio * producto.cantidad;
    });

    // Actualizamos el h2 del valor final en la interfaz con el total acumulado
    contenedorValorFinal.textContent = `El valor final a pagar es de: $${acumuladorTotal}`;
}

// d) Elimina por completo el carrito de la memoria y limpia la pantalla
function limpiarCarrito() 
{
    localStorage.removeItem("carrito"); // Borra todo el LocalStorage del carrito
    
    alert("Carrito limpiado correctamente."); // Alerta obligatoria
    
    // Volvemos a ejecutar la carga para que la tabla se actualice visualmente a vacío
    cargarProductosCarrito();
}

// Asociar evento al botón cuando la página carga
window.addEventListener("DOMContentLoaded", () =>
{
    cargarProductosCarrito();
    document.querySelector(".btn-limpiar-carrito").addEventListener("click", limpiarCarrito);
});