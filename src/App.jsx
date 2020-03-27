import React from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import StoryBook from "./containers/StoryBook";

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/storybook">
          <StoryBook />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
