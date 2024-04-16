// login.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  
  password: string = '';
  errorMessage: string | undefined;

  constructor(private router: Router , private authService: AuthService) {}



  login(): void {
    if (this.password === 'admin1') {
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      this.router.navigateByUrl('/homepatch');

    }


     else if ( this.password === 'admin2') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/firstsew');

    }
    
    else if ( this.password === 'admin3') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/packb');
    } 
    
    else if ( this.password === 'admin4') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/patch');
    } 
    else if (this.password === 'admin5') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/second');
    }
    else if ( this.password === 'admin6') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/finition');
    }
    else if ( this.password === 'admin7') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/pack');
    }
    else if (this.password === 'admin8') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/cover');
    }
    else if (this.password === 'admin9') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/nylon');
    }
  
    else if ( this.password === 'admin') {
      // Connexion réussie pour l'autre utilisateur spécifique
      this.authService.isAdmin = true;
      console.log('Connexion réussie en tant que cut');
      // Navigation vers la page de test après la connexion réussie
      this.router.navigateByUrl('/admin');
    } 
    else {
      // Connexion échouée
      this.errorMessage = 'Identifiants invalides'; // Définition du message d'erreur

      console.log('Identifiants invalides');
    }
  }
  
  

  
  }
  


