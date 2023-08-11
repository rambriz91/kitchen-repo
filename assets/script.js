var addBtnEl = document.getElementById('addBtn');
var clearBtnEl = document.getElementById('clearList');
var submitBtnEl = document.getElementById('submit');
var userInput = document.getElementById('userInput');
var ingList = document.getElementById('ingList')

var APIkey = '1e8651b92cc9448eb4ff9216c557959f';

var ingArr = [];

addBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    if (ingArr.includes(userInput.value) || userInput.value === "") {
        userInput.value = '';
        return;
    }
    ingArr.push(userInput.value);
    var ingredient = document.createElement('li');
    ingredient.textContent = userInput.value;
    ingList.appendChild(ingredient);
    userInput.value = '';
});

// fetch request for the spoon APIkey. 
function getRecipe(ingArr) {
    console.log(ingArr);
    if(ingArr ===[]) {
        return;
    };
    let spoonAPI = 'https://api.spoonacular.com/recipes/findByIngredients?apiKey=' + APIkey + '&ingredients=' + ingArr + '&number=5';
    
    fetch(spoonAPI)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
};

clearBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    ingArr = [];
    while(ingList.firstChild) {
        ingList.removeChild(ingList.firstChild);
    }
});

submitBtnEl.addEventListener('click', function(event) {
    event.preventDefault();
    getRecipe(ingArr);
});