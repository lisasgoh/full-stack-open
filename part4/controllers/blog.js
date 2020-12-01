const express = require('express');
const jwt = require('jsonwebtoken');
const Blog = require('../models/Blog');
const User = require('../models/User');

const blogRouter = express.Router();

const getTokenFrom = (request) => {
  const authorization = request.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7);
  }
  return null;
};

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const { title, url, likes, author, userId } = request.body;
  const token = getTokenFrom(request);
  const decodedToken = jwt.verify(token, process.env.SECRET);
  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' });
  }
  const user = await User.findById(decodedToken.id);
  const blog = new Blog({
    title,
    author,
    url,
    likes,
    user: user._id,
  });
  try {
    const newBlog = await blog.save();
    user.blogs = user.blogs.concat(newBlog._id);
    await user.save();

    response.json(newBlog);
  } catch (err) {
    response.status(400).send({ error: err }).end();
  }
});

blogRouter.delete('/:id', async (request, response) => {
  const blogToBeDeleted = await Blog.findByIdAndRemove(request.params.id);
  response.status(204).json(blogToBeDeleted);
});

blogRouter.put('/:id', async (request, response) => {
  const blogToBeUpdated = await Blog.findByIdAndUpdate(
    request.params.id,
    { $set: request.body },
    { new: true },
  );
  response.status(204).json(blogToBeUpdated);
});

module.exports = blogRouter;
