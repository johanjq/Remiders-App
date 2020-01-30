import React, { Component } from "react";
import "./styles.css";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

// Componet that renders the form to save the Todo and I'm using bootstrap
// To style all the components and be consistent in the whole project

export class CreateTodo extends Component {
  state = {
    users: [],
    userSelected: "",
    dueDate: new Date(),
    title: "",
    description: "",
    editing: false,
    _id: ""
  };

  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({
      users: res.data.map(({ username }) => username),
      userSelected: res.data[0].username
    });
  };

  async componentDidMount() {
    this.getUsers();
    if (this.props.match.params.id) {
      const res = await axios.get(
        "http://localhost:4000/api/todos/" + this.props.match.params.id
      );
      const { title, description, dueDate, author: userSelected } = res.data;
      this.setState({
        title,
        description,
        dueDate: new Date(dueDate),
        userSelected,
        editing: true,
        _id: this.props.match.params.id
      });
    }
  }

  onSubmit = async e => {
    const err = this.validateForm();
    const { editing } = this.state;
    e.preventDefault();
    if (!err) {
      const { title, description, dueDate, userSelected, _id } = this.state;
      const newTodo = {
        title,
        description,
        dueDate,
        author: userSelected
      };
      if (editing) {
        await axios.put("http://localhost:4000/api/todos/" + _id, newTodo);
      } else {
        await axios.post("http://localhost:4000/api/todos", newTodo);
      }

      window.location.href = "/";
    }
  };

  onInputChange = e => {
    const { value, name } = e.target;
    this.setState({
      [name]: value
    });
  };

  onChangeDate = dueDate => {
    this.setState({
      dueDate
    });
  };

  validateForm = () => {
    const { title, description } = this.state;
    let isError = false;
    const errors = {
      titleError: "",
      descriptionError: ""
    };
    if (!title) {
      isError = true;
      errors.titleError = "Provide a title";
    }
    if (!description) {
      isError = true;
      errors.descriptionError = "Provide a description";
    }
    this.setState({
      ...this.state,
      ...errors
    });
    return isError;
  };

  render() {
    const {
      users,
      dueDate,
      titleError,
      descriptionError,
      userSelected,
      title,
      description
    } = this.state;
    return (
      <div className="col-md-6 offset-md-3">
        <div className="card card-body">
          <h4>Create Todo</h4>
          {/* Select username */}
          <div className="form-group">
            <select
              className="form-control"
              name="userSelected"
              onChange={this.onInputChange}
              value={userSelected}
            >
              {users.map(user => (
                <option key={user} value={user}>
                  {user}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Title"
              name="title"
              required
              onChange={this.onInputChange}
              value={title}
            />
            {titleError && (
              <small style={{ color: "red" }}>Please input a title</small>
            )}
          </div>
          <div className="form-group">
            <textarea
              name="description"
              className="form-control"
              placeholder="Description"
              required
              onChange={this.onInputChange}
              value={description}
            ></textarea>
            {descriptionError && (
              <small style={{ color: "red" }}>Please input a description</small>
            )}
          </div>
          <div className="form-group">
            <DatePicker
              className="form-control"
              selected={dueDate}
              onChange={this.onChangeDate}
            />
          </div>
          <form onSubmit={this.onSubmit}>
            <button type="submit" className="btn btn-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    );
  }
}
