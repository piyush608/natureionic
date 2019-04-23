import { BusinessProvider } from './../business/business';
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { RecipeProvider } from '../recipe/recipe';
import { HuntedProductProvider } from '../hunted-product/hunted-product';
import { UserProvider } from '../user/user';
import { ForumProvider } from '../forum/forum';
import { PHOTO_URL } from '../../app/app.url.config';
import * as AWS from 'aws-sdk';
import { ArticlesProvider } from '../articles/articles';

const accessKeyId = 'FDVCDLKZWZSSPH7E2BSN';
const secretAccessKey = 'g+xwGFvLfwALBCB8v+N9Ag2BWQ8n1W+MD2YsVffS9u8';

const s3 = new AWS.S3({
  endpoint: 'sfo2.digitaloceanspaces.com',
  credentials: {
    accessKeyId: accessKeyId,
    secretAccessKey: secretAccessKey
  }
});

@Injectable()
export class UploadImageProvider {
  childRef;

  constructor(
    public http: HttpClient,
    private angBusiness: BusinessProvider,
    private angRecipe: RecipeProvider,
    private angProduct: HuntedProductProvider,
    private angUser: UserProvider,
    private angForum: ForumProvider,
    private angArticles: ArticlesProvider
  ) {
  }

  uploadImage(URL) {
    const newPhoto = {
      originalUrl: URL,
      thumb200Url: URL + '-thumb_200X200',
      thumb400Url: URL + '-thumb_400X400'
    };
    return this.http.post(PHOTO_URL + '/addImage', newPhoto);
  }

  resizeImage(path, key, fileName) {
    this.http.get(PHOTO_URL + '/resizeImage', { params:
      {
        path: path,
        key: key,
        fileName: fileName
      }
    }).subscribe(res => {
      console.log(JSON.stringify(res));
    }, err => {
      console.log(JSON.stringify(err));
    });
  }

  uploadUserImage(uid, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'users/' + uid + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/users/' + uid + '/' + fileName).subscribe(resp => {
          const photo = {
            photo: resp['Photo']._id
          };
          this.angUser.updateUserDetails(photo, uid).subscribe(res => {
            this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/users/' + uid + '/' + fileName, 'users/' + uid + '/', fileName);
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  uploadBusinessImages(businessId, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'businesses/' + businessId + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/businesses/' + businessId + '/' + fileName).subscribe(resp => {
          this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/businesses/' + businessId + '/' + fileName, 'businesses/' + businessId + '/', fileName);
          this.angBusiness.uploadBusinessImage(businessId, resp['Photo']._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  uploadRecipeImages(recipeId, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'recipes/' + recipeId + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/recipes/' + recipeId + '/' + fileName).subscribe(resp => {
          this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/recipes/' + recipeId + '/' + fileName, 'recipes/' + recipeId + '/', fileName);  
          this.angRecipe.uploadRecipeImage(recipeId, resp['Photo']._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  uploadhuntedProductImages(productId, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'huntedProducts/' + productId + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/huntedProducts/' + productId + '/' + fileName).subscribe(resp => {
          this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/huntedProducts/' + productId + '/' + fileName, 'huntedProducts/' + productId + '/', fileName);
          this.angProduct.uploadProductImage(productId, resp['Photo']._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  uploadhuntedProductOwnerLogo(productId, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'huntedProducts/' + productId + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/huntedProducts/' + productId + '/' + fileName).subscribe(resp => {
          this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/huntedProducts/' + productId + '/' + fileName, 'huntedProducts/' + productId + '/', fileName);
          const body = {
            logoUrl: resp['Photo']._id
          };  
          this.angProduct.updateProduct(productId, body).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  uploadForumImages(forumId, file) {
    let possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let fileName = '';

    for (var i = 0; i < 5; i++) {
      fileName += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    const params = {
      Bucket: 'naturehub-bucket',
      Key: 'forums/' + forumId + '/' + fileName,
      Body: file
    };

    s3.putObject(params).on('build', request => {
      request.httpRequest.headers.Host = `https://naturehub-bucket.sfo2.digitaloceanspaces.com`;
      request.httpRequest.headers['Content-Type'] = 'image-jpeg';
      request.httpRequest.headers['x-amz-acl'] = 'public-read';
    }).send((err, data) => {
      if (err) console.log(err, err.stack);
      else {
        this.uploadImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/forums/' + forumId + '/' + fileName).subscribe(resp => {
          this.resizeImage('https://naturehub-bucket.sfo2.digitaloceanspaces.com/forums/' + forumId + '/' + fileName, 'forums/' + forumId + '/', fileName);
          this.angForum.uploadForumImage(forumId, resp['Photo']._id).subscribe(res => {
            console.log(JSON.stringify(res));
          }, err => {
            console.log(JSON.stringify(err));
          });
        }, err => {
          console.log(JSON.stringify(err));
        });
      }
    });
  }

  encode(input) {
    var keyStr =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var output = "";
    var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
    var i = 0;

    while (i < input.length) {
      chr1 = input[i++];
      chr2 = i < input.length ? input[i++] : Number.NaN; // Not sure if the index
      chr3 = i < input.length ? input[i++] : Number.NaN; // checks are needed here

      enc1 = chr1 >> 2;
      enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
      enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
      enc4 = chr3 & 63;

      if (isNaN(chr2)) {
        enc3 = enc4 = 64;
      } else if (isNaN(chr3)) {
        enc4 = 64;
      }
      output +=
        keyStr.charAt(enc1) +
        keyStr.charAt(enc2) +
        keyStr.charAt(enc3) +
        keyStr.charAt(enc4);
    }
    return output;
  }
}