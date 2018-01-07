import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import GoogleSignIn from './GoogleSignIn';
import SearchBar from './SearchBar';
import SearchResults from './SearchResults';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: ''};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
  }
  render() {
    const url = this.state.url

    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started <code>src/App.js</code> and save to reload.
        </p>
        <GoogleSignIn />
        <SearchBar
          onHandleSubmit={this.handleOnSubmit}
        />
        <SearchResults url={url}/>
      </div>
    );
  }

  handleOnSubmit(url) {
    console.log('setting url state to: ' + url);
    this.setState({url: url});
  }
}

export default App;
