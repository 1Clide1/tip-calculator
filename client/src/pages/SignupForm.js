import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { ADD_USER } from "../utils/mutations";
// import css
import "./signup.css";

const SignupForm = () => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  // user inputs are set to the state
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  // add user mutation
  const [addUser, { error }] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await addUser({ variables: { ...userFormData } });
      Auth.login(data.addUser.token);
      console.log(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <div className="form-container">
        <label title="Sign-Up Form" className="form-header">
          Sign-Up
        </label>
        <form onSubmit={handleFormSubmit}>
          <label
            htmlFor="username"
            title="Your Username"
            className="form-label"
          >
            Username:
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="enter your username"
            className="form-input"
            value={userFormData.username}
            onChange={handleInputChange}
          />
        </form>
      </div>
      {/* if the sign up has an error it will display this instead */}
      {error && (
        <div className="error-container">
          <i class="lni lni-sad"></i>
          <p className="error-title">Oops, sign-up didn't</p>
        </div>
      )}
    </>
  );
};

export default SignupForm;
