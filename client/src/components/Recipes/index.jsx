import React, { useState } from "react";
import Container from '@material-ui/core/Container';
import MealList from "../MealList";
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
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
    <div className="App">
    <Container component="main" maxWidth="xs">
        <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            type="number"
            name="calories"
            label="Calories"
            type="calories"
            id="calories"
            placeholder="Calories (e.g. 2000)"
            onChange={handleChange} />
        <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={getMealData}
          >
            Get Daily Meal Plan
          </Button>
          </Container>
        {mealData && <MealList mealData={mealData} />}
    </div>
</div>
    );
}