import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSignIn from './GoogleSignIn';
import SearchBar from './SearchBar';
import SearchResultTable from './SearchResultTable';
import Profile from './Profile';
import SignOut from './SignOut';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: '', signInStatus: {isSignedIn: false}};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnSignIn = this.handleOnSignIn.bind(this);
  }

  render() {
    const url = this.state.url;
    const user = this.state.user;
    const isSignedIn = this.state.signInStatus.isSignedIn;
    const handleSignOut = this.state.signInStatus.handleSignOut;
    let login = null;
    if(isSignedIn) {
      login = <SignOut
                  onSignOut={handleSignOut}
                />
    } else {
      login = <GoogleSignIn
                  onHandleSignIn={this.handleOnSignIn}
                />
    }

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Breanna is super cute</h1>
        </header>
        {login}
        <SearchBar
          onHandleSubmit={this.handleOnSubmit}
        />
        <SearchResultTable url={url}/>
      </div>
    );
  }

  handleOnSubmit(url) {
    this.setState({url: url});
  };

  handleOnSignIn(signInStatus) {
    this.setState({signInStatus: signInStatus});
  }
}

export default App;
