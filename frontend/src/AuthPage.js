import React, { useState } from 'react';

  const SigninPage = ({handleSignIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // handle signup
      handleSignIn();
    };
  
    const handleSignup = (event) => {
      event.preventDefault();
      fetch(`http://localhost:4000/v1/user/signup`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
          email: "dummy@any.com"
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) { // if the response contains a token, signup was successful
          localStorage.setItem('token', data.token); // store the token
          handleSignIn();
        } else {
          // handle signup failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      // You can call handleSignIn() here if signup is successful
      console.log("signup");
    };
  
    const handleLogin = (event) => {
      event.preventDefault();
      // handle login
      // You can call handleSignIn() here if login is successful
      console.log("login");

      fetch('http://localhost:4000/v1/user/login', { // replace with your server URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      })
      .then(response => response.json())
      .then(data => {
        if (data.token) {
          handleSignIn();
        } else {
          // handle authentication failure
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

      // handleSignIn();
    };

    return (
        <div className="signin-form">
        <form onSubmit={handleSubmit}>
          <label className="signin-label">
            Username:
            <input type="text" className="signin-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="signin-label">
            Password:
            <input type="password" className="signin-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <input type="submit" className="signin-submit" value="Signup" onClick={handleSignup}/>
          <input type="submit" className="signin-submit" value="Login" onClick={handleLogin}/>
        </form>
      </div>
    );
  };

const AuthPage = ({handleSignIn}) => {
  return (
    <div>
      <h1>Sign-in</h1>
      <SigninPage handleSignIn={handleSignIn}/>
    </div>
  );
};

export default AuthPage;