import React, { useState } from "react";
import Container from '@material-ui/core/Container';
// import MealList from "../Meals";
//./src/components/Meals/index.jsx AND Cannot find file: 'index.js' does not match the corresponding name on disk: './node_modules/React/react'.
// Getting the above error when I uncomment the MealList import
import "./styles.css"



//@Kyle I cannot get the input field to show up anywhere on the Recipes page. To continue on with the API implementation, I have to have it. 
//I thought that it was maybe hideden behind the header or something since there isn't any styling, but I couldn't figure it out.
//Let me know once you get the input field and button to show up so I can continue/finish API implementation.



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
    </div>
</div>
    );
}