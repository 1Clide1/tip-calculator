// imports
import React from "react";
// import use state
// and importing create context from react
import { useState, createContext, useEffect } from "react";

// import react router dom
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
// import graphql
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// import pages
// home is where the tip calculator is
import Home from "./pages/Home";
// sign up and login pages
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
// profile page
import ProfilePage from "./pages/ProfilePage";
// import components
import Navbar from "./components/navbar/Navbar";
// import local storage util to save color theme
import { saveColorTheme } from "./utils/localStorage";
// import css for the main app
import "./app.css";

// creating the theme selector context
// starting the context as null to use it for another purpose later
// exporting that way I can use this context on another part of the app
export const themeSelector = createContext(null);

function App() {
  // creates the link for gql
  const httpLink = createHttpLink({
    // not sure what i did to mess this up but for local host it is this below just comment the production one out to see graphql stuff
    // uri: "http://localhost:3001/graphql",
    uri: "/graphql",
  });

  const authLink = setContext((_, { headers }) => {
    const token = localStorage.getItem("id_token");
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      },
    };
  });

  const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });

  // Section for the theme switcher code
  // state for the theme
  let [theme, setTheme] = useState("og");

  // creating a theme switcher function
  const SwitchTheme = () => {
    setTheme(theme === "og" ? (theme = "dark") : (theme = "og"));
    saveColorTheme(theme);
    console.log("color theme saved", `theme is ${theme}`);
  };

  // using use effect to set the saved theme from local storage and setting that to be the theme on the state called theme if that state changed
  useEffect(() => {
    //this represents the saved theme that will be display through the id tag in the html
    const savedTheme = JSON.parse(localStorage.getItem("color-theme", theme));
    // creating an if statement because savedTheme var gets saved before I click the switch theme button
    if (savedTheme !== null) {
      setTheme(savedTheme);
    }
  }, [theme]);

  return (
    // *note for future me* need to also deconstruct whatever you are trying to export through context api. so in this case a variable and a function that I can use where ever on the website
    <themeSelector.Provider value={{ theme, SwitchTheme }}>
      {/* using the theme var instead of using the localStorage var i made because it streamlines it and local storage is slow and causes bugs */}
      <div id={theme}>
        <ApolloProvider client={client}>
          <Router>
            <header className="nav-header">
              <Navbar />
            </header>
            <Switch>
              <Route exact path="/" component={Home} />
              {/* signup form */}
              <Route exact path="/signup" component={SignupForm} />
              {/* login form */}
              <Route exact path="/login" component={LoginForm} />
              {/* profile page */}
              <Route exact path="/profile" component={ProfilePage} />
              <Route
                render={() => <h1 className="display-2">Wrong page!</h1>}
              />
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    </themeSelector.Provider>
  );
}

export default App;
