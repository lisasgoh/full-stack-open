import React, { useState } from "react";
const Blog = ({ blog, user }) => {
  const [show, setShow] = useState(false);
  const showWhenVisible = { display: show ? "" : "none" };

  const toggleVisibility = () => {
    setShow(!show);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {show === true ? "hide" : "show"}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br></br>
        {blog.likes}
        <br></br>
        {user.name}
      </div>
    </div>
  );
};

export default Blog;
