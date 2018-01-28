import React, { Component } from 'react';

/* global gapi */

const API_KEY = 'AIzaSyADQZkj1blmWY2cTdbG2O4CR4zDfkch4K4';
const DISCOVERY_DOCS =  ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';

class GoogleSignIn extends Component {

  constructor(props) {
    super(props);
    this.state = {gapiReady: false};

    this.onSignIn = this.onSignIn.bind(this);
    this.signOut = this.signOut.bind(this);
  }

  loadYoutubeApi() {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/client.js";

    script.onload = () => {
      gapi.signin2.render('g-signin2', {
        scope: SCOPES,
        discoveryDocs : DISCOVERY_DOCS,
        onsuccess: this.onSignIn
      });

      gapi.load('client', () => {
        gapi.client.setApiKey(API_KEY);
        gapi.client.load('youtube', 'v3', () => {
          this.setState({ gapiReady: true });
        });
      });
    };
    document.body.appendChild(script);
  }

  componentDidMount() {
    this.loadYoutubeApi();
  }

  onSignIn(googleUser) {
    let profile = googleUser.getBasicProfile();
    console.log('token');
    console.log(googleUser.getAuthResponse().id_token);
    this.props.onHandleSignIn(profile);
  }

  signOut() {
    console.log('trying to sign out');
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
  }


  render() {
      return (
        <div>
          <div id="g-signin2"></div>
          <a href="" onClick={this.signOut}>Sign out</a>
        </div>
      );
  }
}

export default GoogleSignIn;
