import { Cookie, getCookie } from "./Cookies";
import {
  getRefreshToken,
  setRefreshToken,
  clearRefreshToken,
} from "./LocalStorage";
import { postApiUrl } from "./ApiURL";
import { setAuthorization } from "../redux/actions";
import store from "../redux/Store";

export const login = (email, password) => {
  return new Promise((resolve, reject) => {
    fetch(postApiUrl("login"), {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          store.dispatch(setAuthorization(true));
          console.log(data.data);
          new Cookie("accessToken", data.data.accessToken.token)
            .setDate(data.data.accessToken.expirationDate)
            .setCookie();
          setRefreshToken(data.data.refreshToken);
          resolve(true);
        } else {
          store.dispatch(setAuthorization(false));
          reject(data.errors[0].detail);
        }
      })
      .catch((e) => {
        store.dispatch(setAuthorization(false));
        console.error(e);
        reject("Couldn't log in");
      });
  });
};

export const logout = () => {
  new Cookie("accessToken", "")
    .setDate("Thu, 01 Jan 1970 00:00:01 GMT")
    .setCookie();
  clearRefreshToken();
  store.dispatch(setAuthorization(false));
};

export const refreshLogin = () => {
  return new Promise((resolve, reject) => {
    if (getCookie("accessToken")) resolve(true);

    const refreshToken = getRefreshToken();
    if (!refreshToken) reject("No refresh token saved");

    fetch(postApiUrl("refreshLogin"), {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          store.dispatch(setAuthorization(true));
          console.log(data.data);
          new Cookie("accessToken", data.data.accessToken.token)
            .setDate(data.data.accessToken.expirationDate)
            .setCookie();
          resolve(true);
        } else {
          reject(data.errors[0].detail);
        }
      })
      .catch((e) => {
        console.error(e);
        reject("Couldn't refresh access token");
      });
  });
};

export const fetchWithAuthorization = async (url, options) => {
  let headers = {
    "Content-Type": "application/json",
  };

  var accessToken = getCookie("accessToken");

  if (!accessToken) {
    try {
      await refreshLogin();
      accessToken = getCookie("accessToken");
    } catch (_) {}
  }

  if (accessToken) {
    headers = {
      ...headers,
      Authorization: "Bearer " + accessToken,
    };
  }

  let optionsWithHeaders = {
    ...options,
    headers: headers,
  };

  return fetch(url, optionsWithHeaders);
};
