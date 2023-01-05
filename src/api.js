export function myFetch(path, config = {}) {
  const HOST = process.env.REACT_APP_API;
  //const HOST = "http://localhost:4000";
  // const HOST = "http://185.20.225.250";
  return fetch(`${HOST}/${path}`, {
    ...config,
    headers: {
      "Content-Type": "application/json",
      ...config.headers,
    },
  });
}
