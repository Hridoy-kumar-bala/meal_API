const form = document.getElementById('form');
const input = document.getElementById('input');
const result = document.getElementById('search');
const details = document.getElementById('Details');
// form.addEventListener('submit', function (event) {
//   event.preventDefault();

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const query = input.value;
  if (!query) {
    result.innerHTML = '<h1 style="color: red;">Not Found</h1>';
    return;
  }

  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  const data = await response.json();
  if (data.meals) {
    display(data.meals);
  } else {
    result.innerHTML = '<h1 style="color: red;">Not Found</h1>';
  }
});

const display = (meals) => {
  result.innerHTML = '';
  meals.forEach((meal) => {
    const mealCard = document.createElement('div');
    mealCard.className = 'meal-card';
    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="" class="meal-image" />
      <h3>${meal.strMeal}</h3>
    `;
    result.appendChild(mealCard);

    mealCard.addEventListener('click', () => show(meal.idMeal));
  });
};

const show= async (mealId) => {
  const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`);
  const data = await response.json();
  if (data.meals && data.meals.length > 0) {
    const meal = data.meals[0];
    Details(meal);
  }
};

const Details = (meal) => {
  details.innerHTML = `
    <div class="meal-card mx">
      <img src="${meal.strMealThumb}" alt="" class="meal-image" />
      <h2>${meal.strMeal}</h2>
      <p><strong>Category:</strong> ${meal.strCategory}</p>
      <p><strong>Ingredients:</strong></p>
      <ul>
      ${ingredients(meal)}
      </ul>
    </div>
  `;
};

const ingredients = (meal) => {
  let ingredients = '';
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    if (ingredient) {
      ingredients += `<li>${ingredient}</li>`;
    }
  }
  return ingredients;
};
