import React, { Component } from "react";
import "./styles.css";
import axios from "axios";

export class CreateUser extends Component {
  state = {
    users: [],
    username: ""
  };
  getUsers = async () => {
    const res = await axios.get("http://localhost:4000/api/users");
    this.setState({ users: res.data });
  };

  async componentDidMount() {
    this.getUsers();
  }

  onChangeUsername = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };

  deleteUser = async id => {
    await axios.delete("http://localhost:4000/api/users/" + id);
    this.getUsers();
  };

  onSubmit = async e => {
    e.preventDefault();
    const { username } = this.state;
    await axios.post("http://localhost:4000/api/users", {
      username
    });
    this.setState({ username: "" });
    this.getUsers();
  };

  render() {
    const { users, username } = this.state;
    return (
      <div className="row">
        <div className="col-md-4">
          <div className="card card-body">
            <h3>Create New User</h3>
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <input
                  type="text"
                  className="form-control"
                  onChange={this.onChangeUsername}
                  name="username"
                  value={username}
                />
              </div>
              <button type="submit" className="btn btn-primary">
                Save
              </button>
            </form>
          </div>
        </div>
        <div className="col-md-8">
          <ul className="list-group">
            {users.map(({ username, _id }) => (
              <li
                onDoubleClick={() => this.deleteUser(_id)}
                className="list-group-item list-group-item-action"
                key={_id}
              >
                {username}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}
