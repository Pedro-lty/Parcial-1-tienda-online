// Usuarios base del sistema
const USUARIOS_BASE = [
  { email: 'admin@neonfox.com', password: 'admin123', role: 'Admin', nombre: 'Administrador' },
  { email: 'cliente@neonfox.com', password: 'cliente123', role: 'Cliente', nombre: 'Cliente Demo' }
];

// Garantizar que la lista de usuarios exista en localStorage
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

document.addEventListener('DOMContentLoaded', function() {
  inicializarUsuarios();

  // Si ya hay una sesión activa, redirigir
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    if (user.role === 'Admin') {
      window.location.href = 'admin_dashboard.html';
    } else {
      window.location.href = 'index.html';
    }
  }

  // Manejar el envío del formulario de login
  const loginForm = document.querySelector('form.login');

  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const email = document.getElementById('correo').value.trim();
      const password = document.getElementById('contraseña').value.trim();

      if (!email || !password) {
        alert('Por favor, ingresa tu correo y contraseña.');
        return;
      }

      const usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
      const usuarioEncontrado = usuarios.find(u => u.email === email);

      if (!usuarioEncontrado) {
        alert('El correo electrónico no está registrado.');
        return;
      }

      if (usuarioEncontrado.password !== password) {
        alert('Contraseña incorrecta. Inténtalo nuevamente.');
        return;
      }

      // Guardar la sesión activa en localStorage
      localStorage.setItem('user', JSON.stringify({
        email: usuarioEncontrado.email,
        nombre: usuarioEncontrado.nombre || 'Usuario',
        role: usuarioEncontrado.role || 'Cliente'
      }));

      alert(`¡Bienvenido de nuevo, ${usuarioEncontrado.nombre || 'Usuario'}!`);

      // Redirección relativa entre archivos que están dentro de la carpeta /paginas/
      if (usuarioEncontrado.role === 'Admin') {
        window.location.href = 'admin_dashboard.html';
      } else {
        window.location.href = 'index.html';
      }
    });
  }
});