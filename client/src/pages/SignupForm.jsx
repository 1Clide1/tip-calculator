import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';

// import style
import '../styles/partials/_signup-login.scss';

function SignupForm() {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  // user inputs are set to the state
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // add user mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
      console.log(data.addUser.token);
      //  e was already used on line 24 so I specified this var to err instead
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='form-container'>
        <label htmlFor='sign-up' title='Sign-Up Form' className='form-header'>
          Sign-Up
          <form id='sign-up' onSubmit={handleFormSubmit}>
            <label
              htmlFor='username'
              title='Your Username'
              className='form-label'
            >
              Username:
              <input
                type='text'
                id='username'
                name='username'
                placeholder='enter your username'
                className='form-input'
                value={userFormData.username}
                onChange={handleInputChange}
              />
            </label>
            <label htmlFor='email' title='Your Email' className='form-label'>
              Email:
              <input
                type='email'
                id='email'
                name='email'
                placeholder='enter your email (example@example.com)'
                className='form-input'
                value={userFormData.email}
                onChange={handleInputChange}
              />
            </label>
            <label
              htmlFor='password'
              title='Your Password'
              className='form-label'
            >
              Password:
              <input
                type='password'
                id='password'
                name='password'
                placeholder='enter your password'
                className='form-input'
                value={userFormData.password}
                onChange={handleInputChange}
              />
            </label>
            <button type='submit' className='submit-btn'>
              {' '}
              Sign-Up Here
            </button>
          </form>
        </label>
      </div>
      {/* if the sign up has an error it will display this instead */}
      {error && (
        <div className='error-container'>
          <i className='lni lni-sad error-icon' />
          <p className='error-title'>
            Oops, sign-up didnt work, might want to try it again.
          </p>
        </div>
      )}
    </>
  );
}

export default SignupForm;
