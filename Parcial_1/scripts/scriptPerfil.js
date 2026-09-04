document.addEventListener('DOMContentLoaded', function() {
    // 1. Obtener la sesión del usuario activo
    const userSession = JSON.parse(localStorage.getItem('user'));

    // Si no hay sesión activa, redirigir al login
    if (!userSession) {
        window.location.href = '/paginas/login.html';
        return;
    }

    // 2. Buscar la información completa del usuario en la lista global
    const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuarioActual = usuarios.find(u => u.email === userSession.email) || userSession;

    // 3. Cargar los datos en el HTML
    const nombreElem = document.getElementById('profile-nombre');
    const emailElem = document.getElementById('profile-email');
    const roleElem = document.getElementById('profile-role');

    if (nombreElem) {
        nombreElem.innerText = `${usuarioActual.nombre || 'Usuario'} ${usuarioActual.apellido || ''}`.trim();
    }
    if (emailElem) {
        emailElem.innerText = usuarioActual.email;
    }
    if (roleElem) {
        roleElem.innerText = `Rol: ${usuarioActual.role || 'Cliente'}`;
    }

    // 4. Función de Cerrar Sesión
    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', function() {
            // Eliminar únicamente la sesión del usuario activo
            localStorage.removeItem('user');
            alert('Sesión cerrada correctamente.');
            window.location.href = '/paginas/login.html';
        });
    }
});