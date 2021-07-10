import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import MealList from "../MealList";
//./src/components/Meals/index.jsx AND Cannot find file: 'index.js' does not match the corresponding name on disk: './node_modules/React/react'.
// Getting the above error when I uncomment the MealList import
import "./styles.css"


export default function Recipes() {
    const [mealData, setMealData] = useState(null);
    const [calories, setCalories] = useState(2000);
  

    function handleChange(e) {
        setCalories(e.target.value);
    }


    function getMealData() {
        fetch (
            `https://api.spoonacular.com/mealplanner/generate?apiKey=471c7901604e4c7c99fe892a8ad9342b&timeFrame=day&targetCalories=${calories}`
        )
        .then((response) => response.json())
        .then((data) => {
            setMealData(data);
            console.log(data);
        })
        .catch(() => {
            console.log("error");
        });
    }

    return (
<div className="home-body">
    <div classname="App">
        <section className="controls">
            <input
            type="number"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange} />
        </section>
        <button onClick={getMealData}>Get Daily Meal Plan</button>
        {mealData && <MealList mealData={mealData} />}
    </div>
</div>
    );
}