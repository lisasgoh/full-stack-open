import React, { useState, useEffect } from 'react'

import Filter from './components/Filter'
import Country from './components/Country'
import Countries from './components/Countries'
import './App.css';

import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([]);
  const [ searchInput, setSearchInput ] = useState('');

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        // console.log(response.data)
      })
  }, [])

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value); //if setcountriestoshow here, it will be one letter behind
  }
  
  console.log("Here"); //not sure why this runs so many times.... (Runs twice with each letter typed, runs 4 times at the start)
  const countriesToShow = countries.filter(country => 
    country.name.toLowerCase()
      .includes(searchInput.toLowerCase()));

  if (countriesToShow.length === 1) {
    return (
      <div>
        <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
        <Country country={countriesToShow[0]} />
      </div>
    );
  } else if (countriesToShow.length > 10) {
    return (
      <div>
        <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
        <p>Too many matches, specify another filter.</p>
      </div>
    );
  } else {
    return (
      <div>
        <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
        <Countries countriesToShow={countriesToShow} />
      </div>
    );
  }
}

export default App;
