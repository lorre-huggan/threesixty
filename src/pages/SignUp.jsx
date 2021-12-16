import React, { useState, useEffect } from 'react';
import { Wrapper, H3, Alert } from '../styles/GlobalComponents';
import { breakpoints, styledTheme } from '../styles/Mixins';
import { FaExclamation, FaCheck } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

const SignUp = () => {
  const [userSignUp, setUserSignUp] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
  });
  const [passError, setPassError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { xl, lg, md } = breakpoints;
  const { register } = useAuth();

  //form styles
  const input = {
    height: '2rem',
    border: 'none',
    outline: 'none',
    padding: '0.25rem',
    borderRadius: '2px',
  };

  const label = {
    fontSize: '1.25rem',
  };

  //firebase

  //form handling
  function formSubmit(e) {
    e.preventDefault();
    if (
      !userSignUp.email ||
      !userSignUp.password ||
      !userSignUp.passwordConfirm
    ) {
      return setPassError('Credentials not valid');
    }
    if (userSignUp.password.length < 6) {
      return setPassError('Password should be at least 6 characters');
    }
    if (userSignUp.password !== userSignUp.passwordConfirm) {
      return setPassError('Passwords do not match');
    }
    setLoading(true);
    register(userSignUp.email, userSignUp.password)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        if (err.message === 'Firebase: Error (auth/email-already-in-use).') {
          setPassError('Email already registered');
        }
      })
      .finally(() => {
        setLoading(false);
      });
    setUserSignUp({
      email: '',
      password: '',
      passwordConfirm: '',
    });
  }

  const handleChange = (e) => {
    setPassError(false);
    setUserSignUp({
      ...userSignUp,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Wrapper hidden width={xl} align="center" lgWidth={lg} mdWidth="980">
      <H3>Sign Up</H3>
      <Wrapper width={md} align="center" mtop="2">
        <form style={{ width: '400px' }} onSubmit={formSubmit}>
          {/* <Wrapper
            justify="space-between"
            align="center"
            direction="row"
            mbottom="0.25"
          >
            <label style={label}>Name</label>
            <div>
              <input
                type="text"
                name="name"
                placeholder="MettaWorld"
                style={input}
                value={userSignUp.name}
                onChange={handleChange}
              />
              <FaExclamation />
              <FaCheck />
            </div>
          </Wrapper> */}
          <Wrapper
            justify="space-between"
            align="center"
            direction="row"
            mbottom="0.25"
          >
            <label style={label}>Email</label>
            <div>
              <input
                type="email"
                name="email"
                placeholder="worldpe4ce@me.com"
                style={input}
                value={userSignUp.email}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          <Wrapper
            justify="space-between"
            align="center"
            direction="row"
            mbottom="0.25"
          >
            <label style={label}>Password</label>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                style={input}
                value={userSignUp.password}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          <Wrapper justify="space-between" align="center" direction="row">
            <label style={label}>Password Confirm</label>
            <div>
              <input
                type="password"
                name="passwordConfirm"
                placeholder="Re-type Passwrod"
                style={input}
                value={userSignUp.passwordConfirm}
                onChange={handleChange}
              />
            </div>
          </Wrapper>
          {/* Error alerts */}
          {passError && (
            <Wrapper mtop="1">
              <Alert error>{passError}</Alert>
            </Wrapper>
          )}
          <Wrapper mtop="1">
            <button type="submit" disabled={loading}>
              Submit
            </button>
            <Wrapper mtop="1" align="left">
              Already have an account log-in here
            </Wrapper>
          </Wrapper>
        </form>
      </Wrapper>
    </Wrapper>
  );
};

export default SignUp;
