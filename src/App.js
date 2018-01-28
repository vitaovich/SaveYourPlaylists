import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSignIn from './GoogleSignIn';
import SearchBar from './SearchBar';
import SearchResultTable from './SearchResultTable';
import Profile from './Profile';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: '', user: {imgUrl: '', name: '', email: ''}};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnSignIn = this.handleOnSignIn.bind(this);
  }
  render() {
    const url = this.state.url
    const user = this.state.user

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Breanna is super cute</h1>
        </header>
        <Profile user={user} />
        <GoogleSignIn
          onHandleSignIn={this.handleOnSignIn}
        />
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

  handleOnSignIn(user) {
    this.setState({user: {imgUrl: user.getImageUrl(), name: user.getName(), email: user.getEmail()}});
    console.log('ID: ' + user.getId()); // Do not send to your backend! Use an ID token instead.
    console.log('Name: ' + user.getName());
    console.log('Image URL: ' + user.getImageUrl());
    console.log('Email: ' + user.getEmail()); // This is null if the 'email' scope is not present.
  };
}

export default App;
