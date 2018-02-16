import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

function playlistSearch (key, playlistId) {
  const params = {
    part: 'snippet',
    key: key,
    playlistId: playlistId
  }

  return fetch(`${SEARCH_URL}?${querystring.stringify(params)}`)
    .then(checkStatus)
    .then(parseJSON)
}

function checkStatus (response) {
  if (response.ok) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error(response.statusText))
}

function parseJSON(response) {
  return response.json()
}

export function requestMineChannel() {
  const options =  {
    part: 'id',
    mine: true
  };
  return requestChannel(options);
}

export function requestChannel(options) {
  let youtube = window.gapi.client.youtube;
  let request = youtube.channels.list(options);
  return request;
}

export function requestPlaylistsList(options) {
  let youtube = window.gapi.client.youtube;
  console.log('PLAYLISTS LIST PART');
  console.log(options.part);
  return youtube.playlists.list(options);
}

function requestVideoPlaylist (playlistId, pageToken, nextFunction) {
  let gapi = window.gapi;
  var requestOptions = {
   playlistId: playlistId,
   part: 'snippet',
   maxResults: 10
  };

  if (pageToken) {
   requestOptions.pageToken = pageToken;
  }

  var request = gapi.client.youtube.playlistItems.list(requestOptions);
  request.execute(response => {
   // Only show pagination buttons if there is a pagination token for the
   // next or previous page of results.
   // nextPageToken = response.result.nextPageToken;
   // var nextVis = nextPageToken ? 'visible' : 'hidden';
   // $('#next-button').css('visibility', nextVis);
   // prevPageToken = response.result.prevPageToken
   // var prevVis = prevPageToken ? 'visible' : 'hidden';
   // $('#prev-button').css('visibility', prevVis);
   //
   // var playlistItems = response.result.items;
   nextFunction(response.result);
  });
}

export { playlistSearch, requestVideoPlaylist };
