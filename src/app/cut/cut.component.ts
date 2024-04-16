import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-cut',
  templateUrl: './cut.component.html',
  styleUrls: ['./cut.component.css']
})
export class CutComponent
{ searchValue: string = '';
folders: string[] = ['Dossier 1', 'Dossier 2', 'Dossier 3', 'Dossier 4', 'Dossier 5','Dossier 6'];
searchResults: string[] = []; 

filterFolders() {
  if (!this.searchValue.trim()) {
    return this.folders;
  }
  return this.folders.filter(folder => folder.toLowerCase().includes(this.searchValue.toLowerCase()));
}

searchFolder() {
  this.searchResults = [];

  for (let folder of this.folders) {
    if (folder.toLowerCase() === this.searchValue.toLowerCase()) {
      this.searchResults.push(folder);
    }
  }

  if (this.searchResults.length === 0) {
    alert('Folder not found :(');
  } else {
    alert('Dossier trouvé: ' + this.searchResults.join(', '));
  }
}
}

