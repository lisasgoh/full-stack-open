import React, { useState, useEffect } from 'react'

import '../App.css';

import axios from 'axios'

const Country = ({ country }) => {
    const [ weather, setWeather ] = useState(null);

    useEffect(() => {
        axios
          .get('http://api.weatherstack.com/current', {
            params : {
              access_key: "f91394c2cb24cb607eaf4abd15f52d4d",
              query: country.name
            }
        })
          .then(response => {
            if (response.status === 200) {
              setWeather(response.data)
            }
          })
      }, [])

    console.log(weather);
    
    if (weather === null) {
      return (
      <>
        <h1>{country.name}</h1>
        <img className="country-flag" src={country.flag} alt="Flag" />
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h1>Spoken languages</h1>
        <ul>
            {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
            )}
        </ul>
     </>
     )
    } else {
      return (
      <>
        <h1>{country.name}</h1>
        <img className="country-flag" src={country.flag} alt="Flag" />
        <p>capital {country.capital}</p>
        <p>population {country.population}</p>
        <h1>Spoken languages</h1>
        <ul>
            {country.languages.map(language =>
            <li key={language.name}>{language.name}</li>
            )}
        </ul>
        <p>temp: {weather.current.temperature} celcius</p>
        <img className="country-flag" src={weather.current.weather_icons[0]} alt="Weather icon" />
        <p>wind: {weather.current.wind_speed} mph in direction of {weather.current.wind_dir}</p>
      </>
     )
    }
  }

  export default Country