import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import * as AWS from "aws-sdk";
import { environment } from "src/environments/environment";

const s3 = new AWS.S3({
  endpoint: environment.endPoint,
  accessKeyId: environment.accessKeyId,
  secretAccessKey: environment.secretAccessKey
});

@Injectable({
  providedIn: "root"
})
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImage(tag, _id, image) {
    return new Promise((res, rej) => {
      const params = {
        Bucket: environment.bucket,
        Key:
          tag +
          "/" +
          _id +
          "/" +
          Math.random()
            .toString(36)
            .substr(2),
        Body: image
      };

      s3.putObject(params)
        .on("build", request => {
          request.httpRequest.headers.Host = environment.host;
          request.httpRequest.headers["Content-Type"] = "image-jpeg";
          request.httpRequest.headers["x-amz-acl"] = "public-read";
        })
        .send((err, data) => {
          if (err) rej(err);
          else res(environment.host + "/" + params.Key);
        });
    });
  }

  resizeImage(params) {
    return this.http.post(environment.PHOTO_URL + "/resize", params);
  }

  uploadImageURL(URL) {
    const newPhoto = {
      originalUrl: URL,
      thumb200Url: URL + "-thumb_200X200",
      thumb400Url: URL + "-thumb_400X400"
    };

    return this.http.post(environment.PHOTO_URL + "/create", newPhoto);
  }
}
