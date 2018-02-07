import React, { Component } from 'react';

class PlaylistItem extends Component {
  constructor(props) {
    super(props);

    this.handlePlaylistClick = this.handlePlaylistClick.bind(this);
  }

  handlePlaylistClick() {
    this.props.onHandlePlaylistSelect(this.props.id);
  }

  render() {
    const title = this.props.title;

    return (
      <div onClick={this.handlePlaylistClick}>{title}</div>
    );
  }
}

export default PlaylistItem;
