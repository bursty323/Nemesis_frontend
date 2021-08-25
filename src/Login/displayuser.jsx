import React, { Component } from "react";
import { getuser, deleteuser } from "./register_service";

class Display extends Component {
  state = {
    data: ["username", "mobile_no", "email", "address"],
    // users: {},
  };
  async componentDidMount() {
    const { data } = await getuser();
    this.setState({ users: data });
    // consol
    // console.log("Outside");
    // this.state.users.map((user) => console.log(user["username"]));
  }
  onDelete = async (id) => {
    const original = this.state.users;
    const users = original.filter((x) => x._id !== id);
    this.setState({ users });
    try {
      await deleteuser(id);
    } catch (x) {
      console.log(x);
      this.setState({ users: original });
    }
  };
  render() {
    return (
      <div>
        {this.state.users && (
          <h1 className="m-2">
            There are {this.state.users.length} Users in the Database
          </h1>
        )}
        {!this.state.users && <h1>No User Registered</h1>}
        <table className="table table-hover m-2">
          <thead>
            <tr>
              {/* {console.log("inside")} */}
              <th>Username</th>
              <th>Mobile Number</th>
              <th>Email</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          {this.state.users && (
            <tbody>
              {this.state.users.map(
                (user) => (
                  <tr key={user._id}>
                    <td>{user.username}</td>
                    <td>{user.mobile_no}</td>
                    <td>{user.email}</td>
                    <td>{user.address}</td>
                    <button
                      onClick={() => this.onDelete(user._id)}
                      className="btn btn-secondary btn-danger customcolor"
                    >
                      Delete
                    </button>
                  </tr>
                )
                //   console.log(user)
              )}
            </tbody>
          )}
        </table>
      </div>

      //   <h1>welcome</h1>
    );
  }
}

export default Display;
