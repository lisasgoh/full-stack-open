const express = require('express');
const Blog = require('../models/Blog');
const User = require('../models/User');

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
  const { title, url, likes, author, userId } = request.body;
  const user = await User.findById(userId);
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
  } catch {
    response.status(400).end();
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
