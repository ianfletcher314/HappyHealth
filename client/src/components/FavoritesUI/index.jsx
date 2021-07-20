import React from 'react';
import Button from '@material-ui/core/Button';
import './style.css'


export default function FavoritesUI(props) {
    //console.log(props.favoritesData)
    // const {favoritesData} = props;
    // console.log(favoritesData)
    
    const displayFavorites = (props) => {
        const {favoritesData} = props;
        console.log(favoritesData)

        if (favoritesData?.length > 0) {
            return(
                favoritesData.map((faves, index) => {
                    return(
                    <div className="home-body">
                        <div key={faves._id} className="meal-card">
                            <h2 className="meals">{faves.title}</h2>
                            <img src={faves.image} alt="Logo" />
                                <div className="recipeButton">
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                              >
                                 <a href={faves.url} target="_blank">Go to Recipe</a>
                            </Button>
                            </div>
                        </div>
                        </div>
                    )
                })
            )
        } else {
            return (
                
            <h3 className="home-body">No favorites saved yet!</h3>
            )
        }
    }
    
    return(
         <>
         {displayFavorites(props)}
         </>
    )
}