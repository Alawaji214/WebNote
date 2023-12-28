import { useNavigate, useParams } from 'react-router-dom';
import React, { useState } from 'react';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState(''); // Define the password state variable
  const { token } = useParams();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const response = await fetch(`https://us-central1-note-409215.cloudfunctions.net/reset-password-functino?token=${token}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      // Handle successful password reset
      navigate('/');    } else {
      // Handle error
    }
  };

  // Rest of the component code...

  return (
    <div>
      <h3>Reset Password</h3>
      <form onSubmit={handleSubmit}>
        <label className="signin-label">
          new Password:
          <input type="password" placeholder="New password" className="signin-input" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <button className="signin-submit" type="submit">Submit</button>
      </form>
    </div>
  );
};

export default ResetPassword;
