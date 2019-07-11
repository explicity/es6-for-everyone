const API_URL: string =
  "https://api.github.com/repos/binary-studio-academy/stage-2-es6-for-everyone/contents/resources/api/";

interface IOptions {
  method: string
}

async function callApi(endpoind: string, method: string) {
  const url: string = API_URL + endpoind;
  const options: IOptions = {
    method
  };

  try {
    const response = await fetch(url, options);
    return await (response.ok ? response.json() : Promise.reject(Error("Failed to load")));
  }
  catch (error) {
    throw error;
  }
}

export { callApi };
