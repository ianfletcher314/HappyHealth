import React, {useState, useEffect} from "react";

export default function Meal({meal}) {
    const [imageUrl, setImageURl] = useState("");
    
    useEffect(()=>{
        fetch(
            `https://api.spoonacular.com/recipes/${meal.id}/information?apiKey=471c7901604e4c7c99fe892a8ad9342b&includeNutrition=false`
        )
        .then((response) => response.json())
        .then((data)=> {
            setImageURl(data.image)
        })
        .catch(()=>{
            console.log("error");
        })
    }, [meal.id])

    return <article>
        <h1>{meal.title}</h1>
        <img src= {imageUrl} alt="recipe" />
        <ul>
            <li>Preparation time: {meal.readyInMinutes} minutes.</li>
            <li>Number of Servings: {meal.servings}</li>
        </ul>

        <a href={meal.sourceUrl}>Go to Recipe</a>
    </article>
}