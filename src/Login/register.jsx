import React, { Component } from "react";
import Joi, { errors } from "joi-browser";
// import { BrowserRouter } from "react-router-dom";
import { registeruser } from "./register_service";

class Register extends Component {
  state = {
    data: { username: "", mobile_no: "", email: "", address: "" },
    errors: {},
  };

  schema = {
    username: Joi.string().required().label("Username"),
    mobile_no: Joi.string().max(10).min(10).required().label("Mobile No."),
    email: Joi.string().required().email().label("Email"),
    address: Joi.string().required().label("Address"),
  };
  validate = () => {
    const result = Joi.validate(this.state.data, this.schema, {
      abortEarly: false,
    });
    if (!result.error) return null;
    const errors = {};
    for (let i of result.error.details) {
      //JOI generates error Messages
      errors[i.path[0]] = i.message;
    }
    return errors;
  };
  validateproperty = (input) => {
    // console.log(input);
    const obj = { [input.name]: input.value }; //custom state
    const schema = { [input.name]: this.schema[input.name] }; //custom schema
    const { error } = Joi.validate(obj, schema); // we are not aborting early & showing all the errors at once deliberately as one error repaired another will have 0th index
    return error ? error.details[0].message : null;
  };
  handlechange = (e) => {
    const data = { ...this.state.data };
    const errors = { ...this.state.errors };
    const errormessage = this.validateproperty(e.currentTarget);
    if (errormessage) errors[e.currentTarget.name] = errormessage;
    else delete errors[e.currentTarget.name];
    data[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ data, errors });
  };

  handlesubmit = async (e) => {
    //save data in db...
    e.preventDefault();
    const errors = this.validate();
    if (errors) {
      console.log(errors);
      this.setState({ errors: errors || {} });
      return;
    }
    try {
      const user = await registeruser(this.state.data);
      this.props.history.push("/main/display");
    } catch (ex) {
      if (ex.response && ex.response.status === 400) {
        const errors = { ...this.state.errors };
        errors.username = ex.response.data;
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div style={{ margin: "5rem" }}>
        <h1 className="marg">Register User</h1>
        <form onSubmit={this.handlesubmit}>
          <div className="form-group marg">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
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
            <label htmlFor="mobile no">Mobile No.</label>
            <input
              type="text"
              id="mobile no"
              className="form-control"
              name="mobile_no"
              value={this.state.data.mobile_no}
              onChange={this.handlechange}
            />
            {this.state.errors["mobile_no"] && (
              <div className="alert alert-danger">
                {this.state.errors["mobile_no"]}
              </div>
            )}
          </div>
          <div className="form-group marg">
            <label htmlFor="Email">Email</label>
            <input
              type="email"
              id="Email"
              className="form-control"
              name="email"
              value={this.state.data.email}
              onChange={this.handlechange}
            />
            {this.state.errors["email"] && (
              <div className="alert alert-danger">
                {this.state.errors["email"]}
              </div>
            )}
          </div>
          <div className="form-group marg">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              id="address"
              className="form-control"
              name="address"
              value={this.state.data.address}
              onChange={this.handlechange}
            />
            {this.state.errors["address"] && (
              <div className="alert alert-danger">
                {this.state.errors["address"]}
              </div>
            )}
          </div>
          <button className="btn btn-primary marg">Sign In</button>
        </form>
      </div>
    );
  }
}

export default Register;
