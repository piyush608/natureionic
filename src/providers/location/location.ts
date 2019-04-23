import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLng } from '@ionic-native/google-maps';

@Injectable()
export class LocationProvider {

  constructor(public http: HttpClient) { }

  getLocation(lat, lng):Promise<any> {
    var geocoder = new google.maps.Geocoder();
    var latlng = new LatLng(parseFloat(lat), parseFloat(lng));
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          for (var ii = 0; ii < results[0].address_components.length; ii++) {
            var types = results[0].address_components[ii].types.join(",");
            if(!city) {
              if((types === "locality,political") || (types === "administrative_area_level_2,political")) {
                var city = results[0].address_components[ii].long_name;
              }
            }

            if(!state) {
              if(types === "administrative_area_level_1,political") {
                var state = results[0].address_components[ii].short_name;
              }
            }
          }
          if(ii === results[0].address_components.length) {
            if(!city) {
              city = results[0].address_components[0].long_name;
            }
            var location = {
              city: city,
              state: state
            };
            resolve(location);
          }
        } else {
          var reason = new Error('Some error occured');
          reject(reason);
        }
      });
    });
  }

  getLatLngFromZipcode(zipcode): Promise<any> {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ address: zipcode.toString() }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          var location = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng()
          }
          resolve(location);
        } else {
          var reason = new Error('Some error occured');
          reject(reason);
        }
      });
    })
  }

  getLocationFromZipcode(zipcode): Promise<any> {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ address: zipcode.toString() }, function(results, status) {
        if (status === google.maps.GeocoderStatus.OK) {
          for (var ii = 0; ii < results[0].address_components.length; ii++) {
            var types = results[0].address_components[ii].types.join(",");
            if(!city) {
              if((types === "locality,political") || (types === "administrative_area_level_2,political")) {
                var city = results[0].address_components[ii].long_name;
              }
            }

            if(!state) {
              if(types === "administrative_area_level_1,political") {
                var state = results[0].address_components[ii].short_name;
              }
            }
          }
          if(ii === results[0].address_components.length) {
            if(!city) {
              city = results[0].address_components[1].long_name;
            }
            var location = {
              city: city,
              state: state
            };
            resolve(location);
          }
        } else {
          var reason = new Error('Some error occured');
          reject(reason);
        }
      });
    });
  }
}