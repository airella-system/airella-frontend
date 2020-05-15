const ApiURL = {
  'getMarkers': 'search/map',
  'stationDetails': 'stations',
}

const baseURL = "http://airella.cyfrogen.com/api/"

export let getApiUrl = (endpointName, params = null, inlineParams = null) => {
  var query = Object.keys(params)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
    .join('&');
  let inlineParamsQuery = inlineParams ? inlineParams.join('/') : '';
  console.log(inlineParamsQuery);
  console.log(inlineParams);
  if(!!query) query = "?" + query;
  return baseURL + ApiURL[endpointName] + '/' + inlineParamsQuery + query;
}
