import React, { Component } from 'react';
import { List, Header, Image } from 'semantic-ui-react';
import playlistIcon  from './assets/images/playlist_icon.png';

class PlaylistContents extends Component {


  componentDidMount() {
    console.log('PLAYLIST ID');
    console.log(this.props.playlist);
    console.log('END');
  }

  render() {
    const playlist = this.props.playlist || { playlistId: '', title: 'No Playlist Selected' }
    const contents = this.props.contents || [{ _id: '', title: 'No content available', description: 'Nothing' }];

    return(
      <div>
        <Header as='h3' icon>
          <Image src={playlistIcon}/>
          <Header.Content>
            {playlist.title}
          </Header.Content>
        </Header>
        <List divided relaxed ordered animated>
          {contents.map(content => {
            const videoLink = 'https://www.youtube.com/watch?v=' + content._id;
            return (
              <List.Item key={content._id}>
                <List.Icon name='video play' size='large' verticalAlign='middle' />
                <List.Content>
                  <List.Header as='a' href={videoLink} target='_blank'>{content.title}</List.Header>
                  <List.Description as='a'>{content.description}</List.Description>
                </List.Content>
              </List.Item>
            )
          })}
        </List>
      </div>

    )
  }
}

export default PlaylistContents
