document.getElementById('search-button').addEventListener('click', function() {
    const searchInput = document.getElementById('search-input').value;
    if (searchInput) {
        fetchMovies(searchInput);
    }
});

async function fetchMovies(query) {
    const apiKey = 'd661769b';  // 
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            displayError(data.Error);
        }
    } catch (error) {
        displayError('Error fetching data');
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = '';
    movies.forEach(movie => {
        const movieElement = document.createElement('div');
        movieElement.classList.add('movie');
        movieElement.innerHTML = `
            <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
            <h2>${movie.Title}</h2>
            <p>${movie.Year}</p>
        `;
        moviesContainer.appendChild(movieElement);
    });
}

function displayError(message) {
    const moviesContainer = document.getElementById('movies-container');
    moviesContainer.innerHTML = `<p>${message}</p>`;
}