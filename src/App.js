import React, { Component } from 'react';
import GoogleSignIn from './GoogleSignIn';
import Profile from './Profile';
import YoutubePlaylists from './YoutubePlaylists';
import SidebarLeftUncover from './SidebarLeftUncover';
import TopMenu from './TopMenu';
import PlaylistContents from './PlaylistContents';
import { requestVideoPlaylist } from './GoogleApiUtils';
import { putUser } from './ApiUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {sidebarVisible: true, signInStatus: {isSignedIn: false}};

    this.handleOnSubmit = this.handleOnSubmit.bind(this);
    this.handleOnSignIn = this.handleOnSignIn.bind(this);
    this.handlePlaylistSelect = this.handlePlaylistSelect.bind(this);
    this.handleToggleSideMenu = this.handleToggleSideMenu.bind(this);
    this.handleUserPlaylistsUpdate = this.handleUserPlaylistsUpdate.bind(this);
  }

  render() {
    const isSignedIn = this.state.signInStatus.isSignedIn;
    const user = this.state.signInStatus.user;
    const handleSignOut = this.state.signInStatus.handleSignOut;
    const sidebarVisible = this.state.sidebarVisible;
    const selectedPlaylist = this.state.selectedPlaylist;
    const contents = this.state.contents;
    let login = <GoogleSignIn onHandleSignIn={this.handleOnSignIn} />;
    if(isSignedIn)
      login = <Profile user={user} />

    return (
      <div>
        <TopMenu
          user={login}
          onSignOut={handleSignOut}
          toggleVisibility={this.handleToggleSideMenu}
        />
        <SidebarLeftUncover
          visible={sidebarVisible}
          options={isSignedIn && <YoutubePlaylists
                                    onHandleUserPlaylists={this.handleUserPlaylistsUpdate}
                                    onHandlePlaylistSelect={this.handlePlaylistSelect}/>}
        >
          <PlaylistContents
            playlist={ selectedPlaylist }
            contents={ contents }
          />
        </SidebarLeftUncover>
      </div>
    );
  }

  handleUserPlaylistsUpdate(playlists) {
    let currentUser = this.state.signInStatus.user;
    currentUser.playlists = playlists;
    putUser(currentUser);
  }

  handleToggleSideMenu() {
    this.setState({ sidebarVisible: !this.state.sidebarVisible })
  }

  handleOnSubmit(url) {
    this.setState({url: url});
  };

  handlePlaylistSelect(playlist) {
    this.setState({selectedPlaylist: playlist});
    const playlistId = playlist.playlistId;
    console.log(playlist);
    requestVideoPlaylist(playlistId, '', result => {
      console.log(result);
      const contents = result.items.map(item => {
        return { contentId: item.id, title: item.snippet.title, description: item.snippet.description };
      })
      this.setState({contents: contents})
    });
  }

  handleOnSignIn(signInStatus) {
    this.setState({signInStatus: signInStatus});
  }
}

export default App;
