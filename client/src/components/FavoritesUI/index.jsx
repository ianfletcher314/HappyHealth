import React from 'react';


export default function FavoritesUI(props) {
    //console.log(props.favoritesData)
    // const {favoritesData} = props;
    // console.log(favoritesData)
    
    const displayFavorites = (props) => {
        const {favoritesData} = props;
        console.log(favoritesData)

    //     if (favoritesData.length > 0) {
            return(
                favoritesData.map((faves, index) => {
                    console.log(faves);
                    return(
                        <div className="enterLater" key={faves._id}>
                            <p className="enterLater">{faves.title}</p>
                            <p className="enterLater">{faves.url}</p>
                        </div>
                    )
                })
            )
    //     } else {
    //         return (<h3>No favorites saved yet!</h3>)
    //     }
    }
    
    return(
         <>
         {displayFavorites(props)}
         </>
    )
}