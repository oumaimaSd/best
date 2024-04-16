import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
interface contenu {
  name: string;
  url: string;
  type: 'image' | 'video';
  description: string;
}

interface dob {
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}
@Component({
  selector: 'app-nylon',
  templateUrl: './nylon.component.html',
  styleUrls: ['./nylon.component.css']
})
export class NylonComponent  implements OnInit {
  dobs: dob[] = [];

  newdobName: string = '';
  editingdobId: number | null = null;
  filtereddobs: dob[] = []; 
  dobColumns: dob[][] = []; 
  dobsPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdobName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddobs = localStorage.getItem('dobs');
    
    if (storeddobs) {
      this.dobs = JSON.parse(storeddobs);
      this.filtereddobs = this.dobs.slice(); 
      this.dobColumns = this.chunkArray(this.filtereddobs, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddobs(): dob[] {
    const startIndex = (this.currentPage - 1) * this.dobsPerPage;
    return this.filtereddobs.slice(startIndex, startIndex + this.dobsPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddobs.length / this.dobsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondobPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydobName(): void {
    this.filtereddobs = this.dobs.filter(dob => 
      dob.name.toLowerCase().includes(this.searchdobName.toLowerCase())
    );
  }

  savedobs(): void {
    localStorage.setItem('dobs', JSON.stringify(this.dobs));
  }
  showdobInput: boolean = false;

  toggleCreatedobInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdobInput = !this.showdobInput;}else{alert('incorrect code')}
  }


  createdob(): void {
    if (this.newdobName.trim() !== '') {
        const dobNameLowercase = this.newdobName.toLowerCase(); 

        if (!this.isdobNameExists(dobNameLowercase)) {
            const newdob: dob = {
                id: Date.now(),
                name: this.newdobName,
                media: [],
                showContent: false
            };
            this.dobs.push(newdob);
            this.filtereddobs.push(newdob);
            this.newdobName = '';
            this.savedobs();
        } else {
            alert('dob name already exists.');
        }
    }
    this.sortdobsAlphabetically();

}
sortdobsAlphabetically(): void {
  this.filtereddobs.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('dobs', JSON.stringify(this.filtereddobs));
}

  
  isdobNameExists(name: string): boolean {
    const dobNames = this.dobs.map(dob => dob.name.toLowerCase()); 
    return dobNames.includes(name.toLowerCase()); 
  }
  
  toggledob(dob: dob): void {
    dob.showContent = !dob.showContent;
    this.savedobs();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, dob: dob): void {
    const userEnteredCode = prompt("Please enter confirmation code :");
    if (userEnteredCode === "123") { 
      const fileList: FileList | null = fileInput.files;
      if (fileList && fileList.length > 0) {
        const file: File = fileList[0];
        const reader = new FileReader();
        reader.onload = (e) => {
          const mediaType = file.type.startsWith('image') ? 'image' : 'video';
          const newMedia: contenu = {
            name: file.name,
            url: reader.result as string,
            type: mediaType,
            description: descriptionInput.value
          };
          dob.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedobs();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(dob: dob, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this dob ?')) {

    const index = dob.media.indexOf(media);
    if (index !== -1) {
      dob.media.splice(index, 1);
      this.savedobs();
    }
  }}
else {alert('incorrect code')}
}


  editdob(dob: dob): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new dob name:', dob.name);
    if (newName && newName.trim() !== '') {
      dob.name = newName.trim();
      
      this.filtereddobs = this.dobs.filter(f => 
        f.name.toLowerCase().includes(this.searchdobName.toLowerCase())
      );
  
      this.dobColumns = this.chunkArray(this.filtereddobs, 5);
  
      this.savedobs();
    }
  }
  else  {('incorrect code')}
  }
  
  editMedia(media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newDescription = prompt(`Enter the new description for${media.name} :`, media.description);
    if (newDescription !== null) {
      media.description = newDescription.trim();
      this.savedobs();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedob(dob: dob): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.dobs.findIndex(f => f.id === dob.id);
    if (index !== -1) {
      this.dobs.splice(index, 1);
      this.filtereddobs = this.dobs.slice(); 
      this.savedobs(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(dob: dob): void {
    dob.media = dob.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(dob: dob, type: 'image' | 'video'): void {
    dob.media = dob.media.filter(media => media.type === type);
  }

 
  
    toggleAddFormVisibility(): void {
      const userEnteredCode = prompt("Please enter confirmation code:");
      if (userEnteredCode === "123") {
      this.showAddForm = !this.showAddForm;}
      else{ alert('incorrect code')}
    }

    showAddMediaForm: boolean = false;

toggleAddMediaForm(): void {
  const userEnteredCode = prompt("Please enter confirmation code:");
  if (userEnteredCode === "123") {
  this.showAddMediaForm = !this.showAddMediaForm;}
  else{ alert('incorrect code')}
}

filter(): void {
  this.filtereddobs = this.dobs.filter(dob => 
    dob.name.toLowerCase().includes(this.searchdobName.toLowerCase()) &&
    dob.media.some(media =>
      media.description.toLowerCase().includes(this.searchDescription.toLowerCase()) &&
      (this.searchType === '' || media.type === this.searchType)
    )
  );
}
onPageChange(pageNumber: number): void {
  this.currentPage = pageNumber;
}

  onMediaPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  logout(): void {
    this.authService.logout();

    this.router.navigate(['/home']); 
  }




  companyName: string = "SOCIETE TUNISIENNE D'EEQUIPEMENT DE BATEAUX";
  slogan: string ="Spi de précision, voile vers l'excellence. Notre équipe de spécialistes navigue avec rigueur pour des performances imbattables.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdobName:string ="Filtrer par nom de dossier";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Precise rigging, sailing towards excellence. Our team of specialists navigates with rigor for unbeatable performance.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdobName = "Filter by folder name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

