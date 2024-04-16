import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test3',
  templateUrl: './test3.component.html',
  styleUrls: ['./test3.component.css']
})
export class Test3Component  {

  
    openFullScreen(photoSrc: string): void {
      const imgElement = document.createElement('img');
      imgElement.src = photoSrc;
      imgElement.style.width = '100%';
      imgElement.style.height = '100%';
      imgElement.style.position = 'fixed';
      imgElement.style.top = '0';
      imgElement.style.left = '0';
      imgElement.style.zIndex = '9999';
      imgElement.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
      imgElement.style.cursor = 'pointer';
      imgElement.addEventListener('click', () => {
        document.body.removeChild(imgElement);
      });
      document.body.appendChild(imgElement);
    }
  
  
    searchValue: string = '';
    folders: string[] = ['Description de la photo 1','Description de la photo 2','Description de la photo 3','Description de la photo 4'];
    searchResults: string[] = []; // Tableau pour stocker les résultats de la recherche
  
    filterFolders() {
      // Si la valeur de recherche est vide, afficher tous les dossiers
      if (!this.searchValue.trim()) {
        return this.folders;
      }
      // Sinon, filtrer les dossiers en fonction de la valeur de recherche
      return this.folders.filter(folder => folder.toLowerCase().includes(this.searchValue.toLowerCase()));
    }
  
    searchFolder() {
      // Réinitialiser les résultats de la recherche
      this.searchResults = [];
  
      // Parcourir tous les dossiers
      for (let folder of this.folders) {
        // Si le dossier correspond à la valeur de recherche, l'ajouter aux résultats de la recherche
        if (folder.toLowerCase() === this.searchValue.toLowerCase()) {
          this.searchResults.push(folder);
        }
      }
  
      // Si aucun résultat n'est trouvé, afficher un message d'alerte
      if (this.searchResults.length === 0) {
        alert('Dossier non trouvé.');
      } else {
        // Si des résultats sont trouvés, afficher les dossiers trouvés
        alert('Dossier trouvé: ' + this.searchResults.join(', '));
      }
    }
  }
  
  
  
   
