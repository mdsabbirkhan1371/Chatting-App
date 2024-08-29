import { useContext, useRef, useState } from 'react';
import assets from '../../assets/assets';
import './Login.css';
import { AppContext } from '../../Context/AppContextProvider/AppContextProvider';

const Login = () => {
  const [currentState, setCurrentState] = useState('Sign Up');

  // from context auth
  const { signUp, signIn } = useContext(AppContext);

  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = event => {
    event.preventDefault(); // Prevent page reload

    const username = usernameRef.current ? usernameRef.current.value : '';
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    console.log('Username:', username);
    console.log('Email:', email);
    console.log('Password:', password);

    if (currentState === 'Sign Up') {
      console.log('Signing up...');
      signUp(username, email, password);
    } else {
      console.log('Logging in...');
      signIn(email, password);
    }
  };

  return (
    <div className="login">
      <img src={assets.logo_big} className="logo" alt="" />
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>{currentState}</h2>
        {currentState === 'Sign Up' && (
          <input
            type="text"
            placeholder="User name"
            className="form-input"
            ref={usernameRef}
            required
          />
        )}
        <input
          type="email"
          placeholder="Email address"
          className="form-input"
          ref={emailRef}
          required
        />
        <input
          type="password"
          placeholder="Password"
          className="form-input"
          ref={passwordRef}
          required
        />

        <button type="submit">
          {currentState === 'Sign Up' ? 'Create Account' : 'Login Now'}
        </button>
        <div className="login-term">
          <input type="checkbox" required />
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
