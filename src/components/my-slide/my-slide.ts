import {Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Slides } from 'ionic-angular';


@Component({
  selector: 'my-slide',
  templateUrl: 'my-slide.html'
})
export class MySlide {

  @Input("slides") slides_list:string[] = [];
  @Input("pageNumber") pageNumber:number = 5;
  @Output("ionSlideTap") ionSlideTap = new EventEmitter<number>();
  @ViewChild(Slides) slides: Slides;
  selectedIndex:number = 0;

  constructor() {
  }

  ngOnInit() { 
    this.slides.loop = false;
    this.slides.autoplay = false;
    this.slides.initialSlide = 0;
    this.slides.pager = false;
    this.slides.slidesPerView = this.pageNumber;
    this.slides.paginationHide = true;
    this.slides.paginationClickable = true;
  }

  onClick(index) {
    this.selectedIndex = index;
    this.ionSlideTap.emit(index);
  }
}
