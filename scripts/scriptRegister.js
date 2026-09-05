document.addEventListener('DOMContentLoaded', function() {
    // 1. Redirigir solo si es Admin y ya tiene sesión abierta
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.role === 'Admin') {
        window.location.href = '/paginas/admin_dashboard.html';
        return;
    }

    // 2. Seleccionar el formulario de registro
    const registerForm = document.getElementById('registerForm') || document.querySelector('form.register') || document.querySelector('form');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre')?.value.trim();
            const apellido = document.getElementById('apellido')?.value.trim();
            const rut = document.getElementById('rut')?.value.trim();
            const email = document.getElementById('email')?.value.trim();
            const password = document.getElementById('password')?.value;
            const passwordConfirmed = document.getElementById('passwordConfirmed')?.value;
            const telefono = document.getElementById('telefono')?.value.trim() || '';
            const region = document.getElementById('region')?.value || '';
            const comuna = document.getElementById('comuna')?.value || '';

            // Validar campos requeridos básicos
            if (!nombre || !apellido || !rut || !email || !password || !passwordConfirmed) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // Validar coincidencia de contraseñas
            if (password !== passwordConfirmed) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // Validar longitud mínima de contraseña
            if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            // Obtener la lista existente de usuarios en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // Verificar si el correo ya existe en la base de datos
            const usuarioExiste = usuarios.find(u => u.email.toLowerCase() === email.toLowerCase());
            if (usuarioExiste) {
                alert('El correo electrónico ya se encuentra registrado.');
                return;
            }

            // Crear el objeto del nuevo usuario
            const nuevoUsuario = {
                nombre: nombre,
                apellido: apellido,
                rut: rut,
                email: email,
                password: password,
                telefono: telefono,
                region: region,
                comuna: comuna,
                role: 'Cliente'
            };

            // Guardar en la lista global de usuarios registrados
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            alert('¡Registro exitoso! Ahora puedes iniciar sesión.');

            // Redirigir a la pantalla de login para que ingrese con sus datos
            window.location.href = '/paginas/login.html';
        });
    }
});