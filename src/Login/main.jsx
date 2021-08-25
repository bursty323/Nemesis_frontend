import React, { Component } from "react";

class Main extends Component {
  state = {};
  render() {
    return (
      <div>
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link active" aria-current="page" href="/main/form">
              Register User
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="/main/display">
              Display User
            </a>
          </li>
        </ul>
      </div>
    );
  }
}

export default Main;
