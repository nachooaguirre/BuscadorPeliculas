document.getElementById('form').addEventListener('submit', function (e) {
    e.preventDefault();
    const query = document.getElementById('search1').value;
    searchMovies(query);
  });

async function searchMovies(query) {
    const apiKey = 'd661769b';  // 
    const url = `http://www.omdbapi.com/?s=${query}&apikey=${apiKey}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            displayError([]);
        }
    } catch (error) {
       
    }
}

function displayMovies(movies) {
    const moviesContainer = document.getElementById('peliculas');
    moviesContainer.innerHTML = '';
  
    movies.forEach(movie => {
      const movieElement = document.createElement('div');
      movieElement.classList.add('movie');
      movieElement.innerHTML = `
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
        <h2>${movie.Title}</h2>
        <p>${movie.Year}</p>
      `;
      movieElement.addEventListener('click', () => {
        displayMovieDetails(movie.imdbID);
      });
      moviesContainer.appendChild(movieElement);
    });
  }



async function displayMovieDetails(movieId) {
    const apiKey = 'd661769b'
    const url = `http://www.omdbapi.com/?i=${movieId}&apikey=${apiKey}`;
    
    try {
      const response = await fetch(url);
      const movie = await response.json();
      const movieDetailsContainer = document.getElementById('detalles');
      movieDetailsContainer.innerHTML = `
        <button onclick="closeDetails()">Cerrar</button>
        <h2>${movie.Title}</h2>
        <p>Año: ${movie.Year}</p>
        <p>Género: ${movie.Genre}</p>
        <p>Director: ${movie.Director}</p>
        <p>Actores: ${movie.Actors}</p>
        <p>Sinopsis: ${movie.Plot}</p>
        <img src="${movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'}" alt="${movie.Title}">
      `;
      movieDetailsContainer.style.display = 'block';
    } catch (error) {
      console.error("Error fetching movie details:", error);
    }
  }
  
  function closeDetails() {
    const movieDetailsContainer = document.getElementById('detalles');
    movieDetailsContainer.style.display = 'none';
  }