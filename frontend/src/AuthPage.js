import React, { useState } from 'react';

  const SigninPage = ({handleSignIn}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
  
    const handleSubmit = (event) => {
      event.preventDefault();
      // handle signup
      handleSignIn();
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
          <input type="submit" className="signin-submit" value="Signup" />
          <input type="submit" className="signin-submit" value="Login" />
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