import React from "react";
import Meal from "../Meal";
import './style.css'
import Container from '@material-ui/core/Container';

export default function MealList({mealData}) {
const nutrients = mealData.nutrients;

// THIS SECTION HERE CAN BE MODIFIED AND IT NOT REPEATED ~~~KR
    return <main>
        <section className="nutrients">
                <Container component="main" maxWidth="md"></Container>
            <h2 className="macros-heading">Nutrients</h2>
                <li>Calories: {nutrients.calories.toFixed(0)}</li>
                <li>Carbohydrates: {nutrients.carbohydrates.toFixed(0)} grams</li>
                <li>Fat: {nutrients.fat.toFixed(0)} grams</li>
                <li>Protein {nutrients.protein.toFixed(0)} grams</li>
        </section>
        <section className="meals">
            {mealData.meals.map((meal)=>{
                return <Meal key={meal.id} meal={meal} />;
            })}

        </section>

    </main>
    
}