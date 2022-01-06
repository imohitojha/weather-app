import React, { useState, useEffect } from 'react'
import "./Landing.css";
// This Library is used to convert UTC time-stamp to required format
import moment from 'moment';

export default function Landing() {

    // Usestate for storing current weather data
    const [weather, setWeather] = useState([]);

    // Before rendering Fetching Data is done
    useEffect(() => {
        getLocation().then((position) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=79ac497fa8eedfdd0c022cda7eec018e`)
                .then(res => res.json())
                .then((result) => {
                    setWeather({ data: result });
                });
        });
    }, []);

    // Function for getting Current Location
    function getLocation(options) {
        return new Promise((resolve, reject) =>
            navigator.geolocation.getCurrentPosition(resolve, reject, options)
        );
    }


    return (
        <div className="main-lan">
            {
                // Condition for checking if data is recieved or not
                ((weather.data !== undefined) && (weather.data.cod === 200)) ?
                    
                    
                    // If the data is recieved successfully
                    <div className="landing-container">
                        <div className="container-fluid">
                        <h2 className="text-center" data-testid="landing-heading" id="welcome-text">Welcome To Cloudy</h2>
                            
                            <div className="row justify-content-center gap-4">
                                
                                {/* Card for showing Location Name, Date, Day and Weather Icon */}
                                <div className=" col-md-2 card bg-card-icon-landing" >
                                    <div className="card-body">
                                        <p className="card-title">{weather.data.name}</p>
                                        <p className="card-title">{moment(weather.data.dt * 1000).format('ddd D, MMM')}</p>
                                        <img className="card-img-top" src={`http://openweathermap.org/img/w/${weather.data.weather[0].icon}.png`} alt="..." />
                                    </div>
                                </div>

                                {/* Card for showing Temp, Humidity and  Pressure*/}
                                <div className="col-md-9 col-sm-9 card py-3 card-main-landing bg-landing" >
                                    <div className="landing-main-div ">

                                        {/* Temp Inner Card */}
                                        <div className="card main-inner-card"  >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.main.feels_like}&#x2103;</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Temp</p>
                                            </div>
                                        </div>

                                        {/* Pressure Inner Card */}
                                        <div className="card main-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.main.pressure} hPa</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Pressure</p>
                                            </div>
                                        </div>

                                        {/* Humidity Inner Card */}
                                        <div className="card main-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.main.humidity} %</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Humidity</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Card for showing Sunrise, Sunset, Wind Speed, Cloud Percentage and Wind Gust*/}
                                <div className="col-11 card card-extra-landing bg-landing mt-3">
                                    <div className="landing-extra-div">

                                        {/* Sunrise and Sunset Inner Card */}
                                        <div className="card extra-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title"><img  src="/images/sunrise.png" style={{width:"30px", height:"30px"}} alt="Sunrise"></img> <span className="card-span-landing">{moment(weather.data.sys.sunrise * 1000).format('hh : mm A')}</span></p>
                                                <hr className="my-3" />
                                                <p className="card-title"><img  src="/images/sunset.png" style={{width:"30px", height:"30px"}} alt="Sunrise"></img>  <span className="card-span-landing">{moment(weather.data.sys.sunset * 1000).format('hh : mm A')}</span></p>
                                            </div>
                                        </div>

                                        {/* Wind Speed Inner Card */}
                                        <div className="card extra-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.wind.speed} m/s</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Wind Speed</p>
                                            </div>
                                        </div>

                                        {/* Cloud Percentage Inner Card */}
                                        <div className="card extra-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.clouds.all} %</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Clouds</p>
                                            </div>
                                        </div>

                                        {/* Wind Gust Inner Card */}
                                        <div className="card extra-inner-card" >
                                            <div className="card-body text-center">
                                                <p className="card-title">{weather.data.wind.gust} m/s</p>
                                                <hr className="my-3" />
                                                <p className="card-title">Wind Gust</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    : null // If the data is not recieved or undefined 
            }
        </div>
    )
}