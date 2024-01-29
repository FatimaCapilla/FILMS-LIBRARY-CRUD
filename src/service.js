// Metodo GET R (read) del CRUD.
async function getFilms() {
    const result = await fetch("http://localhost:3000/films")
    const data = await result.json()
    return data
}

let sectionTag = document.getElementById("film-list")
async function printFilms() {
    let films = await getFilms()
    films.map(film => {
        sectionTag.innerHTML +=
        `<h3>${film.film}</h3>
        <p>${film.director}</p>
        <button onclick="deleteFilm('${film.id}')">Delete</button>`
    })
}

// Obtener y mostrar todas las películas al cargar la página
printFilms();

//Metodo DELETE D (delete) del CRUD.
async function deleteFilm(id) {
    const result = await fetch(`http://localhost:3000/films/${id}`,
    {method: "DELETE"})
    return result
}

//Método POST C (create) del CRUD
async function postFilm() {
    const newFilm = {
        "film": "Wellcome to the doll house",
        "director": "Todd Solondz"
    }

    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFilm),
        };
    const result = await fetch(`http://localhost:3000/films`, options)
    return result

}

//Método POST C (create) del CRUD con formulario
async function createFilm() {
    const formFilm = document.getElementById("films-form")
    const newFilm = {
        "film": formFilm.elements[0].value,
        "director": formFilm.elements[1].value
    };
    
    const result = await fetch(`http://localhost:3000/films`, {
        method: "POST",
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(newFilm),
    });
}



// La función editarUsuario permite al usuario editar la información de un usuario existente.
async function editFilm(id) {
    // Se solicita al usuario ingresar la nueva información para el usuario.
    const newFilm = prompt('Ingrese el nuevo nombre:');
    const newDirector = prompt('Ingrese la nueva edad:');

    // Se realiza una solicitud PUT a la API para actualizar la información del usuario.
    const response = await fetch(`http://localhost:3000/films/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            film: newFilm,
            director: newDirector
        }),
    });

    // Si la solicitud es exitosa, se recargan los datos para reflejar el cambio en la tabla.
    if (response.ok) {
        cargarDatos();
    } else {
        // En caso de error, se muestra un mensaje en la consola.
        console.error('Error al editar usuario.');
    }
}