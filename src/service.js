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