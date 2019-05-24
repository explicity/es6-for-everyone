const proxyurl = "https://cors-anywhere.herokuapp.com/";
const API_URL = "https://bsa19-nodejs.herokuapp.com";

function callApi(endpoind, method, data) {
  const url = proxyurl + API_URL + endpoind;
  const options = {
    method,
    body: JSON.stringify(data),
    headers: new Headers({
      "Content-Type": "application/json"
    })
  };

  return fetch(url, options)
    .then(response =>
      response.ok ? response.json() : Promise.reject(Error("Failed to load"))
    )
    .catch(error => {
      throw error;
    });
}

export { callApi };
