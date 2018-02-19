import fetch from 'isomorphic-fetch'
import { requestPlaylistsList } from './GoogleApiUtils';

export function getUser (id) {
  const fetchUrl = 'api/users/' + id;

  return fetching(fetchUrl);
}

export function postUser (idToken) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    body: 'idtoken=' + idToken,
  }
  return fetching('api/users', fetchData);
}

export function putUser (user) {
  let fetchData = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(user)
  }
  return fetching('api/users/' + user._id, fetchData);
}

export function getChannelPlaylists (channelId) {
  const fetchUrl = 'api/channels/' + channelId + '/playlists';
  return fetching(fetchUrl);
}

export function postPlaylist (playlist) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(playlist),
  }
  return fetching('api/playlists', fetchData);
}

export function putPlaylist (playlist) {
  let fetchData = {
    method: 'PUT',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(playlist)
  }
  return fetching('api/playlists/' + playlist._id, fetchData);
}

export function postVideo (video) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(video),
  }
  return fetching('api/videos', fetchData);
}

export function syncPlaylists(channelId) {
  console.log('Syncing channel:' + channelId);
  const options = {part: 'id', channelId: channelId, maxResults: 50};

  const youtubeData = requestPlaylistsList(options)
  .then(response => response.result.items.map(item => item.id));

  const localData = getChannelPlaylists(channelId)
  .then(response => response.playlists.map(item => item._id));

  return Promise.all([youtubeData, localData])
  .then(comparePlaylists)
  .then(updateLocalDB)
}

function comparePlaylists(res, rej) {
  const youtubePlaylists = res[0];
  const localPlaylists = res[1];
  let updatedList = []
  for(let i = 0; i < youtubePlaylists.length; i++) {
    let playlist;
    if(!localPlaylists.includes(youtubePlaylists[i])) {
      playlist = {_id: youtubePlaylists[i], status: 'new'};
      updatedList.push(playlist);
    }
  }
  for(let i = 0; i < localPlaylists.length; i++) {
    if(!youtubePlaylists.includes(localPlaylists[i])) {
      const playlist = {_id: localPlaylists[i], status: 'removed'};
      updatedList.push(playlist);
    }
  }
  return updatedList;
}

function updateLocalDB(changes) {
  let createPlaylists = [];
  let removePlaylists = [];
  changes.forEach(change => {
    if(change.status === 'new') {
      createPlaylists.push( requestPlaylistsList({part: 'snippet', id: change._id})
      .then(res => {
        const googlePlaylist = res.result.items[0];
        const localPlaylist = {_id: googlePlaylist.id,
                                etag: googlePlaylist.etag,
                                title: googlePlaylist.snippet.title,
                                description: googlePlaylist.snippet.description,
                                channel: googlePlaylist.snippet.channelId
                              };
        return localPlaylist;
      }));
    } else {
      //not yet implemented
      console.log('Removing playlist: ' + change._id );
      removePlaylists.push(change);
    }
  });
  let allPromises = createPlaylists.map(reqPlaylistPromise => {
    return reqPlaylistPromise.then(playlist => {
      return postPlaylist(playlist)})
  })
  console.log('create playlists');
  console.log(createPlaylists);
  console.log('remove playlists');
  console.log(removePlaylists);
  return Promise.all(allPromises);
}

function fetching(url, fetchData) {
  return fetch(url, fetchData)
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
