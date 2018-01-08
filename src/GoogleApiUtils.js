import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

const SEARCH_URL = 'https://www.googleapis.com/youtube/v3/playlistItems'

export default function (key, playlistId) {
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
