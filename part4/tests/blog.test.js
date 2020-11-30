const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/Blog');

beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

test('blogs can be retrieved', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test('blogs have the variable id', async () => {
  const response = await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/);

  response.body.forEach((blog) => {
    expect(blog.id).toBeDefined();
  });
});

test('a blog can be added ', async () => {
  const newBlog = {
    title: 'TESTING 123',
    author: 'Edsger W. Dijkstra',
    url:
      'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const titles = blogsAtEnd.map((blog) => blog.title);
  expect(titles).toContain('Go To Statement Considered Harmful');
});

test('a blog added without likes has the value default to 0 ', async () => {
  const newBlog = {
    title: 'New blog without likes',
    author: 'AAAAAA',
    url: 'https://123456patterns.com/',
  };
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();

  const newBlogCreated = blogsAtEnd.find(
    (blog) => blog.title === newBlog.title,
  );
  expect(newBlogCreated.likes).toBe(0);
});

test('a blog added without title and url is invalid ', async () => {
  const newBlog = {
    author: 'ABCDEFG',
    likes: 10,
  };
  await api.post('/api/blogs').send(newBlog).expect(400);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

afterAll(() => {
  mongoose.connection.close();
});
