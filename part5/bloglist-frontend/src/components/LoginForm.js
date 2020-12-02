import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Login = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const handleUsernameChange = ({ target }) => setUsername(target.value);
  const handlePasswordChange = ({ target }) => setPassword(target.value);

  const submitForm = (event) => {
    event.preventDefault();
    const user = {
      username: username,
      password: password,
    };
    handleLogin(user);
    setUsername('');
    setPassword('');
  };

  return (
    <>
      <form onSubmit={submitForm}>
        <div>
          username
          <input
            type="text"
            value={username}
            name="Username"
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            type="password"
            value={password}
            name="Password"
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </>
  );
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
};
export default Login;
