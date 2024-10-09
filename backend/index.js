//importing api key
import {apiKey} from '../backend/secretInfo.js';

// ---------- The DOG API Processing Code ----------
const apiURL = 'https://api.thedogapi.com/v1/images/search';
const apiMultiplePicsEndpoint = 'images/search?limit=30&breed_ids=beng&api_key=';


async function fetchOnePic(){
    try{
        location.href = "cuteDog.html";  // <-- ISSUE !!!
        // Fetching one picture from the API
        const dogImageElement = document.getElementById('dogImage');

        const response = await fetch(`${apiURL}`);
        if(!response.ok){
            throw new Error('Could not fetch the data from the dog API');
        }

        const dogAPIData = await response.json();
        const dogImage = dogAPIData[0]["url"];
        
        dogImageElement.src = dogImage;
        console.log(dogImageElement.src);
        dogImageElement.style.display = 'block';

    }

    catch(error){
        console.log(error);
    }

}



// Fetching multiple pictures from the API
async function fetchMultiplePics(){
    try{
        location.href = "cuteDogs.html";

        const response = await fetch(`${apiURL}${apiMultiplePicsEndpoint}${apiKey}`);

        // if the response is not ok then throw an error
        if(!response.ok){
            throw new Error('Could not fetch the data from the dog API');
        }
        const data = await response.json();
        
        const gridContainer = document.getElementById('dogImageGrid');
        gridContainer.innerHTML = ''; 

        data.forEach(dog => {
            const imgElement = document.createElement('img');
            imgElement.src = dog.url;
            imgElement.classList.add('grid-item');
            gridContainer.appendChild(imgElement);
        });

    }
    catch(error){
        console.log(error);
    }
}

//allows the functions to be called from the user clicking the buttons
window.fetchMultiplePics = fetchMultiplePics;
window.fetchOnePic = fetchOnePic;
