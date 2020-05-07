import React, {Component} from  "react";

export default class Signup extends Component {
  render() {
    return (
      <>
        <h3>Sign up</h3>
        <form onSubmit>
          <label>Username: </label>
          <input
            onChange
            type="text"
            name="username"
            placeholder="zelda12"
            value=""
            required
          />
          <br />
          <label>Password: </label>
          <input onChange type="text" name="password" value="" required />
          <br />
          <input type="submit" value="Sign up" />
        </form>
      </>
    );
  }
}
