import React from "react";

const Persons = ({ personsToShow, deletePerson }) => {
  return (  
    <ul>
      {personsToShow.map(person =>
        <li key={person.name}>
            <p>{person.name} {person.number}</p>
            <button onClick={() => {deletePerson(person)}}>delete</button>
        </li>
      )}
    </ul>
  )
}

export default Persons