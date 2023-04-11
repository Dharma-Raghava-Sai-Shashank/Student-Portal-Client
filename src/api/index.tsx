export const APIRequest = async (url: string, method: string, data?: Object | FormData) => {
  return fetch(url, {
    method, // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "include", // include, *same-origin, omit
    headers: {
      // "Content-Type": `multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW`
      // 'Content-Type': 'application/x-www-form-urlencoded',
      'Content-Type': 'application/json',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
    .then((response: any) => response.json())
    .catch((error) => {
      console.log({error});
      return ({ success: false, message: error.message });
    });
};

export const baseURL = `http://localhost:3001/api`;