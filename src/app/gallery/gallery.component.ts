/*
 * File: /Users/tonymedrano/Desktop/angular-gallery-demo/src/app/gallery/gallery.component.ts
 * Project: /Users/tonymedrano/Desktop/angular-gallery-demo
 * Created Date: Wednesday October 23rd 2019
 * Author: Tony Medrano <info@tonymedrano.com>
 * -----------------------------------------------------
 * Last Modified: Wednesday October 23rd 2019 10:22:33 am
 * Modified By: Tony Medrano
 * -----------------------------------------------------
 * Copyright (c) 2019 Tony Medrano Development
 */

import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { GalleryService } from '../services/gallery.service';

@Component({
    selector: 'app-gallery',
    templateUrl: './gallery.component.html',
    styleUrls: ['./gallery.component.css']
})
export class GalleryComponent implements OnInit {
    private gallerySub: Subscription;
    gallery: Array<any> = [];
    isLoading: boolean = true;
    private search: string = 'ironman';
    private page: number = 0;

    constructor(private galleryService: GalleryService) { }

    ngOnInit() {
        this.imagesGallery(this.search, this.page);
    }

    imagesGallery(search: string, page: number) {
        this.galleryService.getImagesData(search, page).subscribe(res => {
            this.gallery = [...this.gallery, ...res];
            this.isLoading = false;
        });
    }

    ngOnDestroy() {
        if (this.gallerySub) this.gallerySub.unsubscribe();
    }

}
