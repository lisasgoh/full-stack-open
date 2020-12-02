import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import NewBlog from './components/NewBlog';
import Login from './components/LoginForm';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [createdMessage, setCreatedMessage] = useState(null);
  const blogFormRef = useRef();

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();
    const blogCreated = await blogService.create(blogObject);
    setBlogs(blogs.concat(blogCreated));
    setCreatedMessage(`${blogCreated.title} by ${blogCreated.author} added`);
    setTimeout(() => {
      setCreatedMessage(null);
    }, 5000);
  };

  const likeBlog = async (blogObject, id) => {
    const { title, author, url, user, likes } = blogObject;
    const updatedBlog = {
      title,
      author,
      url,
      user: user.id,
      likes: likes,
    };
    await blogService.update(updatedBlog, id);
    let newBlogs = blogs.map((blog) => (blog.id !== id ? blog : blogObject));
    newBlogs = newBlogs.sort((a, b) => b.likes - a.likes);
    setBlogs(newBlogs);
  };

  const deleteBlog = async (id) => {
    await blogService.deleteObj(id);
    const newBlogs = blogs.filter((blog) => blog.id !== id);
    console.log(newBlogs);
    setBlogs(newBlogs);
  };
  const handleLogin = async (newObject) => {
    try {
      const user = await loginService.login(newObject);
      window.localStorage.setItem('loggedinuser', JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
    } catch (exception) {
      setErrorMessage('wrong username or password');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  };

  const handleLogout = () => {
    window.localStorage.clear();
    blogService.setToken(null);
    setUser(null);
  };

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedinuser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    async function fetchData() {
      let blogs = await blogService.getAll();
      blogs.sort((a, b) => b.likes - a.likes);
      setBlogs(blogs);
    }
    fetchData();
  }, []);

  return (
    <div>
      {errorMessage}
      {user === null ? (
        <Togglable buttonLabel="login">
          <Login handleLogin={handleLogin} />
        </Togglable>
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in </p>
          {createdMessage}
          <Togglable buttonLabel="new blog" ref={blogFormRef}>
            <NewBlog createBlog={createBlog} />
          </Togglable>
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              likeBlog={likeBlog}
              deleteBlog={deleteBlog}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
