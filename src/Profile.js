import React, { Component } from 'react';
import { Label } from 'semantic-ui-react'

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
        <Label as='a' image size='massive' color='black'>
          <img src={imgUrl} />
          {name}
        </Label>
      </div>
    );
  }
}

export default Profile;
