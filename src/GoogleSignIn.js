import React, { Component } from 'react';

const CLIENT_ID = '379911385768-enee68tbs2v1fg4l2g7rr9hdh03shfc1.apps.googleusercontent.com'
const DISCOVERY_DOCS =  ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

/* global gapi */

class GoogleSignIn extends Component {
  constructor(props) {
    super(props);

    this.loadGapi = this.loadGapi.bind(this);
    this.initClient = this.initClient.bind(this);
    this.updateSignInStatus = this.updateSignInStatus.bind(this);
    this.handleAuthClick = this.handleAuthClick.bind(this);
    this.handleSignOut = this.handleSignOut.bind(this);
    this.handleInit = this.handleInit.bind(this);
  }

  loadGapi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";

    script.onload = () => {
      gapi.load('client:auth2', this.initClient);
    };
    document.body.appendChild(script);
  }

  initClient() {
    gapi.client.init({
      discoveryDocs: DISCOVERY_DOCS,
      clientId: CLIENT_ID,
      scope: SCOPES
    }).then(this.handleInit);
  }

  handleInit() {
    gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSignInStatus);
    this.updateSignInStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
  }

  updateSignInStatus(isSignedIn) {
    const signInStatus = {isSignedIn: isSignedIn, handleSignOut: this.handleSignOut}
    this.props.onHandleSignIn(signInStatus);
  }

  handleAuthClick() {
    gapi.auth2.getAuthInstance().signIn();
  }

  handleSignOut() {
    gapi.auth2.getAuthInstance().signOut();
  }

  componentDidMount() {
    this.loadGapi();
  }

  render() {
    return <button id="authorize-button" onClick={this.handleAuthClick}>Authorize</button>
  }
}

export default GoogleSignIn;
