import {googleAPIKey} from './apiKeys.js';

function getLocation(callback) {
  if ('geolocation' in navigator) { //Check if geolocation is available
    getLatLng()                 //Get the user's latitude and longitude
    .then((latLng) => {
      reverseGeocode(...latLng) //Perform reverse geocoding
      .then((data) => callback(data))           //Reverse geocoding succeeded, call the callback
      .catch(() => undefined);  //Return undefined if reverse geocoding failed
    })
    .catch(() => undefined);    //Return undefined if finding the location failed
  } else {
    return undefined; //Return undefined if geolocation is not available
  }
}

function getLatLng() {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      resolve([position.coords.latitude, position.coords.longitude])
    }, () => reject());
  });
}

function reverseGeocode(lat, lng) {
  return new Promise((resolve, reject) => {
    $.ajax({
      url: `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&result_type=locality&key=${googleAPIKey}`,
      dataType: 'json',
      error: () => reject(),
      success: (data) => resolve(data.results[0].formatted_address)
    });
  });
}

export {getLocation};
