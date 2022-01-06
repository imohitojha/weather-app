import Landing from '../Components/landing/Landing';
import { BrowserRouter as Router} from "react-router-dom";
import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import {render as renderer,unmountComponentAtNode} from 'react-dom';
import '@testing-library/jest-dom/extend-expect';
import {act} from 'react-dom/test-utils';

describe('Landing Page Test cases', () => {
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
    test('Landing should be rendered', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
    });

    // Test 2
    test('Landing should have "Welcome To Cloudy" text', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        expect(screen.getByTestId('landing-heading')).toHaveTextContent("Welcome To Cloudy");
    });

    // Test 3
    test('Landing should have data displayed in cards (minimum 3 cards)', async() => {
        await act(async ()=>{
            renderer(<Router><Landing/></Router>,element);
        })
        expect(document.getElementsByClassName('card').length).toBeGreaterThanOrEqual(3);
    })

    // Test 4
    test('Landing should have class "landing-container"', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        expect(document.getElementsByClassName('landing-container').length).toBe(1);
    })

    // Test 5
    test('Landing should have "text-center" class in the heading', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        expect(screen.getByTestId('landing-heading')).toHaveClass('text-center')
    });

    // Test 6
    test('Landing should have at least one img tag for the logo of the weather condition', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        expect(document.getElementsByTagName('img').length).toBeGreaterThanOrEqual(1);
    })

    // Test 7
    test('Landing main card should have at least 3 inner card', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        let inner_cards = document.querySelectorAll('.main-inner-card');
        expect(inner_cards.length).toBeGreaterThanOrEqual(3);
    });
     // Test 8
     test('Landing extra card should have at least 3 inner card', async() => {
        await act(async ()=>{
            render(<Router><Landing/></Router>);
        })
        let inner_cards = document.querySelectorAll('.extra-inner-card');
        expect(inner_cards.length).toBeGreaterThanOrEqual(3);
    });

})

export default Landing;