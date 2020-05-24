import React from "react";
import Header from "./components/layout/Header";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import IndexCreateForm from "./components/pages/CreateQuizForm/IndexCreateForm";
import IndexSolveForm from "./components/pages/SolveQuizForm/IndexSolveForm";
import Result from "./components/pages/SolveQuizForm/Result";

const App = () => (
  <Router>
    <Header />

    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
    <Switch>
      <Route path="/quiz/:id" component={IndexSolveForm} />
    </Switch>

    <Switch>
      <Route exact path="/quiz">
        <IndexCreateForm />
      </Route>
    </Switch>

    <Switch>
      <Route exact path="/result/:id" component={Result} />
    </Switch>

    <Switch>
      <Route path="/about">
        <About />
      </Route>
    </Switch>
  </Router>
);

export default App;
