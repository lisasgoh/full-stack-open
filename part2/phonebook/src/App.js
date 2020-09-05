import React, { useState, useEffect } from 'react'

import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Persons from './components/Persons'

import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ searchInput, setSearchInput ] = useState('')

  useEffect(() => {
    personService
      .getAll('http://localhost:3001/persons')
      .then(personData => {
        setPersons(personData)
      })
  }, [])

  // console.log('render', persons.length, 'people')

  const personsToShow = persons.filter(person => 
    person.name.toLowerCase()
      .includes(searchInput.toLowerCase()));

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  }

  const handleSearchChange = (event) => {
    setSearchInput(event.target.value);
  }

  const addPerson = (event) => {
    event.preventDefault();
    const personObject = {
      name: newName,
      number: newNumber,
    }
    const findPerson = persons.find(person => person.name === newName);
    if (findPerson === undefined) {
      personService.create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson));
        setNewName('');
        setNewNumber('');
      })
    }
    else {
      const result = window.confirm(`${newName} is already added to the phonebook, replace the old number with a new one?`);
      if (result === true) {
        updatePerson(personObject, findPerson.id);
        setNewName('');
        setNewNumber('');
      }
    }
  }

  const deletePerson = (delPerson) => {
    const result = window.confirm(`Delete ${delPerson.name}?`);
    if (result === true) {
      personService.deleteObj(delPerson.id)
      .then(() => {
        setPersons(persons.filter(person => person.id !== delPerson.id));
      })
    }
  }

  const updatePerson = (newPerson, id) => {
    personService.update(id, newPerson)
    .then(updatedPerson => {
      setPersons(persons.map(person => person.id !== id ? person : updatedPerson));
    })
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter searchInput={searchInput} handleSearchChange={handleSearchChange} />
      <PersonForm addPerson={addPerson} newName={newName} handleNameChange={handleNameChange} 
        newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Persons personsToShow={personsToShow} deletePerson={deletePerson} />
    </div>
  )
}

export default App