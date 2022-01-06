import React from 'react';
import { useState, useEffect } from "react";
import FavouriteCard from "../favouriteCard/FavouriteCard";

export default function Favourite() {

    // Usestate for loading the Favourite Data of the user
    const [Fav, setFav] = useState([]);

    // Before rendering load the favourite data of the particular user
    useEffect(() => {
        fetch(`http://localhost:3002/weather_db?email=${localStorage.getItem('email')}`, {
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(res => res.json())
            .then(data => {
                setFav(data);
            });
    }, []);

    // Function to delete a City from Favourites
    function deleteCard(id) {
        fetch(`http://localhost:3002/weather_db/${id}`, {
            method: 'DELETE'
        });
        let weath_Card = Fav.filter(x => x.id !== id);
        setFav(weath_Card);
    }

    return (
        <div className='container' style={{ marginTop: "80px", minHeight: "85vh" }} data-testid="cont1">
            <div className='row' data-testid="row1" style={{ width: "100%" }}>
                {/* Adding the Favorite Cities one  by one to display in a row */}
                {Fav.map(res => (
                    <FavouriteCard
                        key={res.city_id}
                        id={res.id}
                        onDelete={deleteCard}
                        name={res.name}
                    />
                    ))
                }
            </div>
        </div>
    )
}
