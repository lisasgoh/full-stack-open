const bcrypt = require('bcrypt');
const usersRouter = require('express').Router();
const User = require('../models/User');

usersRouter.get('/', async (request, response) => {
  const users = await User.find({});
  response.json(users);
});

usersRouter.post('/', async (request, response) => {
  const { body } = request;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(body.password, saltRounds);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  try {
    const savedUser = await user.save();
    response.json(savedUser);
  } catch (err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      response.status(400).send({ error: '`username` to be unique' });
    }
  }
});

module.exports = usersRouter;
