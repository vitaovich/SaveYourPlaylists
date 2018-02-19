import fetch from 'isomorphic-fetch'
import querystring from 'querystring'
import secret from './clientSecret'

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'
const CLIENT_ID = secret.web.client_id;
const DISCOVERY_DOCS =  ["https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest"];
const SCOPES = 'https://www.googleapis.com/auth/youtube.readonly';
const GAPI_INITIALIZATION = {discoveryDocs: DISCOVERY_DOCS, clientId: CLIENT_ID, scope: SCOPES};

export function getGapi() {
  return new Promise((resolve, reject) => {
    if(window.gapiready) {
      resolve(window.gapi);
    } else {
      window.addEventListener('google-loaded', () => resolve(window.gapi));
    }
  });
}

export function getClient() {
  return new Promise((resolve, reject) => {
    if(window.clientready) {
      resolve(window.gapi.client);
    } else {
      loadClientAuth2();
      window.addEventListener('client-loaded', () => resolve(window.gapi.client));
    }
  });
}

export function getAuth2() {
  return new Promise((resolve, reject) => {
    if(window.auth2ready) {
      resolve(window.gapi.auth2);
    } else {
      loadClientAuth2();
      window.addEventListener('auth2-loaded', () => resolve(window.gapi.auth2));
    }
  });
}

function loadClientAuth2() {
  console.log('loading client and auth2');
  getGapi()
  .then(gapi => {
    gapi.load('client:auth2', () => {
      gapi.client.init(GAPI_INITIALIZATION)
      .then(() => {
        window.clientready = true;
        window.auth2ready = true;
        window.dispatchEvent(new Event('client-loaded'));
        window.dispatchEvent(new Event('auth2-loaded'));
      });
    });
  });
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

export function playlistSearch (key, playlistId) {
  const params = {
    part: 'snippet',
    key: key,
    playlistId: playlistId
  }

  return fetch(`${SEARCH_URL}?${querystring.stringify(params)}`)
    .then(checkStatus)
    .then(parseJSON)
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
  console.log(options);
  let youtube = window.gapi.client.youtube;
  return youtube.playlists.list(options);
}

export function requestVideoPlaylist (playlistId, pageToken, nextFunction) {
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
