import axios from "axios";
import React, { useState, useEffect } from "react";
import Card from "./components/Card";

const App = () => {
  const [mealsData, setMealsData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [selectInput, setSelectInput] = useState("Sélectionnez un truc");
  const areas = [
    "Sélectionnez un truc",
    "French",
    "Italian",
    "Croatian",
    "Indian",
    "British",
    "Dutch",
    "Canadian",
    "Chinese",
    "Greek",
    "Japanese",
  ];

  const deleteCriteria = () => {
    setSelectInput("Sélectionnez un truc");
    setSearchInput("");
  };

  useEffect(() => {
    axios
      .get(
        "https://www.themealdb.com/api/json/v1/1/search.php?s=" + searchInput
      )
      .then((res) => setMealsData(res.data.meals));
  }, [searchInput]);

  return (
    <div className="app">
      <h1>Miam miam</h1>
      <p>Votre appli cooking</p>
      <div className="search-container">
        <input
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
        <select onChange={(e) => setSelectInput(e.target.value)}>
          {areas.map((area) => (
            <option
              key={area}
              value={area}
              selected={area === selectInput ? "selected" : null}
            >
              {area}
            </option>
          ))}
        </select>
        <button onClick={() => deleteCriteria()}>Effacer critères</button>
      </div>
      <div className="meals-container">
        {mealsData ? (
          mealsData
            .filter((meal) => {
              if ("Sélectionnez un truc" === selectInput) {
                return meal;
              } else {
                return meal.strArea.includes(selectInput);
              }
            })
            .map((meal) => <Card key={meal.idMeal} meal={meal} />)
        ) : (
          <p>Aucun résultat</p>
        )}
      </div>
    </div>
  );
};

export default App;
