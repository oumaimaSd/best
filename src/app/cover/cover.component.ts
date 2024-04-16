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

interface dox {
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}

@Component({
  selector: 'app-cover',
  templateUrl: './cover.component.html',
  styleUrls: ['./cover.component.css']
})
export class CoverComponent  implements OnInit {
  doxs: dox[] = [];

  newdoxName: string = '';
  editingdoxId: number | null = null;
  filtereddoxs: dox[] = []; 
  doxColumns: dox[][] = []; 
  doxsPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdoxName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddoxs = localStorage.getItem('doxs');
    
    if (storeddoxs) {
      this.doxs = JSON.parse(storeddoxs);
      this.filtereddoxs = this.doxs.slice(); 
      this.doxColumns = this.chunkArray(this.filtereddoxs, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddoxs(): dox[] {
    const startIndex = (this.currentPage - 1) * this.doxsPerPage;
    return this.filtereddoxs.slice(startIndex, startIndex + this.doxsPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddoxs.length / this.doxsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondoxPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydoxName(): void {
    this.filtereddoxs = this.doxs.filter(dox => 
      dox.name.toLowerCase().includes(this.searchdoxName.toLowerCase())
    );
  }

  savedoxs(): void {
    localStorage.setItem('doxs', JSON.stringify(this.doxs));
  }
  showdoxInput: boolean = false;

  toggleCreatedoxInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdoxInput = !this.showdoxInput;}else{alert('incorrect code')}
  }


  createdox(): void {
    if (this.newdoxName.trim() !== '') {
        const doxNameLowercase = this.newdoxName.toLowerCase(); 

        if (!this.isdoxNameExists(doxNameLowercase)) {
            const newdox: dox = {
                id: Date.now(),
                name: this.newdoxName,
                media: [],
                showContent: false
            };
            this.doxs.push(newdox);
            this.filtereddoxs.push(newdox);
            this.newdoxName = '';
            this.savedoxs();
        } else {
            alert('folder name already exists.');
        }
    }
    this.sortdoxsAlphabetically();

}

sortdoxsAlphabetically(): void {
  this.filtereddoxs.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('doxs', JSON.stringify(this.filtereddoxs));
}

  
  isdoxNameExists(name: string): boolean {
    const doxNames = this.doxs.map(dox => dox.name.toLowerCase()); 
    return doxNames.includes(name.toLowerCase()); 
  }
  
  toggledox(dox: dox): void {
    dox.showContent = !dox.showContent;
    this.savedoxs();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, dox: dox): void {
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
          dox.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedoxs();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(dox: dox, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this dox ?')) {

    const index = dox.media.indexOf(media);
    if (index !== -1) {
      dox.media.splice(index, 1);
      this.savedoxs();
    }
  }}
else {alert('incorrect code')}
}


  editdox(dox: dox): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new dox name:', dox.name);
    if (newName && newName.trim() !== '') {
      dox.name = newName.trim();
      
      this.filtereddoxs = this.doxs.filter(f => 
        f.name.toLowerCase().includes(this.searchdoxName.toLowerCase())
      );
  
      this.doxColumns = this.chunkArray(this.filtereddoxs, 5);
  
      this.savedoxs();
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
      this.savedoxs();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedox(dox: dox): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.doxs.findIndex(f => f.id === dox.id);
    if (index !== -1) {
      this.doxs.splice(index, 1);
      this.filtereddoxs = this.doxs.slice(); 
      this.savedoxs(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(dox: dox): void {
    dox.media = dox.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(dox: dox, type: 'image' | 'video'): void {
    dox.media = dox.media.filter(media => media.type === type);
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
  this.filtereddoxs = this.doxs.filter(dox => 
    dox.name.toLowerCase().includes(this.searchdoxName.toLowerCase()) &&
    dox.media.some(media =>
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
  slogan: string = "Sacs à la perfection. Notre équipe de spécialistes des sacs garantit qualité, durabilité et style à chaque création.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdoxName:string ="Filtrer par nom de dossier";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Bags to perfection. Our team of bag specialists ensures quality, durability, and style in every creation.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdoxName = "Filter by folder name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

