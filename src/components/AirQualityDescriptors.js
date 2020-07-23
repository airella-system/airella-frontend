export const getAirQualityLevel = (aqi) => {
  if (aqi <= 12)
    return 0
  else if (aqi <= 25)
    return 1
  else if (aqi <= 38)
    return 2
  else if (aqi <= 50)
    return 3
  return 4
}

export const getAirQualityColorForLevel = (level) => {
  switch (level) {
    case 0: 
      return "56b94d"
    case 1:
      return "a8c449"
    case 2:
      return "ffc94b"
    case 3:
      return "f68844"
    default:
      return "ed4740"
  }
}