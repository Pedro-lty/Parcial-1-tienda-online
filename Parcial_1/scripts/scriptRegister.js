document.addEventListener('DOMContentLoaded', function() {
    // Redirigir si el usuario ya inició sesión
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
        window.location.href = 'index.html';
    }

    // Seleccionar el formulario de registro
    const registerForm = document.querySelector('form.register');

    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();

            // Obtener los valores de los campos
            const nombre = document.getElementById('nombre').value.trim();
            const apellido = document.getElementById('apellido').value.trim();
            const rut = document.getElementById('rut').value.trim();
            const email = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;
            const passwordConfirmed = document.getElementById('passwordConfirmed').value;
            const telefono = document.getElementById('telefono').value.trim();
            const region = document.getElementById('region').value;
            const comuna = document.getElementById('comuna').value;

            // 1. Validar campos requeridos
            if (!nombre || !apellido || !rut || !email || !password || !passwordConfirmed || !region || !comuna) {
                alert('Por favor, completa todos los campos obligatorios.');
                return;
            }

            // 2. Validar coincidencia de contraseñas
            if (password !== passwordConfirmed) {
                alert('Las contraseñas no coinciden.');
                return;
            }

            // 3. Validar longitud mínima de contraseña
            if (password.length < 8) {
                alert('La contraseña debe tener al menos 8 caracteres.');
                return;
            }

            // 4. Obtener la lista existente de usuarios en localStorage
            let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];

            // 5. Verificar si el correo ya existe
            const usuarioExiste = usuarios.find(u => u.email === email);
            if (usuarioExiste) {
                alert('El correo electrónico ya se encuentra registrado.');
                return;
            }

            // 6. Crear el objeto del nuevo usuario
            const nuevoUsuario = {
                nombre: nombre,
                apellido: apellido,
                rut: rut,
                email: email,
                password: password,
                telefono: telefono,
                region: region,
                comuna: comuna,
                role: 'Cliente' // Rol por defecto
            };

            // 7. Guardar en la lista global de usuarios
            usuarios.push(nuevoUsuario);
            localStorage.setItem('usuarios', JSON.stringify(usuarios));

            // 8. Iniciar sesión automáticamente guardando la sesión activa
            localStorage.setItem('user', JSON.stringify({
                email: nuevoUsuario.email,
                role: nuevoUsuario.role,
                nombre: nuevoUsuario.nombre
            }));

            alert('¡Registro exitoso! Bienvenido.');

            // 9. Redirigir a la página principal o perfil
            window.location.href = 'index.html';
        });
    }
});