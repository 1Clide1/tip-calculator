// imports
// react
import React, { useState, createContext, useEffect } from 'react';

// react router dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// graph ql
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from '@apollo/client';

import { setContext } from '@apollo/client/link/context';

// uitls
import { saveColorTheme } from './utils/localStorage'; // save the color theme to local storage

// components
import HeroSection from './components/hero/HeroSection';

// pages

import Homepage from './pages/Homepage';

// styling
import './styles/partials/_app.scss';

// using createContext to be able to save light or dark mode throughout the whole site
export const themeSelector = createContext(null); // setting null to repurpose later

function App() {
  // creating a link for graph ql
  const httpLink = createHttpLink({
    // uri: "http://localhost:3001/graphql", //previous build i needed to have a uri for my local host, adding just in case
    uri: '/graphql',
  });

  // making sure the link is valid from an authorized user
  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem('id_token');
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    };
  });

  // making a new client for gql
  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // creating a theme for dark and light mode
  let [theme, setTheme] = useState('light');

  // function for switching themes
  const SwitchTheme = () => {
    setTheme(theme === 'light' ? (theme = 'dark') : (theme = 'light')); // if theme is on light mode switch it to dark; if it's dark switch it to light
    saveColorTheme(theme); // save the theme color, function is from utils

    // to test what theme was saved

    // console.log('color theme saved', `theme is ${theme}`);
  };

  // anytime the theme is changed, save that to local storage
  useEffect(() => {
    const savedTheme = JSON.parse(localStorage.getItem('color-theme', theme));
    if (savedTheme !== null) {
      setTheme(savedTheme);
    }
  }, [theme]);

  return (
    // i have to deconstruct the values because i need to use them through
    <themeSelector.Provider value={{ theme, SwitchTheme }}>
      <div id={theme}>
        <HeroSection />
        <ApolloProvider client={client}>
          <Router>
            <HeroSection />
            <Routes>
              <Route exact path='/' component={Homepage} />
            </Routes>
          </Router>
        </ApolloProvider>
      </div>
    </themeSelector.Provider>
  );
}

export default App;
