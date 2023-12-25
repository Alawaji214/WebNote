import React, { useState } from 'react';

const SignupComponent = ({handleSignIn, setShowSignup}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

const handleSignup = (event) => {
    event.preventDefault();
    // handle signup
    fetch(`http://localhost:4000/v1/user/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password,
                email: email,
            }),
        })
        .then(response => {
            if (response.status === 201) { // check if the response status code is 201
                setShowSignup(false);    
                return response.json();
            } else {
                    throw new Error('Signup failed');
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        });

    console.log("signup");
};

  return (
    <form onSubmit={handleSignup}>
        
    <label className="signin-label">
        Username:
        <input type="text" className="signin-input"  placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
    </label>
    <label className="signin-label">
        Email:
        <input type="email" className="signin-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>
    <label className="signin-label">
        Password:
        <input type="password" className="signin-input" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    </label>

      <button className="signin-submit" type="submit">Sign Up</button>
    </form>
  );
};

export default SignupComponent;