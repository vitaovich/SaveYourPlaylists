import React, { Component } from 'react';

class PlaylistItem extends Component {
  constructor(props) {
    super(props);

    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
  }

  handlePlaylistClick() {
    const playlistId = this.props.id;
    const title = this.props.title;
    this.props.onHandlePlaylistSelect({playlistId: playlistId, title: title});
  }

  render() {
    const title = this.props.title;

    return (
      <div onClick={this.handlePlaylistClick}>{title}</div>
    );
  }
}

export default PlaylistItem;
