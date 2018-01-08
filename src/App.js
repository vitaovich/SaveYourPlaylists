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
          https://www.youtube.com/watch?v=3X3xtRNb20s&list=PLTfojAMc9zWMEzcHXUWbn_Rf4Ebplakub
          https://www.youtube.com/watch?v=APV5eGXMBhU&list=PLTfojAMc9zWP37o1d6kxuVd8oJn4ZMAzU
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
    this.setState({url: url});
  };
}

export default App;
