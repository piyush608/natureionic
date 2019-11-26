import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class LocationService {
  constructor() {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        resp => {
          resolve({ _lat: resp.coords.latitude, _long: resp.coords.longitude });
        },
        err => {
          reject(err);
        }
      );
    });
  }

  codeLatLng(lat, lng): Promise<any> {
    const geocoder = new google.maps.Geocoder();
    const latlng = new google.maps.LatLng(lat, lng);
    let city, region, country;

    return new Promise<any>((res, rej) => {
      geocoder.geocode({ location: latlng }, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
          if (results[1]) {
            var indice = 0;

            for (var j = 0; j < results.length; j++) {
              if (results[j].types[0] == "locality") {
                indice = j;
                break;
              }
            }

            for (var i = 0; i < results[j].address_components.length; i++) {
              if (results[j].address_components[i].types[0] == "locality") {
                // this is the object you are looking for City
                city = results[j].address_components[i];
              }
              if (
                results[j].address_components[i].types[0] ==
                "administrative_area_level_1"
              ) {
                //this is the object you are looking for State
                region = results[j].address_components[i];
              }
              if (results[j].address_components[i].types[0] == "country") {
                //this is the object you are looking for
                country = results[j].address_components[i];
              }
            }

            // City data
            const location = {
              city: city.long_name,
              state: region.long_name,
              stateSN: region.short_name,
              country: country.short_name
            };

            res(location);
          } else {
            rej(null);
          }
        } else {
          rej(status);
        }
      });
    });
  }

  getLocationFromZipcode(zipcode): Promise<any> {
    var geocoder = new google.maps.Geocoder();
    return new Promise(function(resolve, reject) {
      geocoder.geocode({ address: zipcode.toString() }, function(
        results,
        status
      ) {
        if (status === google.maps.GeocoderStatus.OK) {
          for (var ii = 0; ii < results[0].address_components.length; ii++) {
            var types = results[0].address_components[ii].types.join(",");
            if (!city) {
              if (
                types === "locality,political" ||
                types === "administrative_area_level_2,political"
              ) {
                var city = results[0].address_components[ii].long_name;
              }
            }

            if (!state) {
              if (types === "administrative_area_level_1,political") {
                var state = results[0].address_components[ii].short_name;
              }
            }
          }
          if (ii === results[0].address_components.length) {
            if (!city) {
              city = results[0].address_components[1].long_name;
            }
            var location = {
              city: city,
              state: state
            };
            resolve(location);
          }
        } else {
          var reason = new Error("Some error occured");
          reject(reason);
        }
      });
    });
  }
}
