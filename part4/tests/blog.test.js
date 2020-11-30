const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper');

const api = supertest(app);
const Blog = require('../models/Blog');
const User = require('../models/User');

beforeAll(async () => {
  await User.deleteMany({});

  const passwordHash = await bcrypt.hash('sekret', 10);
  const user = new User({ username: 'root', passwordHash });

  await user.save();
});
beforeEach(async () => {
  await Blog.deleteMany({});
  const blogObjects = helper.initialBlogs.map((blog) => new Blog(blog));
  const promiseArray = blogObjects.map((blog) => blog.save());
  await Promise.all(promiseArray);
});

describe('when there are initially some blogs saved', () => {
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
});

describe('addition of a new blog', () => {
  test('a blog can be added ', async () => {
    const usersInDb = await helper.usersInDb();
    const user = usersInDb[0];
    const newBlog = {
      title: 'TESTING 123',
      author: 'Edsger W. Dijkstra',
      url:
        'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      userId: user.id,
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
    const usersInDb = await helper.usersInDb();
    const user = usersInDb[0];
    const newBlog = {
      title: 'New blog without likes',
      author: 'AAAAAA',
      url: 'https://123456patterns.com/',
      userId: user.id,
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
    const usersInDb = await helper.usersInDb();
    const user = usersInDb[0];
    const newBlog = {
      author: 'ABCDEFG',
      likes: 10,
      userId: user.id,
    };
    await api.post('/api/blogs').send(newBlog).expect(400);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe('deleting a blog', () => {
  test('successfully deletes blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToDelete = blogsAtStart[0];

    await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const titles = blogsAtEnd.map((r) => r.title);

    expect(titles).not.toContain(blogToDelete.title);
  });
});

describe('updating a blog', () => {
  test('successfully updates blog', async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogToUpdate = blogsAtStart[0];
    const newBlogData = {
      likes: blogToUpdate.likes + 1,
    };
    await api
      .put(`/api/blogs/${blogToUpdate.id}`)
      .send(newBlogData)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    const newlyUpdatedBlog = blogsAtEnd[0];

    expect(newlyUpdatedBlog.likes).toBe(blogToUpdate.likes + 1);
  });
});

afterAll(() => {
  mongoose.connection.close();
});
