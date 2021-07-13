import React, {useState, useEffect} from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';

export default function Meal({meal}) {
    const [imageUrl, setImageURl] = useState("");
    
    function sendMealData(props) {
    return <><h1>{meal.title}</h1>
           <a href = {meal.sourceUrl}></a></> 

    }

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
        {/* <ul>
            <li>Preparation time: {meal.readyInMinutes} minutes.</li>
            <li>Number of Servings: {meal.servings}</li>
        </ul> */}

        {/* <a href={meal.sourceUrl}>Go to Recipe</a> */}
            <li>Preparation time: {meal.readyInMinutes} minutes.</li>
            <li>Number of Servings: {meal.servings}</li>
        <a href={meal.sourceUrl}>Go to Recipe</a>

        <button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={sendMealData}
          >
            Add to Favorites
          </button>

    </article>
}