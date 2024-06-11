document.getElementById('crearUsuarioForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const dni = document.getElementById('dni').value;
    const firstname = document.getElementById('firstname').value;
    const lastname = document.getElementById('lastname').value;
    const gender = document.getElementById('gender').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const active = document.getElementById('active').checked;

    const usuario = {
        dni,
        firstname,
        lastname,
        gender,
        email,
        password,
        active
    };

    try {
        const response = await fetch('/personas/crearpersona', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuario)
        });

        if (response.ok) {
            alert('Usuario creado exitosamente');
            document.getElementById('crearUsuarioForm').reset();
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});

document.getElementById('mostrarUsuariosBtn').addEventListener('click', async () => {
    try {
        const response = await fetch('/personas/mostrarpersonas', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const data = await response.json();
            const usuariosTableBody = document.querySelector('#usuariosTable tbody');
            usuariosTableBody.innerHTML = ''; // Limpiar la tabla antes de mostrar los usuarios

            data.datos.forEach(usuario => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${usuario.dni}</td>
                    <td>${usuario.firstname}</td>
                    <td>${usuario.lastname}</td>
                    <td>${usuario.gender}</td>
                    <td>${usuario.email}</td>
                    <td>${usuario.active ? 'Sí' : 'No'}</td>
                `;
                usuariosTableBody.appendChild(row);
            });
        } else {
            const errorData = await response.json();
            alert(`Error: ${errorData.error}`);
        }
    } catch (error) {
        alert(`Error: ${error.message}`);
    }
});
