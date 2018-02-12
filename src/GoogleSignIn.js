import React, { Component } from 'react';
import './GoogleSignIn.css';
import { postUser } from './ApiUtils';

const CLIENT_ID = '379911385768-enee68tbs2v1fg4l2g7rr9hdh03shfc1.apps.googleusercontent.com'
const DISCOVERY_DOCS =  ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const GAPI_INITIALIZATION = {discoveryDocs: DISCOVERY_DOCS, clientId: CLIENT_ID, scope: SCOPES};

/* global gapi */

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {userId: '', verified: false};

    this.loadGapi = this.loadGapi.bind(this);
    this.initClient = this.initClient.bind(this);
    this.handleSignInStatus = this.handleSignInStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleInit = this.handleInit.bind(this);
    this.handleUserSession = this.handleUserSession.bind(this);
  }

  componentDidMount() {
    //always loads even when already loaded
    if(window.gapiready) {
      this.loadGapi()
    } else {
      window.addEventListener('google-loaded', this.loadGapi);
    }
  }

  loadGapi() {
    console.log('load client auth2');
    gapi.load('client:auth2', this.initClient);
  }

  initClient() {
    gapi.client.init(GAPI_INITIALIZATION).then(this.handleInit);
  }

  handleInit() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.handleSignInStatus);
    this.handleSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  handleSignInStatus(isSignedIn) {
    if(isSignedIn) {
      const user = gapi.auth2.getAuthInstance().currentUser.get();
      const id_token = user.getAuthResponse().id_token;
      postUser(id_token).then(this.handleUserSession);
    } else {
      this.handleUserSession({user: null})
    }
  }

  handleUserSession(data) {
    let authenticated = data.user ? true : false;
    const status = {isAuthenticated: authenticated, user: data.user, handleSignOut: this.handleSignOut};
    this.props.onHandleSignIn(status);
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignOut() {
    gapi.auth2.getAuthInstance().signOut();
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
