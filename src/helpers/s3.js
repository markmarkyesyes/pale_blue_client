import 'isomorphic-fetch';
import 'es6-promise/auto';
import constants from '../constants';

export function getSignedRequest(file) {
  const token = localStorage.getItem("token");
  const options = {
    headers: {
      Authorization: `JWT ${token}`
    }
  };
  return fetch(
    `${constants.baseUrl}/api/v1/content/sign-s3?fileName=${file.name}&fileType=${file.type}`,
    options
  )
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return response.json();
    })
    .then(json => {
      return uploadFile(file, json.signedRequest, json.url);
    })
    .catch(err => {
      console.error(err);
      return null;
    });
}

function uploadFile(file, signedRequest, url) {
  const options = {
    method: 'PUT',
    body: file
  };
  return fetch(signedRequest, options)
    .then(response => {
      if (!response.ok) {
        throw new Error(`${response.status}: ${response.statusText}`);
      }
      return url;
    })
    .catch(err => {
      console.error(err);
      return null;
    })
}
