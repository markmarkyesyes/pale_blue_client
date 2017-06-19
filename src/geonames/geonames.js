var Geonames = require("geonames.js");

const geonames = new Geonames({
  username: "markmarkyesyes",
  lan: "en",
  encoding: "JSON"
});

function _calcTime(country, district, offset) {
  var d = new Date();
  var utc = d.getTime() - d.getTimezoneOffset() * 60000;
  var nd = new Date(utc + 3600000 * offset);
  return `${country} \n ${district} \n ${nd.toLocaleString()}`;
}

module.exports = (lng, lat) => {
  let gmtOffset;
  return geonames
    .timezone({ lng, lat })
    .then(res => {
      gmtOffset = res.gmtOffset;
      return geonames.findNearby({ lng, lat });
    })
    .then(loc => {
      let country = loc.geonames[0].countryName || null;
      let district = loc.geonames[0].adminName1 || null;
      if (!country || !district) {
        return null;
      }
      return _calcTime(country, district, gmtOffset);
    })
    .catch(function(err) {
      console.error(err);
      return null;
    });
};
