import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

function getUser (id) {
  const params = { id: id }
  return fetching(`${'api/users'}?${querystring.stringify(params)}`);
}

function postUser (idToken) {
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

function postPlaylist (playlist) {
  let fetchData = {
    method: 'post',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(playlist),
  }
  return fetching('api/playlists', fetchData);
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

export { getUser, postUser, postPlaylist };
