// imports
import React from "react";
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
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import ProfilePage from "./pages/ProfilePage";
// import components
import Navbar from "./components/navbar/Navbar";
// import css for the main app
import "./app.css";

function App() {
  // creates the link for gql
  const httpLink = createHttpLink({
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
  // have to wrap everything with the apollo provider to get graphql working
  return (
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
          <Route render={() => <h1 className="display-2">Wrong page!</h1>} />
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
