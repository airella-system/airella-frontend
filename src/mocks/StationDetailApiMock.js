export let stationDetailDataMock = {
  id: 1,
  address: {
    country: "PL",
    city: "Kraków",
    street: "Looong Street",
    number: "12/4"
  },
  location: {
    latitude: 50.1261338,
    longitude: 19.7922355,
  },
  sensors: {
    pm1: {
      type: "pm1",
      value: 10.4,
      state: 2,
      timestamp: "2020-04-18T14:35:24.357Z",
    },
    pm2_5: {
      type: "pm2_5",
      value: 5.1,
      state: 5,
      timestamp: "2020-04-18T14:35:24.357Z",
    },
    pm10: {
      type: "pm10",
      value: 21.3,
      state: 3,
      timestamp: "2020-04-18T14:35:24.357Z",
    },
  },
  airQuality: 2,
  humidity: 67,
  temperature: 25.6,
};