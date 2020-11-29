const express = require("express");
const app = express();
const cors = require("cors");
const Person = require("./models/person");

app.use(express.json());

app.use(cors());

/* let persons = [
  {
    name: "Arto Hellas",
    number: "1234",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "1234",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "1234",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "1234",
    id: 4,
  },
]; */

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (req, res) => {
  Person.find({}).then((persons) => {
    res.json(persons);
  });
});

app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  Person.findById(id).then((person) => {
    res.json(person);
  });
  // const person = persons.find((person) => person.id === id);
  // res.json(person);
});

app.get("/info", (req, res) => {
  const date = new Date();
  Person.find({}).then((persons) => {
    console.log(persons);
    res.json(`Phonebook has info for ${persons.length} people \n ${date}`);
  });
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((person) => person.id !== id);

  response.status(204).end();
});

app.post("/api/persons", (req, res) => {
  // const id = Math.floor(Math.random() * (1000 - 1 + 1)) + 1;
  /* if (req.body.name == "" || req.body.number == "") {
    return res.status(400).json({
      error: "please input all fields",
    });
  } else {
    Person.find({ name: req.body.name }), function (err, docs) {
    if (docs.length == 0) {
    return res.status(400).json({
      error: "duplicate entry",
    });
  }
  } 
  const person = req.body;
  person.id = id;
  persons = persons.concat(person);

  res.json(person);*/
  if (req.body.name === undefined) {
    return res.status(400).json({
      error: "name missing",
    });
  }

  if (req.body.number === undefined) {
    return res.status(400).json({
      error: "number missing",
    });
  }
  const person = new Person({
    name: req.body.name,
    number: req.body.number,
    // id: Math.floor(Math.random() * 100000),
  });
  person
    .save()
    // .then((savedPerson) => savedPerson.toJSON())
    .then((savedPerson) => {
      res.json(savedPerson);
    })
    .catch((error) => {
      return res.status(400).json({
        error: "name must be unique",
      });
    });
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
