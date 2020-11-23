import React, { Component } from 'react';

// axios is a npm package that you can install and use instead of fetch for API calls
import axios from 'axios'

// just a url to do an api call
const apiUrl = 'https://swapi.dev/api/people/'

// a url to do an api call that requires to have a unique key.
// You never want to push that key to github, you can create a .env file in the root of this project and add it in the .gitignore file and name that variable with the starting REACT_APP_  you can call this variable through process.env
// More info on: https://create-react-app.dev/docs/adding-custom-environment-variables/
const weather = `http://api.openweathermap.org/data/2.5/weather?q=Barcelona&units=metric&appid=${process.env.REACT_APP_API_WEATHER_KEY}`



class App extends Component {

  state = {
    text: 'HELLOOOO',
    apiLoaded: false, // we set a boolean to false in order to change it when the API has loaded
    data: {} // empty data object that will store whatever comes from api call
  }

  // API CALL WITH FETCH
  componentDidMount() {
    // HERE YOU CALL THE API AND UPDATE YOUR STATE WITH IT
    fetch(apiUrl) // fetch returns a promise, we take care with it with .then
      // the fetch promise comes with a response that contains information about the headers and http status
      // we need a json back from it so we need to use the .json() method
      .then(response => (response.json()))
      // the .json() method also returns a promise so we need to, again, use .then to finally get our data
      // In this example, the star wars api comes with an object and inside this object is the results property, that's why we store the .results
      .then(dataFromApi => (
        this.setState({
          data: dataFromApi.results,
          apiLoaded: true // the boolean now change to true so we control that the API has loaded
        })
      ))
  }

  // API CALL WITH FETCH AND ASYNC AWAIT

  // async componentDidMount() {
  //   const response = await fetch(apiUrl)
  //   const dataFromApi = await response.json()
  //   this.setState({
  //     data: dataFromApi.results,
  //     apiLoaded: true // the boolean now change to true so we control that the API has loaded
  //   })
  // }

  // API CALL WITH AXIOS AND ASYNC AWAIT

  // we can use async await to avoid using the .then
  // componentDidMount will be treated asynchronously meaning that in whatever promise we found inside, we can use await to resolve it
  // async componentDidMount() {
  //   const { data, status } = await axios(apiUrl) // we use the await here since axios returns a promise, we also destructure data and status directly from axios response, we don't need .json() here

  // for this example, if you want to use axios, you need to store data.results too

  //   this.setState({
  //     data: data.results,
  //     status,
  //     apiLoaded: true
  //   })
  // }


  render() {
    return (
      <div>
        <h1>{this.state.text}</h1>
        <h2>List of characters:</h2>
        {
          this.state.apiLoaded
            ? // if it is true, I'll loop over the data that I have on my state
            <div>
              {
                this.state.data.map((character, i) => (
                  <p key={i}>{character.name}</p>
                ))
              }
            </div>
            : // else, I'll just show some loading component / text
            <p>SHOW SOME LOADING SPINNER</p>
        }

      </div>
    )
  }
}


export default App;
