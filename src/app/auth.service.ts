// auth.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {



  private loggedIn = false;



  login(password: string): boolean {
    // Vérifiez ici les informations d'identification
    // et définissez loggedIn sur true si elles sont valides
      if (password === 'admin123') {
      this.loggedIn = true;
      return true;
    }
    return false;
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  logout(): void {
    this.loggedIn = false;
  }


  authenticate( password: string) {
    throw new Error('Method not implemented.');
  }
  public isAdmin: boolean = false; 

  private connecte = false;
  private utilisateurActuel: any; 
  constructor() {
    this.utilisateurActuel ;
   }

  estConnecte(): boolean {
    return this.connecte;
  }

  connecter(): void {
    this.connecte = true;
  }

  deconnecter(): void {
    this.connecte = false;
  }
 
  
  

 
    setAdmin(status: boolean): void {
      this.isAdmin = status;
    }
  
    isAdminUser(): boolean {
      return this.isAdmin;
    }
  
  

  checkAdmin(): boolean {
    // Implémentez ici la logique pour vérifier si l'utilisateur est administrateur ou non
    return this.isAdmin;
  }
  
}
 