
import React, { useState } from 'react';
import './registerPage.css'; 

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordValid, setPasswordValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{5,}$/;
    return passwordRegex.test(password);
  };

  const handleUsernameChange = (e) => {
    const newEmail = e.target.value;
    setUsername(newEmail);
    setEmailValid(validateEmail(newEmail));
  };

  
  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    setPasswordValid(validatePassword(newPassword));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault(); 

    if (!emailValid) {
      alert('Please enter a valid email address!');
      return;
    }

    if (!passwordValid) {
      alert('Please enter a valid password!');
      return;
    }

  
    localStorage.setItem('registeredEmail', username);
    localStorage.setItem('registeredPassword', password);

    alert('Registered successfully!');
    setUsername('');
    setPassword('');
  };

  return (
    <div className="register-container">
      <div className="background-photo">
        {/* <img src={`${process.env.PUBLIC_URL}/H&H-Background.png`} alt="Background" /> */}
      </div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Email:</label>
          <input
            type="email"
            id="username"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          <p style={{ color: emailValid ? 'green' : 'red' }}>
            {emailValid ? 'Valid email address' : 'Please enter a valid email address'}
          </p>
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
          <ul className="password-requirements">
            <li style={{ color: password.length >= 5 ? 'green' : 'red' }}>
              At least 5 characters
            </li>
            <li style={{ color: /[A-Z]/.test(password) ? 'green' : 'red' }}>
              At least one capital letter
            </li>
            <li style={{ color: /\d/.test(password) ? 'green' : 'red' }}>
              At least one number
            </li>
          </ul>
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
