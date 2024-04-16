import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
interface Spi {
  nom: string;
  role: string;
  photo: string; // vous pouvez changer le type en 'File' si vous stockez l'image localement
}

@Component({
  selector: 'app-spinnker',
  templateUrl: './spinnker.component.html',
  styleUrls: ['./spinnker.component.css']
})
export class SpinnkerComponent implements OnInit {

 spis: Spi[] = [];
  compteur: number = 0; // Variable de compteur
  isAdmin: boolean = false;
  afficherFormulaire = false;
  modifierIndex: number | null = null; // Index du membre à modifier
  nouveauSpi: Spi = {
    nom: '',
    role: '',
    photo: ''
  };
  groupesDeProduits: any[] = [];

  constructor(private authService: AuthService) { }

  ngOnInit() {
    // Charger les membres depuis localStorage lors du chargement du composant
    const spisData = localStorage.getItem('spis');
    if (spisData) {
      this.spis = JSON.parse(spisData);
    }
    this.isAdmin = this.authService.checkAdmin();
  }

  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  ajouterMembre() {
    if (this.modifierIndex !== null) {
      // Modification du membre existant
      this.spis[this.modifierIndex] = { ...this.nouveauSpi };
      this.modifierIndex = null;
    } else {
      // Ajout d'un nouveau membre
      this.spis.push({ ...this.nouveauSpi });
    }
    this.nouveauSpi = {
      nom: '',
      role: '',
      photo: ''
    };
    this.toggleFormulaire();
    localStorage.setItem('spis', JSON.stringify(this.spis));
  }

  handlePhotoUpload(event: any) {
    const file = event.target.files[0];
    // Vérifier si un fichier a été sélectionné
    if (file) {
      // Lire le contenu du fichier en tant qu'URL de données (base64)
      const reader = new FileReader();
      reader.onload = () => {
        // Stocker l'URL de données dans la propriété photo du nouveau membre
        this.nouveauSpi.photo = reader.result as string;
        // Mettre à jour localStorage avec les membres, y compris la nouvelle image
        localStorage.setItem('spis', JSON.stringify(this.spis));
      };
      reader.readAsDataURL(file);
    }
  }

  modifierMembre(index: number) {
    // Remplir le formulaire avec les données du membre à modifier
    this.nouveauSpi = { ...this.spis[index] };
    this.modifierIndex = index;
    this.afficherFormulaire = true;
  }

  supprimerMembre(index: number) {
    const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
    if (confirmation) {
      this.spis.splice(index, 1);
      localStorage.setItem('spis', JSON.stringify(this.spis));
      console.log('Supprimer le spi à l\'index', index);
    }
  }

  estConnecte(): boolean {
    return this.authService.estConnecte();
  }


}
