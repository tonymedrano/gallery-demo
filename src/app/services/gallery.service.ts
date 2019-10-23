/*
 * File: /Users/tonymedrano/Desktop/angular-gallery-demo/src/app/services/gallery.service.ts
 * Project: /Users/tonymedrano/Desktop/angular-gallery-demo
 * Created Date: Wednesday October 23rd 2019
 * Author: Tony Medrano <info@tonymedrano.com>
 * -----------------------------------------------------
 * Last Modified: Wednesday October 23rd 2019 9:53:50 am
 * Modified By: Tony Medrano
 * -----------------------------------------------------
 * Copyright (c) 2019 Tony Medrano Development
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Authorization': 'authkey',
    'userid': '185134172@N07'
  })
};

@Injectable()
export class GalleryService {
  private apiKey = '4ed03457cc5c12faa1d2ca6902bf7069';
  private perPage = 10000;
  //. https://github.com/Rob--W/cors-anywhere/#documentation
  private corsUrl = 'https://cors-anywhere.herokuapp.com/';
  private flickrApiUrl = 'https://api.flickr.com';

  constructor(public http: HttpClient) { }

  getImagesData(search: string, page: number): Observable<any> {
    const imageUrl = `/services/rest/?method=flickr.photos.search&api_key=${this.apiKey}&tags=${search}&page=${page}&tag_mode=any&per_page=${this.perPage}&format=json&safe_search=1&nojsoncallback=1`;
    return this.http.get<any>(`${this.corsUrl}${this.flickrApiUrl}${imageUrl}`, httpOptions)
      .pipe(map((data) => data.photos.photo.map((imageData: any) => ({
        ...imageData,
        src: this.imageUrl(imageData)
      }))
      ));
  }

  imageUrl({ id, farm, server, secret }) {
    return `https://farm${farm}.staticflickr.com/${server}/${id}_${secret}.jpg`;
  }

}