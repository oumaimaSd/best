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

interface dossier {
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}
@Component({
  selector: 'app-packb',
  templateUrl: './packb.component.html',
  styleUrls: ['./packb.component.css']
})

export class PackbComponent  implements OnInit {
  dossiers: dossier[] = [];

  newdossierName: string = '';
  editingdossierId: number | null = null;
  filtereddossiers: dossier[] = []; 
  dossierColumns: dossier[][] = []; 
  dossiersPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdossierName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddossiers = localStorage.getItem('dossiers');
    
    if (storeddossiers) {
      this.dossiers = JSON.parse(storeddossiers);
      this.filtereddossiers = this.dossiers.slice(); 
      this.dossierColumns = this.chunkArray(this.filtereddossiers, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddossiers(): dossier[] {
    const startIndex = (this.currentPage - 1) * this.dossiersPerPage;
    return this.filtereddossiers.slice(startIndex, startIndex + this.dossiersPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddossiers.length / this.dossiersPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondossierPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydossierName(): void {
    this.filtereddossiers = this.dossiers.filter(dossier => 
      dossier.name.toLowerCase().includes(this.searchdossierName.toLowerCase())
    );
  }

  savedossiers(): void {
    localStorage.setItem('dossiers', JSON.stringify(this.dossiers));
  }
  showdossierInput: boolean = false;

  toggleCreatedossierInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdossierInput = !this.showdossierInput;}else{alert('incorrect code')}
  }


  createdossier(): void {
    if (this.newdossierName.trim() !== '') {
        const dossierNameLowercase = this.newdossierName.toLowerCase(); 

        if (!this.isdossierNameExists(dossierNameLowercase)) {
            const newdossier: dossier = {
                id: Date.now(),
                name: this.newdossierName,
                media: [],
                showContent: false
            };
            this.dossiers.push(newdossier);
            this.filtereddossiers.push(newdossier);
            this.newdossierName = '';
            this.savedossiers();
        } else {
            alert('dossier name already exists.');
        }
    }
    this.sortdossiersAlphabetically();

}
sortdossiersAlphabetically(): void {
  this.filtereddossiers.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('dossiers', JSON.stringify(this.filtereddossiers));
}

  
  isdossierNameExists(name: string): boolean {
    const dossierNames = this.dossiers.map(dossier => dossier.name.toLowerCase()); 
    return dossierNames.includes(name.toLowerCase()); 
  }
  
  toggledossier(dossier: dossier): void {
    dossier.showContent = !dossier.showContent;
    this.savedossiers();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, dossier: dossier): void {
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
          dossier.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedossiers();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(dossier: dossier, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this dossier ?')) {

    const index = dossier.media.indexOf(media);
    if (index !== -1) {
      dossier.media.splice(index, 1);
      this.savedossiers();
    }
  }}
else {alert('incorrect code')}
}


  editdossier(dossier: dossier): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new dossier name:', dossier.name);
    if (newName && newName.trim() !== '') {
      dossier.name = newName.trim();
      
      this.filtereddossiers = this.dossiers.filter(f => 
        f.name.toLowerCase().includes(this.searchdossierName.toLowerCase())
      );
  
      this.dossierColumns = this.chunkArray(this.filtereddossiers, 5);
  
      this.savedossiers();
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
      this.savedossiers();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedossier(dossier: dossier): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.dossiers.findIndex(f => f.id === dossier.id);
    if (index !== -1) {
      this.dossiers.splice(index, 1);
      this.filtereddossiers = this.dossiers.slice(); 
      this.savedossiers(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(dossier: dossier): void {
    dossier.media = dossier.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(dossier: dossier, type: 'image' | 'video'): void {
    dossier.media = dossier.media.filter(media => media.type === type);
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
  this.filtereddossiers = this.dossiers.filter(dossier => 
    dossier.name.toLowerCase().includes(this.searchdossierName.toLowerCase()) &&
    dossier.media.some(media =>
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
  slogan: string = "Précision dans les moindres plis, qualité dans chaque point - Ensemble, l'équipe Pocket Batten fait briller chaque projet.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdossierName:string ="Filtrer par nom de dossier";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Precision in every fold, quality in every stitch - Together, the Pocket Batten team makes every project shine.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdossierName = "Filter by dossier name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

