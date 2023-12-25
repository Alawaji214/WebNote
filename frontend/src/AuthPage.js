import React, { useState } from 'react';
import SignupComponent from './SignupComponent'; // Import the SignupComponent

const SigninPage = ({ handleSignIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showSignup, setShowSignup] = useState(false); // New state variable

  const handleSubmit = (event) => {
    event.preventDefault();
    // handle signup
    handleSignIn();
  };

  const handleSignup = (event) => {
    event.preventDefault();
    setShowSignup(true); // Show the SignupComponent when signup button is clicked
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
          localStorage.setItem('token', data.token); // store the token
          handleSignIn();
        } else {
          console.error('Error: Token not found');
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
      {!showSignup &&
        <form onSubmit={handleSubmit}>
          <label className="signin-label">
            Username:
            <input type="text" className="signin-input" value={username} onChange={(e) => setUsername(e.target.value)} />
          </label>
          <label className="signin-label">
            Password:
            <input type="password" className="signin-input" value={password} onChange={(e) => setPassword(e.target.value)} />
          </label>
          <input type="submit" className="signin-submit" value="Signup" onClick={handleSignup} />
          <input type="submit" className="signin-submit" value="Login" onClick={handleLogin} />
        </form>
      }
      {showSignup && <SignupComponent handleSignIn={handleSignIn} setShowSignup={setShowSignup} />} {/* Show the SignupComponent based on the state */}
    </div>
  );
};

const AuthPage = ({ handleSignIn }) => {
  return (
    <div>
      <h1>Sign-in</h1>
      <SigninPage handleSignIn={handleSignIn} />
    </div>
  );
};

export default AuthPage;