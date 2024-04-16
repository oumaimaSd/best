import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';

interface Cut {
  nom: string;
  role: string;
  photo: string; 
  email:string;// vous pouvez changer le type en 'File' si vous stockez l'image localement
}

@Component({
  selector: 'app-addcut',
  templateUrl: './addcut.component.html',
  styleUrls: ['./addcut.component.css']
})
export class AddcutComponent implements OnInit {
  @ViewChild('videoPlayer') videoPlayer: any;
   cuts: Cut[] = [];
   compteur: number = 0; // Variable de compteur
   isAdmin: boolean = false;
   afficherFormulaire = false;
   modifierIndex: number | null = null; // Index du membre à modifier
   nouveauCut: Cut = {
     nom: '',
     role: '',
     photo: '',
     email: ''
   };
   groupesDeProduits: any[] = [];
   selectedFile: any;
 
   constructor(private authService: AuthService) { }
 
   ngOnInit() {
     // Charger les membres depuis localStorage lors du chargement du composant
     const cutsData = localStorage.getItem('cuts');
     if (cutsData) {
       this.cuts = JSON.parse(cutsData);
     }
     this.isAdmin = this.authService.checkAdmin();
 
  
   }
   ngAfterViewInit() {
     const savedVideoSrc = localStorage.getItem('savedVideoSrc');
     if (savedVideoSrc) {
       // Charger la vidéo dans ngAfterViewInit() garantit que la vue est correctement initialisée
this.videoPlayer.nativeElement.src=savedVideoSrc;     }
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
       this.cuts[this.modifierIndex] = { ...this.nouveauCut};
       this.modifierIndex = null;
     } else {
       // Ajout d'un nouveau membre
       this.cuts.push({ ...this.nouveauCut });
     }
     this.nouveauCut = {
       nom: '',
       role: '',
       photo: '',
       email: ''
     };
     this.toggleFormulaire();
     localStorage.setItem('cuts', JSON.stringify(this.cuts));
   }
 
   handlePhotoUpload(event: any) {
     const file = event.target.files[0];
     // Vérifier si un fichier a été sélectionné
     if (file) {
       // Lire le contenu du fichier en tant qu'URL de données (base64)
       const reader = new FileReader();
       reader.onload = () => {
         // Stocker l'URL de données dans la propriété photo du nouveau membre
         this.nouveauCut.photo = reader.result as string;
         // Mettre à jour localStorage avec les membres, y compris la nouvelle image
         localStorage.setItem('cuts', JSON.stringify(this.cuts));
       };
       reader.readAsDataURL(file);
     }
   }
 
   modifierMembre(index: number) {
     // Remplir le formulaire avec les données du membre à modifier
     this.nouveauCut = { ...this.cuts[index] };
     this.modifierIndex = index;
     this.afficherFormulaire = true;
   }
 
   supprimerMembre(index: number) {
     const confirmation = confirm('Êtes-vous sûr de vouloir supprimer ce membre ?');
     if (confirmation) {
       this.cuts.splice(index, 1);
       localStorage.setItem('cuts', JSON.stringify(this.cuts));
       console.log('Supprimer le membre à l\'index', index);
     }
   }
 
   estConnecte(): boolean {
     return this.authService.estConnecte();
   }
 
 chercher(){}
 }
 
 