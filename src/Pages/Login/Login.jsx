import { useState } from 'react';
import assets from '../../assets/assets';
import './Login.css';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form className="login-form">
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' ? (
          <input
            type="text"
            placeholder="user name"
            className="form-input"
            required
          />
        ) : null}

        <input
          type="email"
          placeholder="Email address"
          className="form-input"
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          required
        />

        <button type="submit">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login Now'}
        </button>
        <div className="login-term">
          <input type="checkbox" />
          <p>Agree to the terms of use & privacy policy.</p>
        </div>
        <div className="login-forgot">
          {currentState === 'Sign Up' ? (
            <p className="login-toggle">
              Already have an account?
              <span onClick={() => setCurrentState('Login')}> Login here</span>
            </p>
          ) : (
            <p className="login-toggle">
              New here?
              <span onClick={() => setCurrentState('Sign Up')}>
                Create An account
              </span>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Login;
