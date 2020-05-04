const searchInput = document.getElementById('searchInput');
const results = document.getElementById('results');
const randomMeal = document.getElementById('randomMeal');

[search, meals] = '';

const fetchSearch = async() => {
	meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${search}`)
    .then(res => res.json())
    .then(res => res.meals) 
};


const searchDisplay = async() => {
  await fetchSearch();

  if (meal === null){
    results.innerHTML = `<span class="noResult">Aucun resultat</span>`
  }
  
  results.innerHTML = (
    
    meal.map(meal => (
            
      `
      <div class="searchContainer">
        <h2>${meal.strMeal}</h2>
        <div class="infos">
          <div>origine : ${meal.strArea}</div>
          <div>catégorie : ${meal.strCategory}</div>
        </div>
        <img src='${meal.strMealThumb}' /></br>
        <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
      </div>
      `
    )).join('')
  );
};

searchInput.addEventListener('input', (e) => {
  search = e.target.value;
  searchDisplay();
});


// GET RANDOM MEAL
const getRandomMeal = async() => {
  meal = await fetch(
    `https://www.themealdb.com/api/json/v1/1/random.php`)
    .then(res => res.json())
    .then(res => res.meals)
}

const randomMealDisplay = async() => {
  await getRandomMeal();

  results.innerHTML = (
    
    meal.map(meal => (
            
      `
        <div class="randomContainer">
          <h2>${meal.strMeal}</h2>
          <div class="infos">
            <div>origine : ${meal.strArea}</div>
            <div>catégorie : ${meal.strCategory}</div>
          </div>
          <img src='${meal.strMealThumb}' />
          <p>${meal.strInstructions}</p>
          <a href="${meal.strYoutube}" target="_blank"><i class="fab fa-youtube"></i></a>
        </div>
      `
    ))
  );
};

randomMeal.addEventListener('click', randomMealDisplay)

randomMealDisplay();