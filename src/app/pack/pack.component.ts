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

interface doa {
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}
@Component({
  selector: 'app-pack',
  templateUrl: './pack.component.html',
  styleUrls: ['./pack.component.css']
})
export class PackComponent implements OnInit {
  doas: doa[] = [];

  newdoaName: string = '';
  editingdoaId: number | null = null;
  filtereddoas: doa[] = []; 
  doaColumns: doa[][] = []; 
  doasPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdoaName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddoas = localStorage.getItem('doas');
    
    if (storeddoas) {
      this.doas = JSON.parse(storeddoas);
      this.filtereddoas = this.doas.slice(); 
      this.doaColumns = this.chunkArray(this.filtereddoas, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddoas(): doa[] {
    const startIndex = (this.currentPage - 1) * this.doasPerPage;
    return this.filtereddoas.slice(startIndex, startIndex + this.doasPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddoas.length / this.doasPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondoaPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydoaName(): void {
    this.filtereddoas = this.doas.filter(doa => 
      doa.name.toLowerCase().includes(this.searchdoaName.toLowerCase())
    );
  }

  savedoas(): void {
    localStorage.setItem('doas', JSON.stringify(this.doas));
  }
  showdoaInput: boolean = false;

  toggleCreatedoaInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdoaInput = !this.showdoaInput;}else{alert('incorrect code')}
  }


  createdoa(): void {
    if (this.newdoaName.trim() !== '') {
        const doaNameLowercase = this.newdoaName.toLowerCase(); 

        if (!this.isdoaNameExists(doaNameLowercase)) {
            const newdoa: doa = {
                id: Date.now(),
                name: this.newdoaName,
                media: [],
                showContent: false
            };
            this.doas.push(newdoa);
            this.filtereddoas.push(newdoa);
            this.newdoaName = '';
            this.savedoas();
        } else {
            alert('doa name already exists.');
        }
    }
    this.sortdoasAlphabetically();

}
sortdoasAlphabetically(): void {
  this.filtereddoas.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('doas', JSON.stringify(this.filtereddoas));
}

  
  isdoaNameExists(name: string): boolean {
    const doaNames = this.doas.map(doa => doa.name.toLowerCase()); 
    return doaNames.includes(name.toLowerCase()); 
  }
  
  toggledoa(doa: doa): void {
    doa.showContent = !doa.showContent;
    this.savedoas();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, doa: doa): void {
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
          doa.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedoas();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(doa: doa, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this doa ?')) {

    const index = doa.media.indexOf(media);
    if (index !== -1) {
      doa.media.splice(index, 1);
      this.savedoas();
    }
  }}
else {alert('incorrect code')}
}


  editdoa(doa: doa): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new doa name:', doa.name);
    if (newName && newName.trim() !== '') {
      doa.name = newName.trim();
      
      this.filtereddoas = this.doas.filter(f => 
        f.name.toLowerCase().includes(this.searchdoaName.toLowerCase())
      );
  
      this.doaColumns = this.chunkArray(this.filtereddoas, 5);
  
      this.savedoas();
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
      this.savedoas();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedoa(doa: doa): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.doas.findIndex(f => f.id === doa.id);
    if (index !== -1) {
      this.doas.splice(index, 1);
      this.filtereddoas = this.doas.slice(); 
      this.savedoas(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(doa: doa): void {
    doa.media = doa.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(doa: doa, type: 'image' | 'video'): void {
    doa.media = doa.media.filter(media => media.type === type);
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
  this.filtereddoas = this.doas.filter(doa => 
    doa.name.toLowerCase().includes(this.searchdoaName.toLowerCase()) &&
    doa.media.some(media =>
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
  slogan: string = "Emballage avec précision, livraison de qualité. Notre équipe Packaging assure une présentation parfaite à chaque étape.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdoaName:string ="Filtrer par nom de dossier";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Precise packaging, quality delivery. Our Packaging team ensures perfect presentation at every step.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdoaName = "Filter by folder name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

