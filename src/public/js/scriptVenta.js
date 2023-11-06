document.getElementById("guardarProducto").addEventListener("click", function() {
    const referencia = document.getElementById("referencia").value;
    const cantidad = document.getElementById("cantidad").value;
    
    // Aquí puedes realizar alguna acción con la referencia y cantidad, como agregar el producto a una lista, enviarlo al servidor, etc.
    
    // Por ejemplo, imprimir los valores en la consola:
    console.log("Referencia: " + referencia);
    console.log("Cantidad: " + cantidad);
  });