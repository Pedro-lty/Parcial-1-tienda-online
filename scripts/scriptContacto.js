function enviarMensaje() {
    var formulario = document.getElementById('miFormulario');

    if (formulario.checkValidity()) {
        alert('¡Gracias! Tu mensaje ha sido enviado con éxito.');
        formulario.reset();
    } else {
        formulario.reportValidity();
    }
}