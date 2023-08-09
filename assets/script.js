var APIkey = '1e8651b92cc9448eb4ff9216c557959f';

// fetch request for the spoon APIkey. userInput var is a placeholder 
function getRecipe() {
    userInput= ['apple', 'feta cheese', 'olive oil'];
    let spoonAPI = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + APIkey + '&ingredients=' + userInput + '&number=5';
    
    fetch(spoonAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};