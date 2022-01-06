import React, { useEffect, useState } from 'react';
import DailyCard from '../dailyCard/DailyCard';
import Filter from '../filter/Filter';
import PresentCard from "../presentCard/PresentCard";
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

//Function for Alert
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Search() {
    
    // Usestate for storing the Forecast Weather Data
    const [dailyData, setDailyData] = useState([]);

    // Usestate for storing the Present Day Weather Data
    const [presentData, setpresentData] = useState([]);

    // Usestates for filling Snackbar parameters
    const [msg, setMsg] = useState('');
    const [severity, setseverity] = useState('');
    const [open, setOpen] = useState(false);

    // Before rendering Fetching Weather Data of the current location is done
    useEffect(() => {
        // Setting Forecast data
        getLocation().then((position) => {
            fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${position.coords.latitude}&lon=${position.coords.longitude}&cnt=5&units=metric&appid=6fa095c114c44b8983cf448560847507`)
                .then(res => res.json())
                .then((data) => {
                    setDailyData({ data1: data });
                });
        });

        // Setting Present day data
        getLocation().then((position) => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric&appid=cccd5b00817e6aab1bd4a76d610618b4`)
                .then(res => res.json())
                .then((data) => {
                    setpresentData({ data: data });
                });
        });

    }, []);

    // Function for returning current location Co-ordinates
    function getLocation(options) {
        return new Promise((resolve, reject) =>
            navigator.geolocation?.getCurrentPosition(resolve, reject, options)
        );
    }

    // Function for closing of the SnackBar
    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    // Function for getting the weather data by city name
    async function city_Name(name, cnt) {
        if (name !== '') {
            await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?q=${name}&cnt=${cnt}&units=metric&appid=6fa095c114c44b8983cf448560847507`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "404") {
                        setMsg("city not found");
                        setseverity("error");
                        setOpen(true);
                    } else {
                        setDailyData({ data1: data });
                    }
                });

            await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${name}&units=metric&appid=cccd5b00817e6aab1bd4a76d610618b4`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "404") {
                    } else {
                        setpresentData({ data: data });
                    }
                });
        }
        else {
            setMsg("Enter city Name");
            setseverity("error");
            setOpen(true);
        }
    }

    // Function for getting the weather data by lantitude and longitude
    async function Geo_code(lati, longi, cnt) {
        if ((lati.length !== 0) && (longi.length !== 0)) {
            await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?lat=${lati}&lon=${longi}&cnt=${cnt}&units=metric&appid=6fa095c114c44b8983cf448560847507`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "400") {
                        setMsg("wrong latitude or longitude entered !!");
                        setseverity("error");
                        setOpen(true);
                    } else {
                        setDailyData({ data1: data });
                    }
                });

            await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lati}&lon=${longi}&units=metric&appid=cccd5b00817e6aab1bd4a76d610618b4`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "400") {
                    } else {
                        setpresentData({ data: data });
                    }
                })

        }
        else {
            setMsg("Enter latitude and longitude");
            setseverity("error");
            setOpen(true);
        }
    }

    // Function for getting the weather data by Zip Code and country code
    // Country Code is necessity here
    async function Zip_code(zip, iso, cnt) {
        if ((zip.length !== 0) && (iso.length !== 0)) {
            await fetch(`https://api.openweathermap.org/data/2.5/forecast/daily?zip=${zip},${iso}&cnt=${cnt}&units=metric&appid=6fa095c114c44b8983cf448560847507`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "404") {
                        setMsg("wrong zip code or country code entered !!");
                        setseverity("error");
                        setOpen(true);
                    } else {
                        setDailyData({ data1: data });
                    }
                })


            await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${iso}&units=metric&appid=cccd5b00817e6aab1bd4a76d610618b4`)
                .then(res => res.json())
                .then(data => {
                    if (data.cod === "404") {
                    } else {
                        setpresentData({ data: data });
                    }
                })

        }
        else {
            setMsg("please enter zip code with country code !!");
            setseverity("error");
            setOpen(true);
        }
    }

    return (
        <div>
            <div className="container-fluid" data-testid="containerClass">
                <h2 className="text-center text-body fs-1" id="weather-text" style={{ fontFamily: "lucida console" ,marginTop:"100px"}}>Weather Search</h2>
                <div className='row w-100'>
                    
                    {/* Filter Component */}
                    <Filter Getgeo={Geo_code} Getcity={city_Name} Getzip={Zip_code} />
                </div>
                <div className="container-fluid">
                    <div className="row">
                        {   
                            // If Present Day weather data is available and recieved
                            ((presentData.data !== undefined) && (presentData.data.cod === 200)) ? (
                                <div>
                                    {<PresentCard data={presentData.data} />}
                                </div>
                            ) : null
                        }
                    </div>
                </div>


                <div className="row mt-2" >
                    {
                        // If Forecast weather data is available and recieved
                        ((dailyData.data1 !== undefined) && (dailyData.data1.cod === "200")) ? (
                            <div>
                                <h3 className="fs-3">Forecast of {dailyData.data1.cnt}  days</h3>
                                {
                                    dailyData.data1.list.map((item,index) =>
                                        // Daily Card
                                        <DailyCard data1={item} key={index}/>)
                                }
                            </div>
                        ) : null
                    }
                </div>
            </div>

            {/* SnackBar */}       
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }} autoHideDuration={2000} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>{msg}
                </Alert>
            </Snackbar>
        </div>
    )
}