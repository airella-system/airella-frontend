const ApiURL = {
  "activateAccount": () => "auth/activate-user",
  "getMarkers": () => "search/map",
  "getUserStations": () => "user/stations",
  "getStations": () => "stations",
  "getUserStations": () => "user/stations",
  "getPopupData": (endpointParameters) => `stations/${endpointParameters[0]}`,
  "getStationStatistics": (endpointParameters) => `stations/${endpointParameters[0]}/statistics`,
  "getStationStatistic": (endpointParameters) => `stations/${endpointParameters[0]}/statistics/${endpointParameters[1]}`,
  "login": () => "auth/login",
  "removeStation": (endpointParameters) => `stations/${endpointParameters[0]}`,
  "refreshLogin": () => "auth/refresh-token",
};

const baseURL = (process.env.REACT_APP_AIRELLA_DOMAIN != null 
  ? process.env.REACT_APP_AIRELLA_DOMAIN
  : "http://airella.cyfrogen.com") + "/api/"

export let getApiUrl = (endpointName, endpointParameters, params = {}) => {
  var query = Object.keys(params)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(params[k]))
    .join("&");
  if (!!query) query = "?" + query;
  return baseURL + ApiURL[endpointName](endpointParameters) + query;
};

export let postApiUrl = (endpointName) => baseURL + ApiURL[endpointName]()
