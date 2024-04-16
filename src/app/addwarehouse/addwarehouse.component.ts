import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

interface Teamware {
  nom: string;
  email:string;
  role: string;
  photo: string; // vous pouvez changer le type en 'File' si vous stockez l'image localement
}
@Component({
  selector: 'app-addwarehouse',
  templateUrl: './addwarehouse.component.html',
  styleUrls: ['./addwarehouse.component.css']
})
export class AddwarehouseComponent  implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: any;

  teamwares: Teamware[] = [];
  isAdmin: boolean = false;
  afficherFormulaire = false;
  modifierIndex: number | null = null;
  nouveauTeamware: Teamware = {
    nom: '',
    email: '',
    role: '',
    photo: ''
  };
  selectedFile: any;
  uploadFormVisible: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const teamwaresData = localStorage.getItem('teamwares');
    if (teamwaresData) {
      this.teamwares = JSON.parse(teamwaresData);
    }
    this.isAdmin = this.authService.checkAdmin();}

    // Charger la vidéo à partir du localStorage si elle existe
    ngAfterViewInit() {
      const savedVideoData = localStorage.getItem('savedVideo');
      if (savedVideoData) {
        const blob = new Blob([savedVideoData], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);
        this.videoPlayer.nativeElement.src = videoUrl;
      }
    }
  toggleFormulaire() {
    this.afficherFormulaire = !this.afficherFormulaire;
  }

  handleFileInput(event: any) {
    this.selectedFile = event.target.files[0];
  }

  toggleUploadForm() {
    this.uploadFormVisible = !this.uploadFormVisible;
  }

  uploadVideo() {
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        // Stocker le fichier vidéo dans localStorage
        localStorage.setItem('savedVideo', reader.result as string);
        
        // Charger la vidéo depuis le Blob
        const blob = new Blob([reader.result as ArrayBuffer], { type: 'video/mp4' });
        const videoUrl = URL.createObjectURL(blob);
        this.videoPlayer.nativeElement.src = videoUrl;
      };
      reader.readAsArrayBuffer(this.selectedFile);
    }
  }
   ajouterMembre() {
     if (this.modifierIndex !== null) {
       // Modification du membre existant
       this.teamwares[this.modifierIndex] = { ...this.nouveauTeamware};
       this.modifierIndex = null;
     } else {
       // Ajout d'un nouveau membre
       this.teamwares.push({ ...this.nouveauTeamware });
     }
     this.nouveauTeamware = {
       nom: '',
       email:'',
       role: '',
       photo: ''
     };
     this.toggleFormulaire();
     localStorage.setItem('teamwares', JSON.stringify(this.teamwares));
   }
 
   handlePhotoUpload(event: any) {
     const file = event.target.files[0];
     // Vérifier si un fichier a été sélectionné
     if (file) {
       // Lire le contenu du fichier en tant qu'URL de données (base64)
       const reader = new FileReader();
       reader.onload = () => {
         // Stocker l'URL de données dans la propriété photo du nouveau membre
         this.nouveauTeamware.photo = reader.result as string;
         // Mettre à jour localStorage avec les membres, y compris la nouvelle image
         localStorage.setItem('teamwares', JSON.stringify(this.teamwares));
       };
       reader.readAsDataURL(file);
     }
   }
 
   modifierMembre(index: number) {
     // Remplir le formulaire avec les données du membre à modifier
     this.nouveauTeamware = { ...this.teamwares[index] };
     this.modifierIndex = index;
     this.afficherFormulaire = true;
   }
 
   supprimerMembre(index: number) {
     const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
     if (confirmation) {
       this.teamwares.splice(index, 1);
       localStorage.setItem('teamwares', JSON.stringify(this.teamwares));
       console.log('Supprimer le teamware à l\'index', index);
     }
   }
 
   estConnecte(): boolean {
     return this.authService.estConnecte();
   }
 
 chercher(){}
 }
 
 