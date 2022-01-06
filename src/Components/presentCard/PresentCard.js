import React, { useState, useEffect } from 'react'
import "./PresentCard.css"
import moment from "moment";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import authentication from '../../service/auth';
import { useHistory } from "react-router-dom";

//Function for Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function PresentCard(props) {

    // Usestates for filling Snackbar parameters
    const [msg, setMsg] = useState('');
    const [severity, setseverity] = useState('');
    const [open, setOpen] = useState(false);
    
    // Usestate for storing response of the database 
    const [resp, setresp] = useState([]);
    // Variable for storing the weather data in the props 
    const { data } = props;

    // History Object
    let history = useHistory();

    // Variable for creating the url for the weather icon of the daily card 
    const iconurl = `http://openweathermap.org/img/w/${data?.cod !== "404" ? data?.weather[0].icon : null}.png`;

    // Function for getting response of the database
    useEffect(() => {
        fetch('http://localhost:3002/weather_db')
        .then(res => res.json())
        .then(data => {
            setresp(data);
        });
    });

    // Function for adding the adding the favourite city in the favourites
    function Database(id) {

        // Checking for Duplicacy
        let check_duplicate = resp.find(check => {
            return ((check.city_id === id) && (check.email === localStorage.getItem('email')));
        });

        // Checking if user is logged in or not
        if (authentication.isLoggedIn) {
            // If there is no data with the same city name and user email present 
            if (check_duplicate === undefined) {

                //  Creating object for the new City to be added in the Favourites
                const weather_ob = {
                    name: data.name,
                    city_id: data.id,
                    email: localStorage.getItem('email')

                }

                // Adding new favourite city in the database
                fetch('http://localhost:3002/weather_db', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(weather_ob)
                }).then(setMsg("Added Succesfully !!"),
                    setseverity("success"),
                    setOpen(true));

            } 
            // If there is data of same city with same user email id in the database
            else {
                setMsg("Already exits in the Favourites !!");
                setseverity("error");
                setOpen(true);
            }

        } 
        // If the user is not logged in
        else {
            history.push('/login');
        }
    }

    // Function for closing of the SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };


    return (
        <div>
            <div className="row pCard-container shadow-lg m-2 fw-bold border border-success rounded-3">

                <main className="d-flex flex-wrap main-container" data-testid="flexClass">
                    {/* Date Display for the Present Day Weather */}
                    <div className="location-and-date" data-testid="locationDate">
                        <div className="float-end p-1"><button onClick={Database.bind(this, data?.id)} className="btn btn-success">Add to Favourites</button></div>
                        <h1 id="place" className="location-and-date__location text-capitalize">{(data?.name.length !== 0) ? data?.name : "----"}</h1>
                        <div>{moment(data?.dt * 1000).format('DD/MM/yyyy dddd')}</div>
                    </div>

                    {/* Tempwrature and Weather Icon Display for the Present Day Weather */}
                    <div className="current-temperature" data-testid="currentTemperature">
                        <div className="current-temperature__icon-container">
                            {/* Weather Icon Display for the Present Day Weather */}
                            <img src={iconurl} className="current-temperature__icon" alt="" />
                        </div>
                        {/* Temperature Display for the Present Day Weather */}
                        <div className="current-temperature__content-container">
                            <div className="current-temperature__value">{Math.round(data?.main.temp)}&#8451;</div>
                            <div className="current-temperature__summary">{data?.weather[0].description}</div>
                        </div>
                    </div>


                    <div className="current-stats" data-testid="currentStats">
                        {/* High/Low Temperature Display for the Present Day Weather */}
                        <div>
                            <div className="current-stats__value">{data?.main.temp_max}&#8451;</div>
                            <div className="current-stats__label">High</div>
                            <div className="current-stats__value">{data?.main.temp_min}&#8451;</div>
                            <div className="current-stats__label">Low</div>
                        </div>
                        {/* Wind/Pressure Display for the Present Day Weather */}
                        <div>
                            <div className="current-stats__value">{data?.wind.speed} m&#47;s</div>
                            <div className="current-stats__label">Wind</div>
                            <div className="current-stats__value">{data?.main.pressure} hPa</div>
                            <div className="current-stats__label">Pressure</div>
                        </div>
                        {/* Sunrise/Sunset Display for the Present Day Weather */}
                        <div>
                            <div className="current-stats__value">{moment(data?.sys.sunrise * 1000).format('hh:mm a')}</div>
                            <div className="current-stats__label">Sunrise</div>
                            <div className="current-stats__value">{moment(data?.sys.sunset * 1000).format('hh:mm a')}</div>
                            <div className="current-stats__label">Sunset</div>
                        </div>
                    </div>
                </main>
            </div>
            {/* SnackBar */}
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{msg}
                </Alert>
            </Snackbar>

        </div>
    )
}
