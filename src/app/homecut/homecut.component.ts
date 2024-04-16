import { Component } from '@angular/core';

interface Dossier {
  nom: string;
}

@Component({
  selector: 'app-homecut',
  templateUrl: './homecut.component.html',
  styleUrls: ['./homecut.component.css']
})
export class HomecutComponent {
  dossiers: Dossier[] = [
    { nom: 'Dossier 1' },
    { nom: 'Dossier 2' },
    { nom: 'Dossier 3' }
  ];

  nouveauDossier: Dossier = { nom: '' };

  ajouterDossier() {
    if (this.nouveauDossier.nom.trim() !== '') {
      this.dossiers.push({ nom: this.nouveauDossier.nom });
      this.nouveauDossier.nom = '';
    }
  }

  supprimerDossier(dossier: Dossier) {
    const index = this.dossiers.indexOf(dossier);
    if (index !== -1) {
      this.dossiers.splice(index, 1);
    }
  }

  editerDossier(dossier: Dossier) {
    const nouveauNom = prompt('Nouveau nom du dossier :', dossier.nom);
    if (nouveauNom !== null) {
      dossier.nom = nouveauNom;
    }
  }
}
