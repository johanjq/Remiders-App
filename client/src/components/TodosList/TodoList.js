import React, { Component } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import "./styles.css";

export class TodoList extends Component {
  state = {
    todos: [],
    completed: false
  };

  async getNotes() {
    const res = await axios.get("http://localhost:4000/api/todos");
    this.setState({
      todos: res.data
    });
  }

  componentDidMount() {
    this.getNotes();
  }

  deleteNote = async id => {
    await axios.delete("http://localhost:4000/api/todos/" + id);
    this.getNotes();
  };
  handleChange = async id => {
    // Update state so that the item with the given id flips `completed` from false to true (or vise versa)
    // This logic was a bit hard to implement btw. Handling a single change and then sending the http request
    //  to the db and updating the collection
    this.setState(prevState => {
      const updatedTodos = prevState.todos.map(todo => {
        if (todo._id === id) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      });
      const newValue = updatedTodos
        .filter(item => item._id === id)
        .map(item => item.completed);
      const [updatedValue] = newValue;
      const newTodo = {
        completed: updatedValue
      };
      //   I cannot use await outside of an async function so I declared
      //  so I declared a quick function with async so I can use await :)
      (async () => {
        await axios.patch("http://localhost:4000/api/todos/" + id, newTodo);
      })();
      return {
        todos: updatedTodos
      };
    });
  };

  render() {
    const { todos } = this.state;
    const todosCounter = todos.map(({ completed }) => completed);
    const isCompleted = todos.filter(({ completed }) => completed === true);
    const completedStyle = {
      fontStyle: "italic",
      color: "#cdcdcd",
      textDecoration: "line-through"
    };
    return (
      <div>
        {todos.length ? (
          <h1 style={{ margin: "2rem" }}>
            Completed: {isCompleted.length} of {todosCounter.length}
          </h1>
        ) : null}
        <div className="row">
          {todos.map(
            ({ description, _id, title, author, dueDate, completed }) => (
              <div className="col-md-4 p-2" key={_id}>
                <div className="card">
                  <div className="card-header d-flex justify-content-between">
                    <h4 style={{ display: "inline-block" }}>{title}</h4>
                    <button
                      className={
                        completed
                          ? "btn btn-success btn-sm"
                          : "btn btn-secondary btn-sm"
                      }
                      onClick={() => this.handleChange(_id, completed)}
                    >
                      {completed ? "Done" : "Incomplete"}
                    </button>
                  </div>
                  <div className="card-body">
                    <p style={completed ? completedStyle : null}>
                      {description}
                    </p>
                    <p style={completed ? completedStyle : null}>{author}</p>
                    <p style={completed ? completedStyle : null}>
                      {format(dueDate)}
                    </p>
                  </div>
                  <div className="card-footer d-flex justify-content-between">
                    <button
                      className="btn btn-danger"
                      onClick={() => this.deleteNote(_id)}
                    >
                      Delete
                    </button>
                    <Link className="btn btn-info" to={"/edit/" + _id}>
                      Edit
                    </Link>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}
