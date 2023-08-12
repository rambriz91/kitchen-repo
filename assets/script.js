var addBtnEl = document.getElementById('addBtn');
var clearBtnEl = document.getElementById('clearList');
var submitBtnEl = document.getElementById('submit');
var userInput = document.getElementById('userInput');
var ingList = document.getElementById('ingList');
var recipeImgEl = document.getElementById('recipeImg');
var recipeName = document.getElementById('recipeName');
var recipeBtnHolder = document.getElementById('recipeBtnHolder');
var stepsEl = document.getElementById('steps');
var ingUsedEl = document.getElementById('ingUsed');

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
            for (let i = 0; i < 5; i++) {
                let recipeBtn = document.createElement('button');
                recipeBtn.textContent = data[i].title;
                recipeBtn.setAttribute('class', 'is-primary button');
                recipeBtn.setAttribute('data-id', data[i].id);
                recipeBtn.setAttribute('data-img', data[i].image);
                let usedIng = data[i].usedIngredients;
                let usedIngArr = [];
                for (let j = 0; j < usedIng.length; j++) {
                    usedIngArr.push(usedIng[j].original);
                }
                recipeBtn.setAttribute('data-usedIng', usedIngArr)
                let missIng = data[i].missedIngredients;
                let missIngArr = [];
                for (let j = 0; j < missIng.length; j++) {
                    missIngArr.push(missIng[j].original);
                }
                recipeBtn.setAttribute('data-missIng', missIngArr)
                recipeBtnHolder.appendChild(recipeBtn);
            };
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

recipeBtnHolder.addEventListener('click', (event) => {
    let chosenRecipe = event.target.getAttribute('data-id');
    recipeName.textContent = event.target.textContent;
    recipeImgEl.src = event.target.getAttribute('data-img');
    let recipeById ='https://api.spoonacular.com/recipes/' + chosenRecipe + '/analyzedInstructions?apiKey=' + APIkey +'';
    fetch(recipeById)
        .then(function(response) {
            return response.json();
        })
        .then (function(data) {
            console.log(data)
            for (let i = 0; i < data[0].steps.length; i++) {
            let step = document.createElement('li');
            step.textContent = data[0].steps[i].step;
            stepsEl.appendChild(step);
        }
        })
})