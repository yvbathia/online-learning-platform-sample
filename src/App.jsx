import React, { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./containers/Home";
import StoryBook from "./containers/StoryBook";
import ActivityContext from "./ActivityContext";

function App() {
  const [activity, setActivity] = useState([
    { "Hit Url": "/", time: Date.now() }
  ]);

  const addActivity = newActivity => {
    setActivity([...activity, newActivity]);
  };
  return (
    <Router>
      <Switch>
        <ActivityContext.Provider value={{ activity, addActivity }}>
          <Route path="/storybook">
            <StoryBook />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </ActivityContext.Provider>
      </Switch>
    </Router>
  );
}

export default App;
