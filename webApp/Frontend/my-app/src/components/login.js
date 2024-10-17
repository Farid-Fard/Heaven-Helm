import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom'; 

const Login = () => {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const [loginSuccess, setLoginSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate(); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); 

    try {
    
      const response = await axios.post('http://localhost:4000/user/login', {
        email, 
        password, 
      });

      if (response.status === 200) {
        setLoginSuccess(true);
        setErrorMessage('');
        
        localStorage.setItem('token', response.data.token);
      } else {
        setLoginSuccess(false);
        setErrorMessage('Invalid email or password. Please try again.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setLoginSuccess(false);
      setErrorMessage('Login failed. Please try again.');
    } finally {
      setIsSubmitting(false); 
  };
  }
  
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
        {/* Background image */}
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
            onChange={(e) => setPassword(e.target.value)} e
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
