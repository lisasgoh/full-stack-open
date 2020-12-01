import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import NewBlog from "./components/NewBlog";
import Login from "./components/LoginForm";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [createdMessage, setCreatedMessage] = useState(null);
  const handleCreate = async (event) => {
    event.preventDefault();
    const newBlog = {
      author: author,
      title: title,
      url: url,
    };
    const blogCreated = await blogService.create(newBlog);
    setBlogs(blogs.concat(blogCreated));
    setTitle("");
    setAuthor("");
    setUrl("");
    setCreatedMessage(`${blogCreated.title} by ${blogCreated.author} added`);
    setTimeout(() => {
      setCreatedMessage(null);
    }, 5000);
  };
  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const user = await loginService.login({
        username,
        password,
      });
      window.localStorage.setItem("loggedinuser", JSON.stringify(user));
      blogService.setToken(user.token);
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      setErrorMessage("wrong username or password");
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
    const loggedUserJSON = window.localStorage.getItem("loggedinuser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  return (
    <div>
      {errorMessage}
      {user === null ? (
        <Login
          username={username}
          password={password}
          handleUsernameChange={({ target }) => setUsername(target.value)}
          handlePasswordChange={({ target }) => setPassword(target.value)}
          handleLogin={handleLogin}
        />
      ) : (
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in </p>
          {createdMessage}
          <NewBlog
            title={title}
            author={author}
            url={url}
            handleTitleChange={({ target }) => setTitle(target.value)}
            handleAuthorChange={({ target }) => setAuthor(target.value)}
            handleUrlChange={({ target }) => setUrl(target.value)}
            handleCreate={handleCreate}
          />
          <button onClick={handleLogout}>logout</button>
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} />
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
