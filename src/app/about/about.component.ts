import { Component ,AfterViewInit} from '@angular/core';
declare var $: any;

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements AfterViewInit {
  constructor() { }

  ngAfterViewInit() {
    $('.carousel').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 1
    });

   
    
  }








}
