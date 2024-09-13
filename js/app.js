document.addEventListener('DOMContentLoaded', function() {
  const submitButton = document.getElementById('submit-button');
  const responseMessage = document.getElementById('response-message');

  submitButton.addEventListener('click', function(event) {
    event.preventDefault();

    // Obtener valores del formulario
    const codigoBarra = document.getElementById('codigo-barra').value;
    const descripcion = document.getElementById('descripcion').value;
    const marca = document.getElementById('marca').value;
    const idCategoria = document.getElementById('categoria').value;
    const precio = document.getElementById('precio').value;

    // Validar que los campos no estén vacíos
    if (!codigoBarra || !descripcion || !marca || !idCategoria || !precio) {
      responseMessage.textContent = "Por favor complete todos los campos.";
      responseMessage.classList.add('text-red-600');
      return;
    }

    // Crear el objeto producto
    const producto = {
      codigoBarra: codigoBarra,
      descripcion: descripcion,
      marca: marca,
      idCategoria: parseInt(idCategoria),
      precio: parseFloat(precio),
      oCategoria: {
        idCategoria: parseInt(idCategoria),
        descripcion: document.getElementById('descripcion-categoria').value
      }
    };

    // Hacer la solicitud POST al backend
    fetch('http://www.codigoestudiante1.somee.com/api/Producto/Lista', { // Cambia la URL según tu backend en Somee
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(producto)
    })
    .then(response => response.json())
    .then(data => {
      if (data.mensaje === "ok") {
        responseMessage.textContent = "Producto guardado con éxito!";
        responseMessage.classList.remove('text-red-600');
        responseMessage.classList.add('text-green-600');
        // Limpiar formulario
        document.getElementById('codigo-barra').value = '';
        document.getElementById('descripcion').value = '';
        document.getElementById('marca').value = '';
        document.getElementById('categoria').value = '';
        document.getElementById('precio').value = '';
        document.getElementById('descripcion-categoria').value = '';
      } else {
        responseMessage.textContent = "Error al guardar el producto.";
        responseMessage.classList.add('text-red-600');
      }
    })
    .catch(error => {
      console.error('Error:', error);
      responseMessage.textContent = "Error al conectar con el servidor.";
      responseMessage.classList.add('text-red-600');
    });
  });
});
