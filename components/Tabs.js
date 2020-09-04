// STEP 2: Create tabs
// -----------------------
// Using axios send a GET request to the address: https://lambda-times-api.herokuapp.com/topics
// Once the data is resolved use console logs or breakpoints to review the structure.
// Iterate over the topics creating a new tab for each topic, and appending it to the DOM
// under the div.topics element.
//
//  Each tab should look like this:
//    <div class="tab">topic here</div>
//
// NOTE: you do _not_ need to install axios as it's included in the HTML via script element
import axios from 'axios';
import cardCreator from './Cards';
const tabsContainer = document.querySelector('span.title');
axios.get('https://lambda-times-api.herokuapp.com/topics')
.then(result=>{
    result.data.topics.forEach(element => {
        const div = document.createElement('div');
        div.classList.add('tab');
        div.textContent = element;
        tabsContainer.appendChild(div);
        /*stretch*/
        div.addEventListener('click', obj=>{
            axios.get('https://lambda-times-api.herokuapp.com/articles')
            .then(result=>{
                const container = document.querySelector('.cards-container');
                container.remove();
                const newContainer = document.createElement('div');
                newContainer.classList.add('cards-container');
                let arr = result.data.articles[obj.target.innerHTML];
                arr.forEach(obj=>{
                    newContainer.appendChild(cardCreator(obj));
                });
                document.body.appendChild(newContainer);
            })
        })
    });
});


