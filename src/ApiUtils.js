import fetch from 'isomorphic-fetch'
import querystring from 'querystring'

function getUser (id) {
  const params = { id: id }
  return fetch(`${'/api/users'}?${querystring.stringify(params)}`)
    .then(checkStatus)
    .then(parseJSON)
}

function saveUser (user) {
  
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

export { getUser };
