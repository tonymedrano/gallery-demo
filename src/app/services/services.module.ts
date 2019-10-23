import {NgModule} from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http'; 

import { GalleryService } from './gallery.service';
// . import { GalleryInterceptorService } from "./gallery.interceptor";

@NgModule({
  imports: [
    HttpClientModule
  ],
  exports: [],
  declarations: [],
  providers: [
    GalleryService,
    /* {
      provide: HTTP_INTERCEPTORS,
      useClass: GalleryInterceptorService,
      multi: true
    } */
  ]
})
export class ServicesModule {
}
