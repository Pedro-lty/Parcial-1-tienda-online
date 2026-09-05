// Usuarios base del sistema
const USUARIOS_BASE = [
  { email: 'admin@neonfox.com', password: 'admin123', role: 'Admin', nombre: 'Administrador' },
  { email: 'cliente@neonfox.com', password: 'cliente123', role: 'Cliente', nombre: 'Cliente Demo' }
];

// Garantizar que la lista de usuarios base exista en localStorage
function inicializarUsuarios() {
  let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

  USUARIOS_BASE.forEach(usuarioBase => {
    const existe = usuarios.some(u => u.email === usuarioBase.email);
    if (!existe) {
      usuarios.push(usuarioBase);
    }
  });

  localStorage.setItem('usuarios', JSON.stringify(usuarios));
}

document.addEventListener('DOMContentLoaded', function () {
  inicializarUsuarios();

  // 1. Redirección automática solo para Admin si ya inició sesión.
  // Si es Cliente, NO redirigimos automáticamente al cargar para evitar el bucle de recarga en login.html
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.role === 'Admin') {
    window.location.href = '/paginas/admin_dashboard.html';
    return;
  }

  // 2. Manejar el evento del formulario de Login
  const loginForm = document.getElementById('loginForm') || document.querySelector('form.login') || document.querySelector('form');

  if (loginForm) {
    loginForm.addEventListener('submit', function (e) {
      e.preventDefault(); // Evita que se recargue la página

      const inputEmail = document.getElementById('correo') || document.getElementById('email') || document.querySelector('input[type="email"]');
      const inputPassword = document.getElementById('contraseña') || document.getElementById('password') || document.querySelector('input[type="password"]');

      if (!inputEmail || !inputPassword) {
        alert('Error: No se encontraron los campos de entrada en el formulario HTML.');
        return;
      }

      const email = inputEmail.value.trim();
      const password = inputPassword.value.trim();

      if (!email || !password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
      }

      // Buscar usuario en localStorage
      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());

      if (!usuarioEncontrado) {
        alert('El correo electrónico no está registrado.');
        return;
      }

      if (usuarioEncontrado.password !== password) {
        alert('Contraseña incorrecta. Inténtalo nuevamente.');
        return;
      }

      // Guardar la sesión activa
      localStorage.setItem('user', JSON.stringify({
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre || 'Usuario',
        role: usuarioEncontrado.role || 'Cliente'
      }));

      alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre || 'Usuario'}!`);

      // Tus rutas exactas mantenidas
      if (usuarioEncontrado.role === 'Admin') {
        window.location.href = '/paginas/admin_dashboard.html';
      } else {
        window.location.href = '/inicio.html';
      }
    });
  }
});