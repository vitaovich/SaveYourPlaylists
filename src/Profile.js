import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'

class Profile extends Component {
  render() {
    const user = this.props.user;
    const imgUrl = user.picture;
    const name = user.name;
    return (
      <div>
        <Label as='a' image size='massive' color='black'>
          <img src={imgUrl} alt='No Profile Pic'/>
          {name}
        </Label>
      </div>
    );
  }
}

export default Profile;
