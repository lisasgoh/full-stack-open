const express = require('express')
const app = express()

app.use(express.json())

let persons = [
  {
    "name": "Arto Hellas",
    "number": "1234",
    "id": 1
  },
  {
    "name": "Ada Lovelace",
    "number": "1234",
    "id": 2
  },
  {
    "name": "Dan Abramov",
    "number": "1234",
    "id": 3
  },
  {
    "name": "Mary Poppendieck",
    "number": "1234",
    "id": 4
  }
]
  app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>')
  })
  
  app.get('/api/persons', (req, res) => {
    res.json(persons)
  })

  app.get('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.json(person)
  })


  app.get('/info', (req, res) => {
    const date = new Date()
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
    <p>${date}</p>`);
  })
  
  const PORT = 3001
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })