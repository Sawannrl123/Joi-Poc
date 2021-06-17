import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { Home, Login, About } from "./pages";
import { PrivateRoute, ProtectedRoute, PublicRoute } from "react-secure-route";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("isLoggedIn")
  );

  const renderHeader = () => {
    if (isLoggedIn) {
      return (
        <div>
          <Link to="/">Home</Link>
          <Link to="/about">About</Link>
          <button
            onClick={() => {
              localStorage.removeItem("isLoggedIn");
              setIsLoggedIn(false);
            }}
          >
            Logout
          </button>
        </div>
      );
    }
    return (
      <div>
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <button
          onClick={() => {
            localStorage.setItem("isLoggedIn", true);
            setIsLoggedIn(true);
          }}
        >
          Login
        </button>
      </div>
    );
  };

  return (
    <Router>
      {renderHeader()}
      <Switch>
        <PrivateRoute
          component={Home}
          exact
          isAuthenticated={isLoggedIn}
          redirect="/login"
          path="/"
        />
        <ProtectedRoute
          component={Login}
          restricted={isLoggedIn}
          exact
          redirect="/"
          path="/login"
        />
        <PublicRoute component={About} path="/about" exact />
      </Switch>
    </Router>
  );
};

export default App;
