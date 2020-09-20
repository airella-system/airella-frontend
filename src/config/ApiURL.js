const ApiURL = {
  "activateAccount": () => "auth/activate-user",
  "getMarkers": () => "search/map",
  "getUserStations": () => "user/stations",
  "getStations": () => "stations",
  "getPopupData": (endpointParameters) => `stations/${endpointParameters[0]}`,
};

const baseURL = "http://airella.cyfrogen.com/api/";

export let getApiUrl = (endpointName, endpointParameters, params = {}) => {
  var query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  if (!!query) query = "?" + query;
  return baseURL + ApiURL[endpointName](endpointParameters) + query;
};
