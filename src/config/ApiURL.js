const ApiURL = {
  'getMarkers': 'search/map',
}

const baseURL = "http://airella.cyfrogen.com/api/"

export let getApiUrl = (endpointName, params) => {
  var query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  if(!!query) query = "?" + query;
  return baseURL + ApiURL[endpointName] + query;
}
