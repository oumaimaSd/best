import { Component } from '@angular/core';
//import { AuthService } from './auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
 // constructor(private authService: AuthService) {}

 // isLoggedIn() {
  //  return this.authService.isLoggedIn();}
  ngOnInit() {

    const currentPage: string = window.location.href;

    if (currentPage.includes("about")) {
      const aboutLink: HTMLAnchorElement | null = document.querySelector('a[href="about"]');

      if (aboutLink) {
        aboutLink.classList.add("current");
      }
    }
else{

    if (currentPage.includes("home")) {
      // Récupérer l'élément correspondant à la page "About"
      const aboutLink: HTMLAnchorElement | null = document.querySelector('a[href="home"]');

      // Vérifier si l'élément a été trouvé
      if (aboutLink) {
        // Ajouter la classe "current" à l'élément correspondant à la page "About"
        aboutLink.classList.add("home");
      }
    }


  }
}
}


