// import './style.css';
// import javascriptLogo from './javascript.svg';
// import viteLogo from '/vite.svg';
// import { setupCounter } from './counter.js';

// document.querySelector('#app').innerHTML = `
//   <div>
//     <a href="https://vitejs.dev" target="_blank">
//       <img src="${viteLogo}" class="logo" alt="Vite logo" />
//     </a>
//     <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
//       <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
//     </a>
//     <h1>Hello Vite!</h1>
//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `;
// console.log('test');

// setupCounter(document.querySelector('#counter'))


const btnSearch = document.querySelector('#seekMovie');
const INPUT = document.querySelector('#movie');
const cardContainer = document.querySelector('.cardContainer');

btnSearch.addEventListener('click', () => {
  const movieWanted = INPUT.value;
  cardContainer.innerHTML = ``;
  seekMovie(movieWanted);
})

const showMore = async(movie) => {
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(`https://movies-api.julienpoirier-webdev.com/search/movies/${movie}/2`);
    const data = await response.json();
    for(let i = 0; i <= data.results.length; i++){
    const note = data.results[i].vote_average;
    const roundNote = note.toFixed(1);
    cardContainer.innerHTML += `<div class=card>
                                   <div class="img">
              <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="">
            </div>
            <div class="cardInfo">
              <h2 class="title">${data.results[i].original_title}</h2>
              <p class="overview">${data.results[i].overview.substring(0,100)}</p>
              <div class="flex">
                <p class="date">${data.results[i].release_date}</p>
                <p class="note">${roundNote}/10</p>
              </div>
            </div>         
            </div>`;

            if(i == data.results.length - 1){
              console.log("test2");
              
              const button = document.createElement('button');
              button.innerText = 'Page précédente';
              button.addEventListener('click', () => {
                  seekMovie(movie);
              });
              cardContainer.appendChild(button);
            }
    }
    
  } catch (error) {
    console.log(error);
    
  }
}

const seekMovie = async (movie) =>
{
  try {
    cardContainer.innerHTML = "";
    const response = await fetch(`https://movies-api.julienpoirier-webdev.com/search/movies/${movie}`);

  const data = await response.json();
  for(let i = 0; i <= data.results.length; i++){
    const note = data.results[i].vote_average;
    const roundNote = note.toFixed(1);
    cardContainer.innerHTML += `<div class=card>
                                   <div class="img">
              <img src="https://image.tmdb.org/t/p/w500${data.results[i].poster_path}" alt="affiche du film ${data.results[i].original_title}">
            </div>
            <div class="cardInfo">
              <h2 class="title">${data.results[i].original_title}</h2>
              <p class="overview">${data.results[i].overview.substring(0,100)}</p>
              <div class="flex">
                <p class="date">${data.results[i].release_date}</p>
                <p class="note">${roundNote}/10</p>
              </div>
            </div>         
            </div>`;

    if(i == data.results.length -1){
      const button = document.createElement('button');
      button.innerText = 'Page suivante';
      button.addEventListener('click', () => {
          showMore(movie);
      });
      cardContainer.appendChild(button);
    }
    
  }
  } catch (error) {
    console.log(error);
    
  }
  
}
