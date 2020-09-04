// STEP 3: Create article cards.
// -----------------------
// Send an HTTP GET request to the following address: https://lambda-times-api.herokuapp.com/articles
// Study the response data you get back, closely.
// You will be creating a card for each article in the response.
// This won't be as easy as just iterating over an array though.
//
// Write a function that takes a single article object and returns the following markup:
//
// <div class="card">
//   <div class="headline">{Headline of article}</div>
//   <div class="author">
//     <div class="img-container">
//       <img src={url of authors image} />
//     </div>
//     <span>By {author's name}</span>
//   </div>
// </div>
//
// Add a listener for click events so that when a user clicks on a card, the headline of the article is logged to the console.
//
// Use your function to create a card for each of the articles, and append each card to the DOM.
import axios from 'axios';
const cardsContainer = document.querySelector('div.cards-container');

axios.get('https://lambda-times-api.herokuapp.com/articles')
.then(result=>{
    result.data.articles.bootstrap.forEach(obj=>{
        cardsContainer.appendChild(cardCreator(obj));
    });
    result.data.articles.javascript.forEach(obj=>{
        cardsContainer.appendChild(cardCreator(obj));
    });
    result.data.articles.jquery.forEach(obj=>{
        cardsContainer.appendChild(cardCreator(obj));
    });
    result.data.articles.node.forEach(obj=>{
        cardsContainer.appendChild(cardCreator(obj));
    });
    result.data.articles.technology.forEach(obj=>{
        cardsContainer.appendChild(cardCreator(obj));
    })
}) /* stretch */
.catch(error=>{
    const errorsDiv = document.querySelector('div.errors-container');
    errorsDiv.textContent = error.response;
});


export default function cardCreator({headline, authorPhoto, authorName}) {

    /*creating elements */
    const card = document.createElement('div');
    const headlineDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const imgDiv = document.createElement('div');
    const img = document.createElement('img');
    const span = document.createElement('span');

    /*adding classes */
    card.classList.add('card');
    headlineDiv.classList.add('headline');
    authorDiv.classList.add('author');
    imgDiv.classList.add('img-container');

    /*adding content*/
    headlineDiv.textContent = headline;
    img.src = authorPhoto;
    span.textContent = `By ${authorName}`;

    /*structuring*/
    card.appendChild(headlineDiv);
    card.appendChild(authorDiv);
    authorDiv.appendChild(imgDiv);
    imgDiv.appendChild(img);
    authorDiv.appendChild(span);

    /*event listener */
    card.addEventListener('click', obj=>{
        console.log(headline);
    });

    return card;
}