import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import "./App.css";
import { CreateTodo } from "./components/CreateTodo";
import { CreateUser } from "./components/CreateUser";
import { Navigation } from "./components/Navigation";
import { TodoList } from "./components/TodosList";

function App() {
  return (
    <Router>
      <Navigation />
      <div className="container p-4">
        <Route path="/" exact component={TodoList} />
        <Route path="/edit/:id" component={CreateTodo} />
        <Route path="/create" component={CreateTodo} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
