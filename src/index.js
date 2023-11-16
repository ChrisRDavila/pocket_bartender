import Spoonacular from "./Spoonacular.js";

//business
function getIngredients(query) {
  Spoonacular.recipeSearch(query)
    .then(function(response) {
      if (response.totalResults > 0) {
        printIngredients(response, query);
      } else if (response.results.length === 0) {
        wordError("put in real word");
      }
      else {
        printError(response, query);
      }
    });
}

// let tempArray = [];
// add each stringredient to 
// "strIngredient1"

// ui 

function printAvailableRecipes(response) {
  let showRecipesDiv = document.getElementById("showRecipesDiv");
  showRecipesDiv.innerText = "";
  for(let i = 0; i < response.results.length; i++) {
    let newRecipeDiv = document.createElement("div");
    let newRecipeH3 = document.createElement("h3");
    let newRecipeP = document.createElement("p");
    let newRecipeImg = document.createElement("img");
    let newRecipeAnchor = document.createElement("a");

    newRecipeH3.append(`${response.results[i].title}`);
    newRecipeP.innerHTML = `This dish has a rating of:<br>
    ${parseInt(response.results[i].spoonacularScore).toFixed(0)} out of 100 <br>
    and cooks in: <br> ${response.results[i].readyInMinutes} minutes`;
    const recipeLink = response.results[0].sourceUrl;
    newRecipeAnchor.innerHTML = `<a href="${recipeLink}">${recipeLink}</a><br>`;
    newRecipeImg.setAttribute("src",`${response.results[i].image}`);

    newRecipeDiv.append(newRecipeH3);
    newRecipeDiv.append(newRecipeP);
    newRecipeDiv.append(newRecipeAnchor);
    newRecipeDiv.append(newRecipeImg);
    newRecipeDiv.append(document.createElement("br"));
    
    showRecipesDiv.append(newRecipeDiv);
    showRecipesDiv.append(document.createElement("br"));
  }

}


function printIngredients (response) {
  document.getElementById("showResponse").innerText = ``;
  printAvailableRecipes(response);
  // const recipeLink = response.results[0].sourceUrl;
  // document.getElementById("showResponse").innerText = `Here are some recipes and info using the ingredient ${query}:
  // ${response.results[0].title} has a rating of ${response.results[0].spoonacularScore} and takes ${response.results[0].readyInMinutes} minutes to make.
  // Here is the link to the recipe:`;

  // document.getElementById("recipeAnchor").innerHTML = `<a href="${recipeLink}">${recipeLink}</a><br>`
  
  // const getImage = response.results[0].image;
  // const recipeImg = document.createElement("img");
  // recipeImg.src = getImage;
  // recipeImg.alt = `${query}`;
  // document.getElementById("resultsDiv").append(recipeImg);
}

function printError (error, query) {
  document.getElementById("showResponse").innerText = `There was an error accessing data for ${query}:
  ${error}`;
}

function wordError (message) {
  document.getElementById("showResponse").innerText = "";
  document.getElementById("showResponse").innerText = message;
}

function handleFormSubmission(event) {
  event.preventDefault();
  const query = document.querySelector('#keyword').value;
  document.querySelector('#keyword').value = null;
  getIngredients(query);
}

window.addEventListener("load", function() {
  document.querySelector('form').addEventListener("submit", handleFormSubmission);
});