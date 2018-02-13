import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

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

export function postPlaylist (playlist) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(playlist),
  }
  return fetching('api/playlists', fetchData);
}

export function postVideo (video) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(video),
  }
  return fetching('api/videos', fetchData);
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
