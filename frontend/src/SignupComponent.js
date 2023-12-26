import React, { useState } from 'react';

const SignupComponent = ({ handleSignIn, setShowSignup }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    // handle signup
    fetch(`https://note-gateway3-2m0hc1vk.uc.gateway.dev/v1/user/signup`, {
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
          // show feadback to the user 
          alert("Signup failed");
          throw new Error('Signup failed');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });

    console.log("signup");
  };

  const resetPassword = async (email) => {
    try {
      const response = await fetch('https://note-gateway3-2m0hc1vk.uc.gateway.dev/v1/reset/sendPasswordReset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        console.log('Password reset email sent successfully');
        // Show success message
        alert('Password reset email sent successfully');
        // Return to the main page
        window.location.href = '/';
      } else {
        console.log('Failed to send password reset email');
        // Show failure message
        alert('Failed to send password reset email');
        // Return to the main page
        window.location.href = '/';
      }
    } catch (error) {
      console.error('An error occurred while sending the password reset email:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSignup}>

        <label className="signin-label">
          Username:
          <input type="text" className="signin-input" placeholder="username" value={username} onChange={(e) => setUsername(e.target.value)} />
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
      <p> or reset your password</p>
      <form onSubmit={(e) => { e.preventDefault(); resetPassword(email); }}>
        <label className="signin-label">
          Email:
          <input type="email" className="signin-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button className="signin-submit" type="submit">Reset Password</button>
      </form>
    </div>

  );
};

export default SignupComponent;
