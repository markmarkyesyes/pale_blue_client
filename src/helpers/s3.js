import 'isomorphic-fetch';
import 'es6-promise/auto';
import constants from '../constants';

export function uploadToS3(file) {
  return getSignedRequest(file)
    .then(json => uploadFile(file, json.signedRequest, json.url))
    .then(url => {
      return url;
    })
    .catch(err => {
      console.error(err);
      return null;
    })
}

function getSignedRequest(file) {
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
    });
}
