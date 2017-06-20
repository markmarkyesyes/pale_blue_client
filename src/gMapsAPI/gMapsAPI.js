import constants from "../constants";
import moment from "moment-timezone";
const gMapsGeolocationAPIKey = constants.gMapsGeolocationAPIKey;
const gMapsTimezoneAPIKey = constants.gMapsTimezoneAPIKey;

function _fetchLocalData(lng, lat) {
  let results = { district: null, country: null, state: null, date: null };
  return fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${gMapsGeolocationAPIKey}`
  )
    .then(geoResponse => {
      return geoResponse.json();
    })
    .then(geoJson => {
      if (!geoJson.results[0]) {
        return null;
      }
      geoJson.results[0].address_components.forEach(component => {
        switch (component.types[0]) {
          case "country":
            results.country = component.long_name;
            break;
          case "locality":
            results.district = component.long_name;
            break;
          case "administrative_area_level_1":
            results.state = component.long_name;
          default:
            break;
        }
      });
      let targetDate = new Date();
      let timestamp =
        targetDate.getTime() / 1000 + targetDate.getTimezoneOffset() * 60;
      return fetch(
        `https://maps.googleapis.com/maps/api/timezone/json?location=${lat},${lng}&timestamp=${timestamp}&key=${gMapsTimezoneAPIKey}`
      );
    })
    .then(tzResponse => {
      return tzResponse.json();
    })
    .then(tzJson => {
      if (!tzJson.rawOffset) {
        console.log("in error on timezone", tzJson);
        return results;
      }
      results.date = moment
        .tz(Date.now(), tzJson.timeZoneId)
        .format("h:mm:ss a");
      return results;
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports = (lng, lat) => {
  return _fetchLocalData(lng, lat).then(results => {
    return results;
  });
};
