import React, {useState, useEffect} from 'react'
import "./FavouriteCard.css";
import moment from "moment";


export default function FavouriteCard(props) {

    // Usestate for storing the current weather data of the favourite city
    const [favWeather, setfavWeather] = useState([]);
    
    // Before rendering need to fetch the current weather data of the favourite city 
    useEffect( () => {
         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${props.name}&units=metric&appid=cccd5b00817e6aab1bd4a76d610618b4`)
            .then(res => res.json())
            .then((data) => {
                setfavWeather({ data: data });
            });
    }, [props.name]);

    // Function for deleting the favourite city card by calling the props Delete function
    function deleteHandler(id) {
        props.onDelete(id);
    }

    return (
        <div className="container mt-3 mb-3 card-container" data-testid="containerClass">
            {
                // Checking Weather data is undefined or not recieved
                ((favWeather.data !== undefined) && (favWeather.data.cod === 200)) ? (
                    // If successfully recieved and properly defined
                    <div>
                        <main className="row my-3">
                            {/* Date Display for the Favorite City Weather */}
                            <div className="fav-location-and-date">
                                <div className="float-end"><button data-testid="button" onClick={deleteHandler.bind(this, props.id)} className="btn btn-secondary me-3"><i data-testid="trashBtn" className="fas fa-trash"></i></button></div>
                                <h1 className="location-and-date__location">{favWeather.data.name},{favWeather.data.sys.country}</h1>
                                <div style={{ fontSize: "22px" }}>{moment(favWeather.data.dt * 1000).format('DD/MM/yyyy dddd')}</div>
                            </div>

                            {/* Temperature Display for the Favorite City Weather */}
                            <div className="fav-current-temperature">
                                <div className="current-temperature__icon-container">
                                    <img src={`http://openweathermap.org/img/w/${favWeather.data.weather[0].icon}.png`} className="fav-current-temperature__icon" alt="" />
                                </div>
                                <div className="current-temperature__content-container">
                                    <div className="current-temperature__value">{Math.round(favWeather.data.main.temp)}&#8451;</div>
                                    <div className="current-temperature__summary">{favWeather.data.weather[0].description}</div>
                                </div>
                            </div>

                            {/* High/Low Temperature Display for the Favorite City Weather */}
                            <div className="fav-current-stats">
                                <div>
                                    <div className="fav-current-stats__value">{favWeather.data.main.temp_max}&#8451;</div>
                                    <div className="fav-current-stats__label">High</div>
                                    <div className="fav-current-stats__value">{favWeather.data.main.temp_min}&#8451;</div>
                                    <div className="fav-current-stats__label">Low</div>
                                </div>
                                {/* Wind/Pressure Display for the Favorite City Weather */}
                                <div>
                                    <div className="fav-current-stats__value">{favWeather.data.wind.speed}m/s</div>
                                    <div className="fav-current-stats__label">Wind</div>
                                    <div className="fav-current-stats__value">{favWeather.data.main.pressure}hPa</div>
                                    <div className="fav-current-stats__label">Pressure</div>
                                </div>
                                
                                {/* Sunrise/Sunset Display for the Favorite City Weather */}
                                <div>
                                    <div className="fav-current-stats__value">{moment(favWeather.data.sys.sunrise * 1000).format('hh:mm a')}</div>
                                    <div className="fav-current-stats__label">Sunrise</div>
                                    <div className="fav-current-stats__value">{moment(favWeather.data.sys.sunset * 1000).format('hh:mm a')}</div>
                                    <div className="fav-current-stats__label">Sunset</div>
                                </div>
                            </div>
                        </main>
                    </div>
                ) : null
            }
        </div>
    )
}