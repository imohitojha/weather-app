import FavouriteCard from '../Components/favouriteCard/FavouriteCard';
import { BrowserRouter as Router} from "react-router-dom";
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {act} from 'react-dom/test-utils';

describe('FavouriteCard Page Test cases', () => {
    let element,fetchdata;

    beforeEach(async()=>{
        element= document.createElement('div');
        document.body.appendChild(element);

        fetchdata = {
            "coord": {
                "lon": 45,
                "lat": 15
            },
            "weather": [
                {
                    "id": 804,
                    "main": "Clouds",
                    "description": "overcast clouds",
                    "icon": "04d"
                }
            ],
            "base": "stations",
            "main": {
                "temp": 29.05,
                "feels_like": 27.91,
                "temp_min": 29.05,
                "temp_max": 29.05,
                "pressure": 1009,
                "humidity": 30,
                "sea_level": 1009,
                "grnd_level": 861
            },
            "visibility": 10000,
            "wind": {
                "speed": 4.32,
                "deg": 70,
                "gust": 4.62
            },
            "clouds": {
                "all": 100
            },
            "dt": 1620301228,
            "sys": {
                "country": "YE",
                "sunrise": 1620268483,
                "sunset": 1620314308
            },
            "timezone": 10800,
            "id": 7364022,
            "name": "Rahabah",
            "cod": 200
        }

        const mockGeolocation = {
            getCurrentPosition: jest.fn()
              .mockImplementationOnce((success) => Promise.resolve(success({
                coords: {
                  latitude: 51.1,
                  longitude: 45.3
                }
              })))
          };
          global.navigator.geolocation = mockGeolocation;

        jest.spyOn(global,"fetch").mockImplementation(() =>
            Promise.resolve({
                json: () => Promise.resolve(fetchdata)
            })
        )
    });
    

    afterEach(()=>{
        unmountComponentAtNode(element);
        element.remove();
        element=null;
    });


    // Test 1
    test('FavouriteCard should be rendered', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
    });

    // Test 2
    test('FavouriteCard should have "card-container" class' , async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(document.getElementsByClassName("card-container").length).toBe(1);
    });

    // Test 3
    test('FavouriteCard should have "fav-location-and-date" class' , async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(document.getElementsByClassName("fav-location-and-date").length).toBe(1);
    });

    // Test 4
    test('FavouriteCard should have "fav-current-temperature" class' , async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(document.getElementsByClassName("fav-current-temperature").length).toBe(1);
    });

    // Test 5
    test('FavouriteCard should have one img tag for the logo of the weather condition', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(document.getElementsByTagName('img').length).toBe(1);
    })

    // Test 6
    test('FavouriteCard should have Text Pressure', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(screen.getAllByText('Pressure').length).toBe(1);
    })

    // Test 7
    test('FavouriteCard should have Text Wind', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(screen.getAllByText('Wind').length).toBe(1);
    })

    // Test 8
    test('FavouriteCard should have Text Sunrise', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(screen.getAllByText('Sunrise').length).toBe(1);
    })

    // Test 8
    test('FavouriteCard should have Text Sunset', async() => {
        await act(async ()=>{
            render(<Router><FavouriteCard/></Router>);
        })
        expect(screen.getAllByText('Sunset').length).toBe(1);
    })

});

export default FavouriteCard;