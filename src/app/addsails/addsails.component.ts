import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
interface sail {
  nom: string;
  role: string;
  photo: string; // vous pouvez changer le type en 'File' si vous stockez l'image localement
}

@Component({
  selector: 'app-addsails',
  templateUrl: './addsails.component.html',
  styleUrls: ['./addsails.component.css']
})
export class AddsailsComponent implements OnInit {

  sails: sail[] = [];
  compteur: number = 0; // Variable de compteur
  isAdmin: boolean = false;
  afficherFormulaire = false;
  modifierIndex: number | null = null; // Index du membre à modifier
  nouveauSail: sail = {
    nom: '',
    role: '',
    photo: ''
  };
  currentImageIndex: number = 0; // Déclaration explicite du type

  groupesDeProduits: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Charger les membres depuis localStorage lors du chargement du composant
    const sailsData = localStorage.getItem('sails');
    if (sailsData) {
      this.sails = JSON.parse(sailsData);
    }
    this.isAdmin = this.authService.checkAdmin();
  }
 

  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  ajouterMembre() {
    if (this.modifierIndex !== null) {
      // Modification du membre existant
      this.sails[this.modifierIndex] = { ...this.nouveauSail};
      this.modifierIndex = null;
    } else {
      // Ajout d'un nouveau membre
      this.sails.push({ ...this.nouveauSail});
    }
    this.nouveauSail = {
      nom: '',
      role: '',
      photo: ''
    };
    this.toggleFormulaire();
    localStorage.setItem('sails', JSON.stringify(this.sails));
  }

  handlePhotoUpload(event: any) {
    const file = event.target.files[0];
    // Vérifier si un fichier a été sélectionné
    if (file) {
      // Lire le contenu du fichier en tant qu'URL de données (base64)
      const reader = new FileReader();
      reader.onload = () => {
        // Stocker l'URL de données dans la propriété photo du nouveau membre
        this.nouveauSail.photo = reader.result as string;
        // Mettre à jour localStorage avec les membres, y compris la nouvelle image
        localStorage.setItem('sails', JSON.stringify(this.sails));
      };
      reader.readAsDataURL(file);
    }
  }

  modifierMembre(index: number) {
    // Remplir le formulaire avec les données du membre à modifier
    this.nouveauSail = { ...this.sails[index] };
    this.modifierIndex = index;
    this.afficherFormulaire = true;
  }

  supprimerMembre(index: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
    if (confirmation) {
      this.sails.splice(index, 1);
      localStorage.setItem('sails', JSON.stringify(this.sails));
      console.log('Supprimer le sail à l\'index', index);
    }
  }

  estConnecte(): boolean {
    return this.authService.estConnecte();
  }

  
}
