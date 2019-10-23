import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpHandler,
    HttpParams,
} from '@angular/common/http';
import { take, exhaustMap, map } from 'rxjs/operators';

@Injectable()
export class GalleryInterceptorService implements HttpInterceptor {
    private apiKey = '4ed03457cc5c12faa1d2ca6902bf7069';
    private perPage = 100;
    private page = 0;
    private searchValue = 'ironman';
    //. https://github.com/Rob--W/cors-anywhere/#documentation
    private corsUrl = 'https://cors-anywhere.herokuapp.com/';
    private flickrApiUrl = 'https://api.flickr.com';

    constructor() { }

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const modifiedReq = req.clone({
            params: new HttpParams()
            .set('method', 'flickr.photos.search')
            .set('api_key', `${this.apiKey}`)
            .set('tags', this.searchValue)
            .set('page', `${this.page}`)
            .set('tag_mode', 'any')
            .set('per_page', `${this.perPage}`)
            .set('format', 'json')
            .set('safe_search', '1')
            .set('nojsoncallback', '1')
        });
        return next.handle(modifiedReq);
    }
}
