function mostrarConfirmacion(id) {
  const isChecked = document.getElementById(`checkbox${id}`).checked;
  if (isChecked) {
    const confirmacion = confirm(`¿Estás seguro de marcar la casilla ${id}?`);
    if (confirmacion) {
      document.getElementById(`button${id}`).click();
    } else {
      document.getElementById(`checkbox${id}`).checked = false;
      console.log(`Selección de casilla ${id} cancelada`);
    }
  }
}
