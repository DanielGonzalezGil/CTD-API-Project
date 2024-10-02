//importing api key
import {apiKey} from '../backend/secretInfo.js';

// ---------- The DOG API Processing Code ----------
const apiBaseURL = 'https://api.thedogapi.com/v1/';
const apiMultiplePicsEndpoint = 'images/search?limit=30&breed_ids=beng&api_key=';
const apiSinglePicEndpoint = 'images/search';



// fetchMultiplePics();



// Fetching one picture from the API
async function fetchOnePic(){
    try{
        location.href = "cuteDog.html";
        const response = await fetch(`${apiBaseURL}${apiSinglePicEndpoint}`);

        // if the response is not ok then throw an error
        if(!response.ok){
            throw new Error('Could not fetch the data from the dog API');
        }
        const data = await response.json();
        const dogPic = data[0].url;
        console.log(dogPic);
        const imgElement = document.getElementById('dogImage');
        imgElement.src = dogPic;
        imgElement.style.display ="block";


        // console.log(data);

    }
    catch(error){
        console.log(error);
    }
}


// Fetching multiple pictures from the API
async function fetchMultiplePics(){
    try{
        location.href = "cuteDogs.html";

        const response = await fetch(`${apiBaseURL}${apiMultiplePicsEndpoint}${apiKey}`);

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
window.fetchOnePic = fetchOnePic;
window.fetchMultiplePics = fetchMultiplePics;


