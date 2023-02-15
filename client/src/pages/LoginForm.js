// see SignupForm.js for comments
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../../client2/src/utils/mutations';
import Auth from '../../../client2/src/utils/auth';
// import css
import './signup-login.css';

const LoginForm = () => {
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // add login mutation
  // must be the same name as the mutation itself
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      // has to be called data
      const { data } = await login({
        variables: { ...userFormData },
      });
      Auth.login(data.login.token);
      console.log(data.login.token);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className='form-container'>
        <label title='Sign-Up Form' className='form-header'>
          Login
        </label>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor='email' title='Your Email' className='form-label'>
            Email:
          </label>
          <input
            type='email'
            id='email'
            name='email'
            placeholder='enter your email (example@example.com)'
            className='form-input'
            value={userFormData.email}
            onChange={handleInputChange}
          />
          <label
            htmlFor='password'
            title='Your Password'
            className='form-label'
          >
            Password:
          </label>
          <input
            type='password'
            id='password'
            name='password'
            placeholder='enter your password'
            className='form-input'
            value={userFormData.password}
            onChange={handleInputChange}
          />
          <button type='submit' className='submit-btn'>
            {' '}
            Login Here
          </button>
        </form>
      </div>
      {/* if the sign up has an error it will display this instead */}
      {error && (
        <div className='error-container'>
          <i className='lni lni-sad error-icon'></i>
          <p className='error-title'>
            Oops, the login didn't work, might want to try it again.
          </p>
        </div>
      )}
    </>
  );
};

export default LoginForm;
