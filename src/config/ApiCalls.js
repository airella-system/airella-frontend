import { Cookie } from "./Cookies";
import { getRefreshToken, setRefreshToken } from "./LocalStorage";
import { postApiUrl } from "./ApiURL";
import { setAuthorization } from "../redux/actions";

export const login = (email, password, dispatch) => {
  return new Promise((resolve, reject) => {
    fetch(
      postApiUrl("login"),
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password: password,
        })
      }
    )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(setAuthorization(true))
        console.log(data.data)
        new Cookie("accessToken", data.data.accessToken.token)
          .setDate(data.data.accessToken.expirationDate)
          .setCookie()
        setRefreshToken(data.data.refreshToken)
        resolve(true)
      } else {
        dispatch(setAuthorization(false))
        reject(data.errors[0].detail)
      }
    })
    .catch((e) => {
      dispatch(setAuthorization(false))
      console.error(e)
      reject("Couldn't log in")
    });
  })
}

export const refreshLogin = dispatch => {
  return new Promise((resolve, reject) => {
    const refreshToken = getRefreshToken()
    if (!refreshToken)
      reject("No refresh token saved")

    fetch(
      postApiUrl("refreshLogin"),
      {
        method: "post",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          refreshToken: refreshToken,
        })
      }
    )
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        dispatch(setAuthorization(true))
        console.log(data.data)
        new Cookie("accessToken", data.data.accessToken.token)
          .setDate(data.data.accessToken.expirationDate)
          .setCookie()
        resolve(true)
      } else {
        reject(data.errors[0].detail)
      }
    })
    .catch((e) => {
      console.error(e)
      reject("Couldn't refresh access token")
    });
  })
}