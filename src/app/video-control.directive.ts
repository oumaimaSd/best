import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: 'video[appVideoControl]'
})
export class VideoControlDirective {

  constructor(private elementRef: ElementRef) {
    const video = this.elementRef.nativeElement as HTMLVideoElement;
    const isVideoPlaying = localStorage.getItem('isVideoPlaying');
    if (isVideoPlaying && isVideoPlaying === 'true') {
      video.play();
    }
 
    video.addEventListener('play', () => {
      localStorage.setItem('isVideoPlaying', 'true');
    });

    video.addEventListener('pause',() => {
localStorage.setItem('isVideoPlaying','false')
    });
  }


}
