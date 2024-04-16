import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

interface Teamware {
  nom: string;
  email:string;
  role: string;
  photo: string; // vous pouvez changer le type en 'File' si vous stockez l'image localement
}
@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent 

implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: any;
   teamwares: Teamware[] = [];
   compteur: number = 0; // Variable de compteur
   isAdmin: boolean = false;
   afficherFormulaire = false;
   modifierIndex: number | null = null; // Index du membre à modifier
   nouveauTeamware: Teamware = {
     nom: '',
     email:'',
     role: '',
     photo: ''
   };
   groupesDeProduits: any[] = [];
   selectedFile: any;
 
   constructor(private authService: AuthService) { }
 
   ngOnInit() {
     // Charger les membres depuis localStorage lors du chargement du composant
     const teamwaresData = localStorage.getItem('teamwares');
     if (teamwaresData) {
       this.teamwares = JSON.parse(teamwaresData);
     }
     this.isAdmin = this.authService.checkAdmin();
 
  
   }
   ngAfterViewInit() {
     const savedVideoSrc = localStorage.getItem('savedVideoSrc');
     if (savedVideoSrc) {
       // Charger la vidéo dans ngAfterViewInit() garantit que la vue est correctement initialisée
       this.videoPlayer.nativeElement.src = savedVideoSrc;
     }
   }
   toggleFormulaire() {
     this.afficherFormulaire = !this.afficherFormulaire;
   }
   handleFileInput(event: any) {
     this.selectedFile = event.target.files[0];
   }
   uploadFormVisible: boolean = false;
   toggleUploadForm() {
     this.uploadFormVisible = !this.uploadFormVisible;
   }
 
   showUploadForm() {
     this.uploadFormVisible = true;
   }
   uploadVideo() {
     if (this.selectedFile) {
       const reader = new FileReader();
       reader.onload = () => {
         this.videoPlayer.nativeElement.src = reader.result as string;
         this.videoPlayer.nativeElement.play();
         localStorage.setItem('savedVideoSrc', reader.result as string);
   
       }
       reader.readAsDataURL(this.selectedFile);
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
 
 