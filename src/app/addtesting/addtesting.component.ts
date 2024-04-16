import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
interface Embre {
  nom: string;
  role: string;
  photo: string; // vous pouvez changer le type en 'File' si vous stockez l'image localement
}
@Component({
  selector: 'app-addtesting',
  templateUrl: './addtesting.component.html',
  styleUrls: ['./addtesting.component.css']
})
export class AddtestingComponent 


implements OnInit {
  filtreNom: string = ''; // Ajout de la propriété filtreNom

  embres: Embre[] = [];
  compteur: number = 0; // Variable de compteur
  isAdmin: boolean = false;
  afficherFormulaire = false;
  modifierIndex: number | null = null; // Index du membre à modifier
  nouveauEmbre: Embre = {
    nom: '',
    role: '',
    photo: ''
  };
  groupesDeProduits: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    
    const embresData = localStorage.getItem('embres');
    if (embresData) {
      this.embres = JSON.parse(embresData);
    }
    this.isAdmin = this.authService.checkAdmin();
  }

  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  ajouterMembre() {
    if (this.modifierIndex !== null) {
      // Modification du membre existant
      this.embres[this.modifierIndex] = { ...this.nouveauEmbre };
      this.modifierIndex = null;
    } else {
      // Ajout d'un nouveau membre
      this.embres.push({ ...this.nouveauEmbre });
    }
    this.nouveauEmbre = {
      nom: '',
      role: '',
      photo: ''
    };
    this.toggleFormulaire();
    localStorage.setItem('embres', JSON.stringify(this.embres));
  }

  handlePhotoUpload(event: any) {
    const file = event.target.files[0];
    // Vérifier si un fichier a été sélectionné
    if (file) {
      // Lire le contenu du fichier en tant qu'URL de données (base64)
      const reader = new FileReader();
      reader.onload = () => {
        // Stocker l'URL de données dans la propriété photo du nouveau membre
        this.nouveauEmbre.photo = reader.result as string;
        // Mettre à jour localStorage avec les membres, y compris la nouvelle image
        localStorage.setItem('membres', JSON.stringify(this.embres));
      };
      reader.readAsDataURL(file);
    }
  }

  modifierMembre(index: number) {
    // Remplir le formulaire avec les données du membre à modifier
    this.nouveauEmbre = { ...this.embres[index] };
    this.modifierIndex = index;
    this.afficherFormulaire = true;
  }

  supprimerMembre(index: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
    if (confirmation) {
      this.embres.splice(index, 1);
      localStorage.setItem('membres', JSON.stringify(this.embres));
      console.log('Supprimer le membre à l\'index', index);
    }
  }

  estConnecte(): boolean {
    return this.authService.estConnecte();
  }

 
  
}



