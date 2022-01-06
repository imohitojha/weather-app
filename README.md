# Cloudy Weather Application | React
![node-current](https://img.shields.io/badge/npm-v6.14.11-green) ![node-current](https://img.shields.io/badge/build-success-green)

# Table of Contents

- **[Abstract](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#abstract)**
- **[Key features ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#key-features)**
- **[Technologies Used ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#technologies-used)**
- **[API ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#api)**
- **[Components ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#components)**
- **[Running the Application ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#running-the-application)**
- **[Screen Shots ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#screenshots-of-the-application)**
- **[User Manual ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#user-manual-for-using-the-application)**
- **[Conclusion ](https://gitlab-gl.stackroute.in/nuthan.s/weather_application#conclusion)**

## Abstract

**Watch the weather in your city by searching using City name, Latitude & Longitude or Zip code and one can receive current weather as well as weather forecast of up to 16 days, including data of current temperature, max & min temperatures, wind, cloudiness, pressure, time of sunrise and sunset on this Weather App**

## Key Features
-   User Login and Registration
-   Current location weather details based on User's Geo location.
-   Searchable weather details by City name, by Geo coordinates and by Zip codes.
-   Details of weather parameters like current temperature, wind, pressure and rain forecast.
-   Dynamic weather type icon based on weather.
-   Favourite cities can be added which is user specific.
-   Responsive

## Technologies Used
-   Node
-   HTML5
-   CSS
-   JSX
-   Bootstrap
-   Material UI
-   Momemt Library
-   React JS
-   Fetch API
- 	Cypress - E2E Testing
- 	Jest 
-   GitLab
-   Docker
-   Ngnix

## API
Weather data is retrieved from
[Openweathermap API](https://openweathermap.org/)
The following are the API's used to fetch the current as well as forecast data

 - [Current Weather Data](https://openweathermap.org/current) 
	 - Data based on search by city name, geo coordinates and zip codes
	  `api.openweathermap.org/data/2.5/weather?q={city name}&appid=[{API key}](https://home.openweathermap.org/api_keys)`

 - [Forecast Weather Data](https://openweathermap.org/forecast16)
	 - Data based on search by city name, geo coordinates and zip codes
	``api.openweathermap.org/data/2.5/forecast/daily?q={city name}&cnt={cnt}&appid=[{API key}](https://home.openweathermap.org/api_keys)``
	
## Components

 - Login
	 - This component is used for login functionality of application.
 - Register
	 - This component is used for registration purpose of the new user.
 - Header
	 - This component is used for rendering the nav-bar in the application.
 - Footer
	 - This component is used for rendering the footer in the application.
 - Landing Page
	 - This component is used to render the landing page when a user visits the application.
 - Filter
	 - This component is used to perform the filter and render the particular input options based in the user drop-down selection. 
 - Search
	 - This component is used to fetch the weather details based on the user selection and input.
 - Present Card
	 - This component renders the display for the current weather details fetched. 
 - Daily Card
	 - This component renders the display for the forecast weather details fetched.
 - Favourite
	 - This component is used to fetch details from user specific db.json, add favourite cities based on users and also fetch current data of favourite cities daily.
 - Favourite Card
	 - This component renders the display for the favourite data fetched from the db.json.

## Running the Application

 **1. Running the application locally by npm.**  
-   Clone this repository `git clone gitlab url`
-   Change the directory to: `$ cd weather_application`
-   Now you need to install the package dependencies using; `$ npm install`
-   Now run the application using: `$ npm start`

- For running the authentication server clone this repository: `git clone gitlab url`
- Change the directory to: `$ cd nodejs-auth-server`
- Now you need to install and run it by using:`npm install` 
`npm run server`

 **2. Running the application using a Docker.**
- Clone this repository `git clone gitlab url`
- Change the directory to: `$ cd weather_application`
- Now you need to build the docker image using: `docker build . -t weather_application`
- Now you can check the docker image built using :`docker images`
- Now you need to run the docker image to get the application running: `docker run -it --rm -p 7000:80 weather_application`
- Now you need to build the docker image for auth server : `docker build . -t nodejs-auth-server`
- After this we can run both images by using docker compose, for that you need to add the docker compose yml file in the parent       
  folder and run the following command: `docker compose up`

## Screenshots of the Application

#### **Registration Page for a user to register.**
![Registration Page](https://drive.google.com/uc?export=view&id=1xo6LmXmGMsjR9ASpP5dzPhp-omDpXlzL)
#### **Login Page of the application for specific users can login and save their favourite cities.**
![Login Page](https://drive.google.com/uc?export=view&id=1-9vkr43Arnjwhf_zN9qBJ4otQ4WamhhV)
#### **Landing Page of the application showing the weather details based on Geo location of the user.**
![Landing Page](https://drive.google.com/uc?export=view&id=1BrR7Zl4MAhWGp7hQw43l99bLKsNLgSUe)
#### **Search Page where one can search the weather by city name, Geo coordinates, zip codes and also get forecast weather details for 16 days.**
![Search Page](https://drive.google.com/uc?export=view&id=1dCnFJLZR1bt3OroWU-xYQOELcBaToVUC)
#### **Favourites page which is user specific which needs login for every user so one user can add his choice cities to this list and get weather details easily.**
![Favourites Page](https://drive.google.com/uc?export=view&id=1YYUgQ-k9Vnyknqm2iEjwGILZ__-gJikZ)
## User Manual for using the Application

One user can follow the below steps to know how to use the application.
>Any user can search for weather details but one needs to register if one wants to add favourite cities to his account.

**Registration**

 1. One user needs to click on the register link in the header section to navigate to register page. 	
 2. Then the user needs to fill all the details mentioned like First Name, Last Name, City, Age, Email and Password. 
 3. But the email needs to be a valid email consisting of a " @ " and " . " in it and same email cannot be used for different accounts.
 4. The password needs to be at least 8 characters in length and it should consists of at least one capital letter, one number and one special character. 
 5. User satisfying these above conditions will be successfully registered.

**Login**

 1. The user after registration will be redirected to login page or if the user is already registered one can click on the login link in the header.
 2. User needs to enter his valid registered email and password to login to the application.
 3. After successful login on will be navigated to the search page and the user can now access ones favourite page.


**Using Search**
 1. At the beginning it will show weather details of the current loaction and its forecast
 2. The user can choose from the select drop-down button by which terms
    he wants to search the weather details by:
	    --City Name - One can enter city name 
	    --Geo Coordinates - One can enter the latitude and longitude
	    --Zip Codes - One can enter zip code and should enter the country code 
 3. The user also can use the slider in the search field to choose for how many days does one needs the forecast weather details. The forecast can be done between 1 to 16 days.But it needs to be combined with either City Name, Geo Coordinates or Zip Codes and Country Code.


**Adding Cities to Favourites**
 1. The user can click the "Add to Favourites" button in the search page and add any city which one has searched to the favourite list so any day one can login and easily check the weather of one of the favourite city without the need of doing the search again.
 2. He can also remove the favourite city from the list by clicking the delete button in the list of favourite cities.


## Conclusion

This Cloudy Weather Application is built on ReactJS using Openweathermap.org API which is mainly focused on providing the weather details for a user based on his current Geo location and also it is made easy for a user to get the weather details by making search by city name, Geo coordinates, zip codes. This application is user specific so that a user can add favourite cities to one's account after successful registration and login. The application responsive for all devices and can be accessed by any user using a browser.

### **Team Members**

- Nuthan S S
- Parikshith H
- Niranjan Kurve
- Mohit Ojha