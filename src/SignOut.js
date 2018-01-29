import React, { Component } from 'react';

class SignOut extends Component {
  constructor(props) {
    super(props);

    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  handleSignOutClick() {
    this.props.onSignOut();
  }

  render() {
    return (
      <button onClick={this.handleSignOutClick}>Sign Out</button>
    );
  }
}

export default SignOut;
