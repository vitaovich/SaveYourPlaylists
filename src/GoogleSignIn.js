import React, { Component } from 'react';
import './GoogleSignIn.css';
import { postUser, getUser } from './ApiUtils';
import { getAuth2 } from './GoogleApiUtils';

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.handleSignInStatus = this.handleSignInStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
  }

  componentDidMount() {
    getAuth2().then(auth2 => {
      auth2.getAuthInstance().isSignedIn.listen(this.handleSignInStatus);
      this.handleSignInStatus(auth2.getAuthInstance().isSignedIn.get())
    })
  }

  handleSignInStatus(isSignedIn) {
    if(isSignedIn) {
      getAuth2().then(auth2 => {
        const user = auth2.getAuthInstance().currentUser.get();
        const id_token = user.getAuthResponse().id_token;
        postUser(id_token).then(status => {
          console.log('Post user status');
          console.log(status);
          let session = {isAuthenticated: true, handleSignOut: this.handleSignOut};
          if(!status.success) {
            getUser(status.userId).then(res => {
              console.log('Got user');
              console.log(res);
              session.user = res;
              this.props.onHandleSignIn(session);
            });
          } else {
              session.user = status.user;
              this.props.onHandleSignIn(session);
          }
        }, rej => {this.props.onHandleSignIn({isAuthenticated: false})});
      });
    } else {
      this.props.onHandleSignIn({isAuthenticated: false})
    }
  }

  handleAuthClick() {
    getAuth2().then(auth2 => auth2.getAuthInstance().signIn());
  }

  handleSignOut() {
    getAuth2().then(auth2 => auth2.getAuthInstance().signOut());
  }

  render() {
    return (
        <div id="gSignIn" className="customGPlusSignIn" onClick={this.handleAuthClick}>
          <span className="icon"></span>
          <span className="buttonText">Log in with Google</span>
        </div>
    );
  }
}

export default GoogleSignIn;
