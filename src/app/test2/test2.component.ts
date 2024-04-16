import { Component, OnInit } from '@angular/core';

interface Image {
  id: number;
  url: string;
  description: string;
}

@Component({
  selector: 'app-test2',
  templateUrl: './test2.component.html',
  styleUrls: ['./test2.component.css']
})
export class Test2Component implements OnInit {
  images: Image[] = [];
  description: string = '';
  selectedFile: File | null = null;
  showForm: boolean = false;
  editMode: boolean = false;
  editedImageId: number | null = null;
  searchText: string = ''; 
 
  
  loadImagesFromLocalStorage() {
    const storedImages = localStorage.getItem('images');
    if (storedImages) {
      this.images = JSON.parse(storedImages);
    } else {
      this.images = [];
    }
  }
  ngOnInit() {
    this.loadImagesFromLocalStorage();

    const storedImages = localStorage.getItem('images');
    if (storedImages) {
      this.images = JSON.parse(storedImages);
    }
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
   
    if (this.selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        if (this.editMode && this.editedImageId !== null) {
          const editedIndex = this.images.findIndex(image => image.id === this.editedImageId);
          if (editedIndex !== -1) {
            this.images[editedIndex].url = imageUrl;
            this.images[editedIndex].description = this.description;
          }
          this.editMode = false;
          this.editedImageId = null;
        } else {
          this.images.push({ id: Date.now(), url: imageUrl, description: this.description });
        }
        this.description = '';
        this.showForm = false;
        localStorage.setItem('images', JSON.stringify(this.images));
      }
      reader.readAsDataURL(this.selectedFile);
    }

  }
  deleteImage(id: number) {
    const userEnteredCode = prompt("Veuillez entrer le code de confirmation :");

    if (userEnteredCode !== null && userEnteredCode.trim() === "123") {
        const index = this.images.findIndex(image => image.id === id);
        if (index !== -1) {
            this.images.splice(index, 1);
            localStorage.setItem('images', JSON.stringify(this.images));
        }
    } else {
        alert("Code de confirmation incorrect. L'image n'a pas été supprimée.");
    }
}



  toggleForm() {
    const userEnteredCode = prompt("Veuillez entrer le code de confirmation :");
    if (userEnteredCode !== null && userEnteredCode.trim() === "123"){
    this.showForm = !this.showForm;
    this.editMode = false;
    this.editedImageId = null;}
    else{
      alert("Code de confirmation incorrect.");

    }
  }
  filteredImages: any[] = [];

  filterImages() {
    if (!this.searchText.trim()) {
      this.filteredImages = this.images;
    } else {
      this.filteredImages = this.images.filter(image =>
        image.description.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }


  fullScreenImage: string | null = null;

  openFullScreenImage(url: string) {
    this.fullScreenImage = url;
  }

  closeFullScreenImage() {
    this.fullScreenImage = null;
  }



}
