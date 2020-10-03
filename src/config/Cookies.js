export class Cookie {

  constructor(name, value) {
    this.values = {
      name: name,
      value: value,
      path: "/",
    }
  }

  setDate = date => {
    this.values = {
      ...this.values,
      date: date,
    }
    return this
  }

  setTimeMs = ms => {
    this.values = {
      ...this.values,
      ms: ms,
    }
    return this
  }

  setDomain = domain => {
    this.values = {
      ...this.values,
      domain: domain,
    }
    return this
  }

  setSecure = secure => {
    this.values = {
      ...this.values,
      secure: secure,
    }
    return this
  }

  setCookie = () => {
    if (navigator.cookieEnabled) {
      const {name, value, path, date, ms, domain, secure} = this.values
      const cookieName = encodeURIComponent(name);
      const cookieVal = encodeURIComponent(value);
      let cookieText = `${cookieName}=${cookieVal}; path=${path}`;
  
      if (typeof ms === "number") {
        const tmpDate = new Date();
        tmpDate.setTime(tmpDate.getTime() + ms);
        cookieText += "; expires=" + tmpDate.toUTCString();
      }
      
      if (date) {
        const tmpDate = new Date(date)
        cookieText += "; expires=" + tmpDate.toUTCString(); 
      }
  
      if (domain)
        cookieText += "; domain=" + domain;
      
      if (secure)
        cookieText += "; secure";
      
      document.cookie = cookieText;
    }
  }
}

export const getCookie = name => {
  if (document.cookie !== "") {
      const cookies = document.cookie.split(/; */)

      for (let i = 0; i < cookies.length; i++) {
          const cookieParts = cookies[i].split("=")
          const cookieName = cookieParts[0]
          const cookieVal = cookieParts[1]
          if (decodeURIComponent(cookieName) === name)
              return decodeURIComponent(cookieVal)
      }
  }
  return false;
}