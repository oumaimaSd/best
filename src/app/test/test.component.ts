import { Component } from '@angular/core';

interface Image {
  url: string;
  title: string;
  description: string;
}

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent {

 isAdmin: boolean = false;
 password: string = ''; 


 
 

  photosSupprimees: any[] = [];

  ngOnInit() {
    // Charger les photos filtrées depuis le localStorage
    const storedTextesFiltres = localStorage.getItem('textesFiltres');
    if (storedTextesFiltres) {
      this.textesFiltres = JSON.parse(storedTextesFiltres);
    } else {
      // Initialisez vos données de photo ici si elles ne sont pas déjà stockées
      this.textesFiltres = [
        { url: 'assets/img/5.jpg', title: 'Photo 1', description: 'Description de la photo 1' },
        { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 2' },
        { url: 'assets/img/3.jpg', title: 'Photo 3', description: 'Description de la photo 3' },
        { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 4' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 4' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 6' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 3' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 2' },
        { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
      ];
    }

    // Charger les photos supprimées depuis le localStorage
    const storedPhotosSupprimees = localStorage.getItem('photosSupprimees');
    if (storedPhotosSupprimees) {
      this.photosSupprimees = JSON.parse(storedPhotosSupprimees);
    }
  }
  photos: Image[] = [
   
    { url: 'assets/img/5.jpg', title: 'Photo 1', description: 'Description de la photo 1' },
    { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 2' },
    { url: 'assets/img/3.jpg', title: 'Photo 3', description: 'Description de la photo 3' },
    { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 4' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },

    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 4' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 6' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 3' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 2' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },

  ];

  textesFiltres: any[] = [
  

    { url: 'assets/img/5.jpg', title: 'Photo 1', description: 'Description de la photo 1' },
    { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 2' },
    { url: 'assets/img/3.jpg', title: 'Photo 3', description: 'Description de la photo 3' },
    { url: 'assets/img/5.jpg', title: 'Photo 2', description: 'Description de la photo 4' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },

    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 4' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 6' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 3' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 2' },
    { url: 'assets/img/5.jpg', title: 'Photo 6', description: 'Description de la photo 5' },
  ];

  estSupprimee(photo: any): boolean {
    return this.photosSupprimees.includes(photo);
  }
  
  


  codeConfirmation: string = ''; 

  demanderConfirmation(photo: any) {
    const codeSaisi = prompt("Pour supprimer cette photo, veuillez entrer le code de confirmation :");

    if (codeSaisi === '123') {
      this.supprimerPhoto(photo);
    } else {
      alert("Code de confirmation incorrect. La photo n'a pas été supprimée.");
    }
  }



  supprimerPhoto(photo: any) {
    const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer cette photo ?");
    if (confirmation) {
      this.photosSupprimees.push(photo);
      const index = this.textesFiltres.indexOf(photo);
      if (index !== -1) {
        this.textesFiltres.splice(index, 1);
      }
      localStorage.setItem('textesFiltres', JSON.stringify(this.textesFiltres));
      localStorage.setItem('photosSupprimees', JSON.stringify(this.photosSupprimees));
    }
  }
  recherche: string = '';

  filtrer(): void {
    if (this.recherche.trim() === '') {
      this.textesFiltres = this.photos;
    } else {
      this.textesFiltres = this.photos.filter(photo =>
        photo.description.toLowerCase().includes(this.recherche.toLowerCase())
      );
    }
  }

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
}
