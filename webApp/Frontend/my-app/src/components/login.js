import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const validateCredentials = (email, password) => {
    const registeredEmail = localStorage.getItem('registeredEmail');
    const registeredPassword = localStorage.getItem('registeredPassword');
    return email === registeredEmail && password === registeredPassword;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    if (validateCredentials(email, password)) {
      setLoginSuccess(true);
      setErrorMessage('');
    } else {
      setLoginSuccess(false);
      setErrorMessage('Invalid email or password. Please try again.');
    }

    setIsSubmitting(false);
  };

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        navigate("/user-account");
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [loginSuccess, navigate]);

  return (
    <div className="login-container">
      <div className="background-photo">
        {/* <img src={`${process.env.PUBLIC_URL}/H&H-Background.png`} alt="Background" /> */}
      </div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" disabled={isSubmitting}>Login</button>
      </form>

      {loginSuccess && <p className="success-message">You logged in successfully!</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
    </div>
  );
};

export default Login;
