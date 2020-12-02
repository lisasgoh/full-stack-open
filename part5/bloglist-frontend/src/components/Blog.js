import React, { useState } from 'react';
const Blog = ({ blog, user, likeBlog, deleteBlog }) => {
  const [show, setShow] = useState(false);
  const showWhenVisible = { display: show ? '' : 'none' };

  const toggleVisibility = () => {
    setShow(!show);
  };
  const handleLike = () => {
    const likedBlog = {
      ...blog,
      likes: blog.likes + 1,
    };
    likeBlog(likedBlog, blog.id);
  };
  const handleDelete = () => {
    deleteBlog(blog.id);
  };
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  };
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {show === true ? 'hide' : 'show'}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br></br>
        {blog.likes}
        <button onClick={handleLike}>like</button>
        <br></br>
        {blog.user.name}
        {blog.user.id === user.id && (
          <button onClick={handleDelete}>delete</button>
        )}
      </div>
    </div>
  );
};

export default Blog;
