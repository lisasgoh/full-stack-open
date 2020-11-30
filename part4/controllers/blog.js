const express = require('express');
const Blog = require('../models/Blog');

const blogRouter = express.Router();

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({});
  if (blogs) {
    response.json(blogs);
  } else {
    response.status(404).end();
  }
});

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body);
  try {
    const newBlog = await blog.save();
    response.json(newBlog);
  } catch {
    response.status(400).end();
  }
});

module.exports = blogRouter;
