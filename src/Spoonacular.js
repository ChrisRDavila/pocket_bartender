export default class Spoonacular {
  static recipeSearch(query) {
    return fetch(`https://api.spoonacular.com/recipes/complexSearch?query=${query}&addRecipeInformation=true&apiKey=${process.env.API_KEY}`)
      .then(function(response) {
        if (!response.ok) {
          const errorMessage = `${response.status} (${response.statusText})`;
          throw Error(errorMessage);
        } else {
          return response.json();
        }
      })
      .catch(function(error) {
        return error;
      });
  }
}