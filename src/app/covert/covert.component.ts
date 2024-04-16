import { Component } from '@angular/core';

@Component({
  selector: 'app-covert',
  templateUrl: './covert.component.html',
  styleUrls: ['./covert.component.css']
})
export class CovertComponent {

  restartVideo() {
    let video = document.getElementById("background-video") as HTMLVideoElement;
    video.play();
  }
}
