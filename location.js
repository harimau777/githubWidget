function setLocation() {
  if ("geolocation" in navigator) {
    return navigator.geolocation.getCurrentPosition((position) => ___?___);
  } else {
    return undefined;
  }
}

function reverseGeocode(lat, lng) {
  var query = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${key}&result_type=locality&key=${googleKey}`;
  //Get the result
  //Get the formatted address
}