# Parcial 1 - Programación 3 (UTN FRA)

Este proyecto corresponde al primer parcial de la materia Programación 3. Consiste en el desarrollo del sistema web para una hamburguesería ("Burger Palace"), enfocado en la interactividad del catálogo de productos y la gestión dinámica de un carrito de compras utilizando JavaScript nativo y almacenamiento local.

## Componentes del Proyecto

El desarrollo está dividido en dos secciones principales:

1. **Catálogo Principal (`index.html` / `index.js` / `index.css`):** - Estructura semántica para los listados de Hamburguesas, Bebidas y Tragos.
   - Lógica en JS para capturar los eventos de los botones `+` y `-` mediante delegación en el DOM (`closest("li")`).
   - Almacenamiento y actualización de datos en tiempo real dentro del `LocalStorage`.
   - Control de alertas dinámicas para avisar al usuario las acciones realizadas.

2. **Pantalla del Carrito (`pages/carrito/`):**
   - Interfaz con estilos específicos basados en los requerimientos de diseño de la maqueta (colores de la marca, bordes colapsados y tablas unificadas).
   - Renderizado dinámico de la tabla mediante JS, leyendo los datos guardados en el almacenamiento local sin duplicar elementos.
   - Algoritmo para el cálculo del valor total acumulado en base a `Precio * Cantidad`.
   - Función para el vaciado completo del carrito y actualización instantánea de la interfaz.

## Estructura de Archivos

```text
├── assets/                  # Imágenes y recursos visuales del sitio
├── pages/
│   └── carrito/
│       ├── carrito.html     # Vista detallada de la compra
│       ├── carrito.css      # Estilos de la tabla y componentes del carrito
│       └── carrito.js       # Lógica de renderizado y limpieza de la tabla
├── index.html               # Pantalla principal (Catálogo)
├── index.css                # Estilos generales del sitio y las cards de productos
├── index.js                 # Manejo de eventos de agregación y resta en el catálogo
└── README.md                # Documentación del proyecto
