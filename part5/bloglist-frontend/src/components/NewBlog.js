import React, { useState } from 'react';
const NewBlog = ({ createBlog }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const handleTitleChange = ({ target }) => setTitle(target.value);
  const handleAuthorChange = ({ target }) => setAuthor(target.value);
  const handleUrlChange = ({ target }) => setUrl(target.value);
  const handleCreate = (event) => {
    event.preventDefault();
    const newBlog = {
      author: author,
      title: title,
      url: url,
    };
    createBlog(newBlog);
    setTitle('');
    setAuthor('');
    setUrl('');
  };
  return (
    <>
      <h2>New blog</h2>
      <form onSubmit={handleCreate}>
        <div>
          title
          <input
            id="title-input"
            type="text"
            value={title}
            name="Title"
            onChange={handleTitleChange}
          />
        </div>
        <div>
          author
          <input
            id="author-input"
            type="text"
            value={author}
            name="Author"
            onChange={handleAuthorChange}
          />
        </div>
        <div>
          url
          <input
            id="url-input"
            type="text"
            value={url}
            name="Url"
            onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </>
  );
};

export default NewBlog;
