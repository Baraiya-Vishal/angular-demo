import { Directive, Input, ElementRef, Renderer2, OnChanges, SimpleChanges } from '@angular/core';


@Directive({
  selector: '[appLoader]'
})
export class LoaderDirective implements OnChanges {

  @Input() loading: boolean = false; // The input for the loading state

  private loaderElement: HTMLElement;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    // Create the loader element
    this.loaderElement = this.renderer.createElement('div');
    this.renderer.addClass(this.loaderElement, 'loader-overlay');
    this.renderer.appendChild(this.el.nativeElement, this.loaderElement); // Attach the loader to the element
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['loading']) {
      this.toggleLoader();
    }
  }

  private toggleLoader(): void {
    if (this.loading) {
      this.renderer.setStyle(this.loaderElement, 'display', 'flex'); // Show the loader
    } else {
      this.renderer.setStyle(this.loaderElement, 'display', 'none'); // Hide the loader
    }
  }
}
