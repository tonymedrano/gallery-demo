import { 
  Component, 
  OnInit , 
  Input, 
  Output, 
  ViewChild,
  EventEmitter,
  ElementRef
} from '@angular/core';

@Component({
  selector: 'gallery-scroll',
  template: `
    <ng-content></ng-content>
    <div #anchor></div>
  `,
  styles: [`
  :host {
    display: block;
  }
  `],
})
export class GalleryScrollComponent implements OnInit {

  @Input() options = {};
  @Output() scrolled = new EventEmitter();
  @ViewChild('anchor', { static: true }) anchor: ElementRef<HTMLElement>;

  private observer: IntersectionObserver;

  constructor(private host: ElementRef) { }

  get element() {
    return this.host.nativeElement;
  }

  ngOnInit() {
    const options = {
      root: this.isHostScrollable() ? this.host.nativeElement : null,
      ...this.options
    };

    this.observer = new IntersectionObserver(([entry]) => {
      entry.isIntersecting && this.scrolled.emit();
    }, options);

    this.observer.observe(this.anchor.nativeElement);
  }

  private isHostScrollable() {
    const style = window.getComputedStyle(this.element);

    return style.getPropertyValue('overflow') === 'auto' ||
      style.getPropertyValue('overflow-y') === 'scroll';
  }

  ngOnDestroy() {
    this.observer.disconnect();
  }

}
