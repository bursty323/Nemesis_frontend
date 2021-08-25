import "bootstrap/dist/css/bootstrap.css";
import React, { Component } from "react";
import "./App.css";
import Forms from "./Login/login";
import { Route, Switch } from "react-router-dom";
import Main from "./Login/main";
import jwtdecode from "jwt-decode";
import Register from "./Login/register";
import Display from "./Login/displayuser";

class App extends Component {
  state = {};
  componentDidMount() {
    try {
      const jwt = localStorage.getItem("token");
      const user = jwtdecode(jwt);
      // console.log(user);
      this.setState({ user });
    } catch (ex) {}
  }
  render() {
    return (
      <div>
        {this.state.user && <Main />}
        <Switch>
          <Route path="/main/display" component={Display} />
          <Route path="/main/form" component={Register} />
          <Route path="/" component={Forms} />
        </Switch>
      </div>
    );
  }
}

export default App;
