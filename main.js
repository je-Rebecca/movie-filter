function loadItems() {
  return fetch('https://yts-proxy.nomadcoders1.now.sh/list_movies.json')
    .then((response) => response.json())
    .then((json) => json.data.movies);
}

function displayMovie(movies) {
  const container = document.querySelector('.mList');
  container.innerHTML = movies.map((movie) => createHTMLString(movie)).join('');
}

function createHTMLString(movies) {
  // console.log(movies);
  return `
  <li class ="item">
      <img src="${movies.medium_cover_image}" alt="" class="thumb">
      <span class="title">${movies.title} , ${movies.genres} </span>
  </li>
  `;
}

function onButtonClick(event, movies) {
  const dataset = event.target.dataset;
  const key = dataset.key; //language
  const value = dataset.value; //ko, en ...
  if (key == null || value == null) {
    return;
  }
  // console.log(movies);
  const filtered = movies.filter((movie) => movie[key] === value);
  displayMovie(filtered);
}

function setEventListenrs(movies) {
  const logo = document.querySelector('.logo');
  const btn = document.querySelector('.icron');
  logo.addEventListener('click', () => displayMovie(movies));
  btn.addEventListener('click', (event) => onButtonClick(event, movies));
}

loadItems()
  .then((movies) => {
    displayMovie(movies);
    setEventListenrs(movies);
  })
  .catch(console.log);
