import React, { Component } from 'react';
import { playlistSearch } from './GoogleApiUtils';
import querystring from 'querystring'
import './SearchResultTable.css'

const API_KEY = 'AIzaSyADQZkj1blmWY2cTdbG2O4CR4zDfkch4K4'

class SearchResultTable extends Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};

    this.getSearchResults = this.getSearchResults.bind(this);
  }

  getSearchResults() {
    let parsedUrl = querystring.parse(this.props.url);
    playlistSearch(API_KEY, parsedUrl.list)
      .then(data => {
        console.log(data);
        this.setState({data: data});
      })
      .catch(error => console.error(error));
  }



  createVideo(item) {
    return {
      id: item.id,
      title: item.snippet.title,
      videoId: item.snippet.resourceId.videoId,
      thumbnail: item.snippet.thumbnails.default,
    }
  }

  createResultList(video) {
    console.log(video);
    return (
      <li key={video.id}>
        {video.title}
      </li>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(prevProps.url !== this.props.url) {
      this.getSearchResults();
    }
  }

  render() {
    const items = this.state.data.items;
    let videos = [];
    if(items !== undefined && items.length > 0) {
      console.log('creating video list');
      videos = items.map(this.createVideo);
    }
    return(
      <div className='minHeight'>
      <VideoList
        videos={videos}
      />
      </div>
    );
  }
}

function VideoListItem(props) {
  const title = props.title;
  const youtubeURL = 'https://www.youtube.com/watch?v=' + props.videoId;
  const thumbnailUrl = props.thumbnail ? props.thumbnail.url : '';
  return (
    <li>
      <img src={thumbnailUrl} alt='nothing found'/>
      <a href={youtubeURL}>{title}</a>
    </li>
  );
}

function VideoList(props) {
  const videos = props.videos;
  console.log(videos);

  if(!videos.length) {
    return null;
  }
  const videoListItems = videos.map((video) => {
    return (
      <VideoListItem
        key={video.id}
        title={video.title}
        videoId={video.videoId}
        thumbnail={video.thumbnail}
      />
    );
  });

  return (
    <div>
      <span>Song List</span>
      <ul>{videoListItems}</ul>
    </div>
  );
}

export default SearchResultTable;
