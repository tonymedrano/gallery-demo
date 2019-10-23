import { TestBed, async, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { GalleryComponent } from './gallery.component';
import { GalleryService } from '../services/gallery.service';

describe('GalleryComponent', () => {
  let service: GalleryService;
  let httpMock: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GalleryComponent],
      providers: [GalleryService],
      imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.get(GalleryService);
    httpMock = TestBed.get(HttpTestingController);
  }));

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have getImagesData function', () => {
    expect(service.getImagesData).toBeTruthy();
  });

  it('should render the superheores list', (done) => {
    const superheroe: string = 'ironman';
    const flickrSuperheroes = {
      "photos": {
        "page": 1,
        "pages": 1594,
        "perpage": 100,
        "total": "159386",
        "photo": [
          {
            farm: 66,
            id: "48946904596",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "127066514@N05",
            secret: "40aa9df7aa",
            server: "65535",
            src: "https://farm66.staticflickr.com/65535/48946904596_40aa9df7aa.jpg",
            title: "H74-$3"
          },
          {
            farm: 66,
            id: "48935828912",
            isfamily: 0,
            isfriend: 0,
            ispublic: 1,
            owner: "184982087@N05",
            secret: "f73a81cb73",
            server: "65535",
            src: "https://farm66.staticflickr.com/65535/48935828912_f73a81cb73.jpg",
            title: "Joe @ Endurance Company",
          }
        ]
      }
    };

    service.getImagesData(superheroe, 1).subscribe(superheroes => {
      expect(superheroes.length).toBe(2);
      expect(superheroes).toEqual(flickrSuperheroes.photos.photo);
    });

    const req = httpMock.expectOne(`https://cors-anywhere.herokuapp.com/https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=4ed03457cc5c12faa1d2ca6902bf7069&tags=ironman&page=1&tag_mode=any&per_page=100&format=json&safe_search=1&nojsoncallback=1`);
    expect(req.request.method).toBe("GET");
    req.flush(flickrSuperheroes);
    done();
  });
});

