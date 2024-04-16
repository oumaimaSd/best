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

interface dos {
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}

@Component({
  selector: 'app-patch',
  templateUrl: './patch.component.html',
  styleUrls: ['./patch.component.css']
})
export class PatchComponent implements OnInit {
  doss: dos[] = [];

  newdosName: string = '';
  editingdosId: number | null = null;
  filtereddoss: dos[] = []; 
  dosColumns: dos[][] = []; 
  dossPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdosName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddoss = localStorage.getItem('doss');
    
    if (storeddoss) {
      this.doss = JSON.parse(storeddoss);
      this.filtereddoss = this.doss.slice(); 
      this.dosColumns = this.chunkArray(this.filtereddoss, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddoss(): dos[] {
    const startIndex = (this.currentPage - 1) * this.dossPerPage;
    return this.filtereddoss.slice(startIndex, startIndex + this.dossPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddoss.length / this.dossPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondosPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydosName(): void {
    this.filtereddoss = this.doss.filter(dos => 
      dos.name.toLowerCase().includes(this.searchdosName.toLowerCase())
    );
  }

  savedoss(): void {
    localStorage.setItem('doss', JSON.stringify(this.doss));
  }
  showdosInput: boolean = false;

  toggleCreatedosInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdosInput = !this.showdosInput;}else{alert('incorrect code')}
  }


  createdos(): void {
    if (this.newdosName.trim() !== '') {
        const dosNameLowercase = this.newdosName.toLowerCase(); 

        if (!this.isdosNameExists(dosNameLowercase)) {
            const newdos: dos = {
                id: Date.now(),
                name: this.newdosName,
                media: [],
                showContent: false
            };
            this.doss.push(newdos);
            this.filtereddoss.push(newdos);
            this.newdosName = '';
            this.savedoss();
        } else {
            alert('dos name already exists.');
        }
    }
    this.sortdossAlphabetically();

}
sortdossAlphabetically(): void {
  this.filtereddoss.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('doss', JSON.stringify(this.filtereddoss));
}

  
  isdosNameExists(name: string): boolean {
    const dosNames = this.doss.map(dos => dos.name.toLowerCase()); 
    return dosNames.includes(name.toLowerCase()); 
  }
  
  toggledos(dos: dos): void {
    dos.showContent = !dos.showContent;
    this.savedoss();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, dos: dos): void {
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
          dos.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedoss();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(dos: dos, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this dos ?')) {

    const index = dos.media.indexOf(media);
    if (index !== -1) {
      dos.media.splice(index, 1);
      this.savedoss();
    }
  }}
else {alert('incorrect code')}
}


  editdos(dos: dos): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new dos name:', dos.name);
    if (newName && newName.trim() !== '') {
      dos.name = newName.trim();
      
      this.filtereddoss = this.doss.filter(f => 
        f.name.toLowerCase().includes(this.searchdosName.toLowerCase())
      );
  
      this.dosColumns = this.chunkArray(this.filtereddoss, 5);
  
      this.savedoss();
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
      this.savedoss();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedos(dos: dos): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.doss.findIndex(f => f.id === dos.id);
    if (index !== -1) {
      this.doss.splice(index, 1);
      this.filtereddoss = this.doss.slice(); 
      this.savedoss(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(dos: dos): void {
    dos.media = dos.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(dos: dos, type: 'image' | 'video'): void {
    dos.media = dos.media.filter(media => media.type === type);
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
  this.filtereddoss = this.doss.filter(dos => 
    dos.name.toLowerCase().includes(this.searchdosName.toLowerCase()) &&
    dos.media.some(media =>
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
  slogan: string = "Unissant nos talents, chaque patch compte. Ensemble, nous créons des œuvres d'art cousues de précision.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdosName:string ="Filtrer par nom de dos";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Uniting our talents, every patch counts. Together, we create precision-stitched works of art.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdosName = "Filter by dos name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

