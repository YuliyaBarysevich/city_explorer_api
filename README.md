# city_explorer_api  

**Author**: Yuliya Barysevich
**Version**: 1.0.0

## Overview

A stand-alone back end which will interact with a static front end. We will request data from a total of six third-party APIs, modify the data as needed, and send the data to the client to be displayed in the browser. 

## Getting Started
<!-- What are the steps that a user must take in order to build this app on their own machine and get it running? -->
1. Repository Set Up
    - data directory - containing [location.json](https://codefellows.github.io/code-301-guide/curriculum/class-06/lab/starter-code/data/location.json) and [weather.json](https://codefellows.github.io/code-301-guide/curriculum/class-06/lab/starter-code/data/weather.json)
    - create `.env` file with your PORT
    - create `.gitignore` file with standard NodeJS configurations
    - create `.eslintrc.json` file
    - `package.json` file creates when you add packages (dependencies). Packages needed for the lab express, dotenv, and cors.
2. Creating a Location Route
    - Create a route with a method of `get` and a path of `/location`. The route callback should invoke a function to convert the search query to a latitude and longitude. The function should use the provided JSON data.
    - Create a constructor function, it will ensure that each object is created according to the same format when your server receives the external data. Ensure your code base uses a constructor function for this resource.
    - Return an object which contains the necessary information for correct client rendering. 
    - Confirm that your route is responding as expected by entering your deployed backend URL on the [City Explorer app's welcome page](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/). Then search for a location. You should see the following info ...

```javascript
{
  "search_query": "seattle",
  "formatted_query": "Seattle, WA, USA",
  "latitude": "47.606210",
  "longitude": "-122.332071"
}
```  

3. Creating a Weather Route
    - Create a route with a method of `get` and a path of `/weather`. The callback should use the provided JSON data.
    - Create a constructor function, it will ensure that each object is created according to the same format when the server receives data. Ensure your code base uses a constructor function for this resource.
    - Using each weather object of the result, return an array of objects for each day of the response which contains the necessary information for correct client rendering.
    - Confirm that your route is responding as expected by entering your deployed backend URL on the [City Explorer app's welcome page](https://codefellows.github.io/code-301-guide/curriculum/city-explorer-app/front-end/). Then search for a location. You should see  weather data ...

```javascript 
[
  {
    "forecast": "Partly cloudy until afternoon.",
    "time": "Mon Jan 01 2001"
  },
  {
    "forecast": "Mostly cloudy in the morning.",
    "time": "Tue Jan 02 2001"
  },
  ...
]
```


## Architecture

**Languages:**

- JavaScript

**Frameworks:**

- Express

**Platform:**

- Node.js

## Time Estimate

**Number and name of feature:** Repository Set Up

Estimate of time needed to complete: 30 min

Start time: 1.30PM

Finish time: 2.10PM

Actual time needed to complete: 40 min
___________________________________________________________________
**Number and name of feature:** Creating a Location Route

Estimate of time needed to complete: 1 hour

Start time: 4.30PM

Finish time: 5.20PM

Actual time needed to complete: 50 min
___________________________________________________________________
**Number and name of feature:** Creating a Weather Route

Estimate of time needed to complete: 1 hour

Start time: 5.20PM

Finish time: 6.50PM

Actual time needed to complete: 1hr 30min



## Change Log

02-22-2020 6:30pm - Application now has a fully-functional express server, with a GET route for the location and weather resources.

## Credits and Collaborations
