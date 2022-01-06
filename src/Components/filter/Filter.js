import React, { useState } from 'react';
import './Filter.css';
import { withStyles} from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';


// Variable for storing the Slider Styles of the slider of the count
const PrettoSlider = withStyles({
    root: {
        color: '#0033cc',
        height: 8,
    },
    thumb: {
        height: 24,
        width: 24,
        backgroundColor: '#fff',
        border: '2px solid black',
        marginTop: -8,
        marginLeft: -12,
        '&:focus, &:hover, &$active': {
            boxShadow: 'inherit',
        },
    },
    active: {},
    valueLabel: {
        left: 'calc(-50% + 4px)',
    },
    track: {
        height: 8,
        borderRadius: 4,
        background: '#ff9900',
    },
    rail: {
        height: 8,
        borderRadius: 4,
        background: '#666699',
        border: '2px solid',
    },
})(Slider);


export default function Filter(props) {

    // Usestate for selecting options to choose the weather By
    const [WeatherBy, setWeatherBy] = useState('');

    // UseStates for Input fields of the City,Latitude,Longitide,Zipcode,Country Code and no of forcast days count
    const [City, setCity] = useState('');
    const [lat, setLat] = useState('');
    const [long, setLong] = useState('');
    const [Zip, setZip] = useState('');
    const [Country_iso, setCountry_iso] = useState('');
    const [cnt, setCnt] = useState(5);
    
    // Function for setting the city of the Search
    function city_Name() {
        props.Getcity(City, cnt);
        setCity('');
    }
    // Function for setting the Geo_code of the Search
    function Geo_code() {
        props.Getgeo(lat, long, cnt);
        setLat('');
        setLong('');
    }
    // Function for setting the Country Code of the Search
    function Zip_code() {
        props.Getzip(Zip, Country_iso, cnt);
        setZip('');
        setCountry_iso('');
    }

    // Function for changing the value of the Count 
    const handleChange = (event, newValue) => {
        setCnt(newValue);
    };

    return (
        <div>
        <label id="search" className="text-white mt-2" data-testid="search_label"><b>Search Weather By:</b></label>
        <div className="row mx-2 ">
            <div className="col-md-2 py-3">

                {
                    // Dropdown for select by weather option
                    <select name="weather-by" data-testid="dropdown" className="form-select btn btn-secondary rounded-pill " aria-label="Default select example" onChange={(e) => (setWeatherBy(e.target.value))}>
                        <option value="Select" data-testid ="select">Select</option>
                        <option value="city" data-testid ="city">City Name</option>
                        <option value="Coordinates" data-testid ="coord">Coordinates</option>
                        <option value="Zip" data-testid ="zip">Zip code</option>
                    </select>
                }


            </div>
            <div className="col-md-10 py-3" data-testid="endpoints_col">
                {(() => {
                    // For City
                    if (WeatherBy === "city") {
                        return (
                            <div className="row d-flex" data-testid="city_flex">
                                <div className="col-md-6 text-center">
                                    {/* City Input Field */}
                                    <input id="city-search" className="form-control col-md-8 me-2 rounded-pill d-block" type="text" onChange={(e) => setCity(e.target.value)} placeholder="Search By City" value={City} aria-label="Search" />
                                </div>
                                <div className="col-md-4 d-inline-block mt-0">
                                    <label className="float-start text-white mt-1 pr-5 fw-bold" data-testid="slider">Days to Forecast: </label>
                                    <PrettoSlider style={{ width: 240 }} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} step={1} min={1} max={16} onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <button id="city-btn" className="btn btn-success rounded-pill" data-testid="City_btn" onClick={city_Name} type="button" ><i className="fas fa-search-location"></i></button>
                                </div>
                            </div>
                        )

                    }
                    // For Co-ordinates
                    else if (WeatherBy === "Coordinates") {
                        return (
                            <div className="row d-flex" data-testid="Coordinates_flex">
                                <div className="col-md-3 mb-1">
                                    {/* Latitude Input Field */}
                                    <input id="lat-search" className="form-control me-2 rounded-pill" type="number" placeholder="latitude" onChange={(e) => setLat(e.target.value)} value={lat} aria-label="Search" />
                                </div>
                                <div className="col-md-3">
                                    {/* Longitude Input Field */}
                                    <input id="long-search" className="form-control me-2 ms-2 rounded-pill" type="number" placeholder="longitude" onChange={(e) => setLong(e.target.value)} value={long} aria-label="Search" />
                                </div>
                                <div className="col-md-4">
                                    <label className="float-start text-white mt-1 pr-5 fw-bold">Days to Forecast: </label>
                                    <PrettoSlider style={{ width: 240 }} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} step={1} min={1} max={16} onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <button id="geo-btn" className="btn btn-success rounded-pill" data-testid="Cord_btn" onClick={Geo_code} type="button" ><i className="fas fa-search-location"></i></button>
                                </div>
                            </div>

                        )
                    }
                    // For Zip Code
                    else if (WeatherBy === "Zip") {
                        return (
                            <div className="row d-flex" data-testid="Zip_flex">
                                <div className="col-md-3 mb-1">
                                    {/* Input Field for Zip-Code */}
                                    <input id="zip-search" className="form-control me-2 rounded-pill" type="number" placeholder="Zip code" onChange={(e) => setZip(e.target.value)} value={Zip} aria-label="Search" />
                                </div>
                                <div className="col-md-3">
                                    {/* Input Field for Country-Code */}
                                    <input id="iso-search" className="form-control me-2 ms-2 rounded-pill" type="search" placeholder="country code" onChange={(e) => setCountry_iso(e.target.value)} value={Country_iso} aria-label="Search" />
                                </div>
                                <div className="col-md-4">
                                    <label className="float-start text-white mt-1 pr-5 fw-bold">Days to Forecast: </label>
                                    <PrettoSlider style={{ width: 240 }} valueLabelDisplay="auto" aria-label="pretto slider" defaultValue={5} step={1} min={1} max={16} onChange={handleChange} />
                                </div>
                                <div className="col-md-2">
                                    <button id="zip-btn" data-testid="Zip_btn" className="btn btn-success rounded-pill" onClick={Zip_code} type="button"  ><i className="fas fa-search-location"></i></button>
                                </div>
                            </div>
                        )
                    }
                })()}
            </div>
        </div>
    </div>
    )
}