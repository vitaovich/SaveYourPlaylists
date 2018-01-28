import React, { Component } from 'react';

class Profile extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    const imgUrl = this.props.user.imgUrl;
    const name = this.props.user.name;
    const email = this.props.user.email;
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
