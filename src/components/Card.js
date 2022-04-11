import React from "react";

const Card = ({ meal }) => {
  return (
    <div className="card">
      <h2>{meal.strMeal}</h2>
      <p>{meal.strArea}</p>
      <img src={meal.strMealThumb} alt={"recette" + meal.strMeal} />
      <a href={meal.strYoutube} target="_blank">
        CLIQUEZ LA
      </a>
    </div>
  );
};

export default Card;
