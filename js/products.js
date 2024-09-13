document.addEventListener('DOMContentLoaded', function() {
  const productTableBody = document.getElementById('product-table-body');

  // URL de tu API en Somee
  const apiUrl = 'http://www.codigoestudiante1.somee.com/api/Producto/Lista';

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      if (data.mensaje === 'ok') {
        const productos = data.response;
        productos.forEach(producto => {
          const row = document.createElement('tr');
          row.classList.add('border-b');
          
          row.innerHTML = `
            <td class="py-2 px-4">${producto.idProducto}</td>
            <td class="py-2 px-4">${producto.codigoBarra}</td>
            <td class="py-2 px-4">${producto.descripcion}</td>
            <td class="py-2 px-4">${producto.marca}</td>
            <td class="py-2 px-4">${producto.oCategoria.descripcion}</td>
            <td class="py-2 px-4">${producto.precio.toFixed(2)}</td>
          `;

          productTableBody.appendChild(row);
        });
      } else {
        productTableBody.innerHTML = `<tr><td colspan="6" class="py-2 px-4 text-center text-red-600">Error al cargar productos</td></tr>`;
      }
    })
    .catch(error => {
      console.error('Error:', error);
      productTableBody.innerHTML = `<tr><td colspan="6" class="py-2 px-4 text-center text-red-600">Error al conectar con el servidor</td></tr>`;
    });
});
