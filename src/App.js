import React, { Component } from 'react';
import GoogleSignIn from './GoogleSignIn';
import SearchBar from './SearchBar';
import SearchResultTable from './SearchResultTable';
import Profile from './Profile';
import SignOut from './SignOut';
import YoutubePlaylists from './YoutubePlaylists';
import SidebarLeftUncover from './SidebarLeftUncover';
import {Button} from 'semantic-ui-react';
import PlaylistContents from './PlaylistContents'
import TopMenu from './TopMenu'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {url: '', sidebarVisible: true, signInStatus: {isSignedIn: false, user: {sub:'',email:'',name:'',given_name:'',picture:''}}};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnSignIn = this.handleOnSignIn.bind(this);
    this.handlePlaylistIdSubmit = this.handlePlaylistIdSubmit.bind(this);
    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);
  }

  render() {
    const url = this.state.url;
    const isSignedIn = this.state.signInStatus.isSignedIn;
    const user = this.state.signInStatus.user;
    const handleSignOut = this.state.signInStatus.handleSignOut;
    const sidebarVisible = this.state.sidebarVisible;
    let login = null;
    if(isSignedIn) {
      login = <Profile user={user} />
    } else {
      login = <GoogleSignIn
                  onHandleSignIn={this.handleOnSignIn}
                />
    }

    return (
      <div>
        <TopMenu user={login}
                onSignOut={handleSignOut}
                toggleVisibility={this.handleToggleSideMenu}
                searchBar={<SearchBar onHandleSubmit={this.handleOnSubmit}/>}
              />
        <SidebarLeftUncover visible={sidebarVisible}
                            options={isSignedIn && <YoutubePlaylists onHandlePlaylistSelect={this.handlePlaylistIdSubmit}/>}
                            >
          <SearchResultTable url={url}/>
        </SidebarLeftUncover>


      </div>
    );
  }

  handleToggleSideMenu() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  handleOnSubmit(url) {
    this.setState({url: url});
  };

  handlePlaylistIdSubmit(id) {
    this.handleOnSubmit('list=' + id);
  }

  handleOnSignIn(signInStatus) {
    this.setState({signInStatus: signInStatus});
  }
}

export default App;
