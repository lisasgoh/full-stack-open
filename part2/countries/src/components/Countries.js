import React, { useState } from 'react'

import '../App.css';
import Country from './Country';

const Countries = ({ countriesToShow }) => {
    const [ show, setShow ] = useState(new Array(countriesToShow.length).fill(false));

    const showMore = (i) => {
        const newShow = show.slice(0);
        newShow[i] = !newShow[i];
        setShow(newShow);
    }

    console.log("There");

    return (
    <>
      <ul>
        {
          countriesToShow.map((country, i) => {
            if (show[i] === false) {
             return (
              <li key={country.name}>
                <p>{country.name}</p>
                <button onClick={() => showMore(i)}>show</button>
              </li>
             ) 
            } else if (show[i] === true) {
                return (
                  <li key={country.name}>
                    <button onClick={() => showMore(i)}>hide</button>
                    <Country country={country} />
                  </li>
                )
            }
            return null;
        })}
      </ul>
    </>
    )
}

export default Countries