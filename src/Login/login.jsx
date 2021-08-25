import React, { Component } from "react";
import { signin } from "./login_service";

class Forms extends Component {
  state = {
    data: { username: "", password: "" },
    errors: {},
  };

  handlechange = (e) => {
    const data = { ...this.state.data };
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data });
  };
  handlesubmit = async (e) => {
    e.preventDefault(); //spent 2.5 hr*****
    try {
      //token receive.
      const resp = await signin(this.state.data);
      localStorage.setItem("token", resp.data);
      window.location = "/main/form";
    } catch (ex) {
      // console.log(ex.response);
      if (ex.response && ex.response.status === 400) {
        const errors = { username: "Invalid Email or Password!" };
        this.setState({ errors });
        // console.log("error found");
      }
    }
  };
  render() {
    return (
      <form className="p-5" onSubmit={this.handlesubmit}>
        <h1 className="marg">Login Form</h1>
        <div className="form-group marg">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="Email"
            className="form-control"
            name="username"
            value={this.state.data.username}
            onChange={this.handlechange}
          />
          {this.state.errors["username"] && (
            <div className="alert alert-danger">
              {this.state.errors["username"]}
            </div>
          )}
        </div>
        <div className="form-group marg">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            className="form-control"
            name="password"
            value={this.state.data.password}
            onChange={this.handlechange}
          />
        </div>
        <button className="btn btn-primary marg">Sign In</button>
      </form>
    );
  }
}

export default Forms;
