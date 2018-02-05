import React, { Component } from 'react';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const user = this.props.user;
    const imgUrl = user.picture;
    const name = user.name;
    const email = user.email;
      return (
        <div>
          <img src={imgUrl} alt="Profile Pic"/>
          <p>{name}</p>
          <p>{email}</p>
        </div>
      );
  }
}

export default Profile;
