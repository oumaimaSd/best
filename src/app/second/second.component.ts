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

interface doq{
  id: number;
  name: string;
  media: contenu[];
  showContent: boolean;
}
@Component({
  selector: 'app-second',
  templateUrl: './second.component.html',
  styleUrls: ['./second.component.css']
})
export class SecondComponent implements OnInit {
  doqs: doq[] = [];

  newdoqName: string = '';
  editingdoqId: number | null = null;
  filtereddoqs: doq[] = []; 
  doqColumns: doq[][] = []; 
  doqsPerPage: number = 5;
  mediaData: any[] = []; 
  currentPage: number = 1; 
  pageSize: number = 10; 
  searchDescription: string = '';
  searchType: string = '';
  searchdoqName: string = '';
  showAddForm: boolean = false; 

  constructor(private authService: AuthService, private router: Router,private http: HttpClient) {} 



  ngOnInit(): void {
    const storeddoqs = localStorage.getItem('doqs');
    
    if (storeddoqs) {
      this.doqs = JSON.parse(storeddoqs);
      this.filtereddoqs = this.doqs.slice(); 
      this.doqColumns = this.chunkArray(this.filtereddoqs, 5);

    }
  }
  chunkArray(array: any[], chunkSize: number): any[][] {
    const result = [];
    for (let i = 0; i < array.length; i += chunkSize) {
      result.push(array.slice(i, i + chunkSize));
    }
    return result;
  }
  get pageddoqs(): doq[] {
    const startIndex = (this.currentPage - 1) * this.doqsPerPage;
    return this.filtereddoqs.slice(startIndex, startIndex + this.doqsPerPage);
  }
  get pageNumberArray(): number[] {
    const totalPages = Math.ceil(this.filtereddoqs.length / this.doqsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }


  ondoqPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
  }
  filterBydoqName(): void {
    this.filtereddoqs = this.doqs.filter(doq=> 
      doq.name.toLowerCase().includes(this.searchdoqName.toLowerCase())
    );
  }

  savedoqs(): void {
    localStorage.setItem('doqs', JSON.stringify(this.doqs));
  }
  showdoqInput: boolean = false;

  toggleCreatedoqInput(): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    this.showdoqInput = !this.showdoqInput;}else{alert('incorrect code')}
  }


  createdoq(): void {
    if (this.newdoqName.trim() !== '') {
        const doqNameLowercase = this.newdoqName.toLowerCase(); 

        if (!this.isdoqNameExists(doqNameLowercase)) {
            const newdoq: doq= {
                id: Date.now(),
                name: this.newdoqName,
                media: [],
                showContent: false
            };
            this.doqs.push(newdoq);
            this.filtereddoqs.push(newdoq);
            this.newdoqName = '';
            this.savedoqs();
        } else {
            alert('doqname already exists.');
        }
    }
    this.sortdoqsAlphabetically();

}
sortdoqsAlphabetically(): void {
  this.filtereddoqs.sort((a, b) => a.name.localeCompare(b.name));
  localStorage.setItem('doqs', JSON.stringify(this.filtereddoqs));
}

  
  isdoqNameExists(name: string): boolean {
    const doqNames = this.doqs.map(doq=> doq.name.toLowerCase()); 
    return doqNames.includes(name.toLowerCase()); 
  }
  
  toggledoq(doq: doq): void {
    doq.showContent = !doq.showContent;
    this.savedoqs();
  }
  noFileSelectedMessage: string = "No file selected";
  incorrectCodeMessage: string = "Incorrect code";

  addMedia(fileInput: HTMLInputElement, descriptionInput: HTMLInputElement, doq: doq): void {
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
          doq.media.push(newMedia);
          fileInput.value = ''; 
          descriptionInput.value = ''; 
          this.savedoqs();
        };
        reader.readAsDataURL(file);
      } else {
        alert(this.noFileSelectedMessage);
      }
    } else {
      alert(this.incorrectCodeMessage);
    }
  }
  

  deleteMedia(doq: doq, media: contenu): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    if (confirm('Are you sure you want to delete this doq?')) {

    const index = doq.media.indexOf(media);
    if (index !== -1) {
      doq.media.splice(index, 1);
      this.savedoqs();
    }
  }}
else {alert('incorrect code')}
}


  editdoq(doq: doq): void {
    const userEnteredCode = prompt("Please enter confirmation code:");
    if (userEnteredCode === "123") { 
    const newName = prompt('Enter the new doqname:', doq.name);
    if (newName && newName.trim() !== '') {
      doq.name = newName.trim();
      
      this.filtereddoqs = this.doqs.filter(f => 
        f.name.toLowerCase().includes(this.searchdoqName.toLowerCase())
      );
  
      this.doqColumns = this.chunkArray(this.filtereddoqs, 5);
  
      this.savedoqs();
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
      this.savedoqs();
    }
  }
  else {
    alert('incorrect code')
  }
}
deletedoq(doq: doq): void {
  const userEnteredCode = prompt("Enter the new description for :");
  if (userEnteredCode === "123") { 
    const index = this.doqs.findIndex(f => f.id === doq.id);
    if (index !== -1) {
      this.doqs.splice(index, 1);
      this.filtereddoqs = this.doqs.slice(); 
      this.savedoqs(); 
    }
  } else {
    alert("incorrect code.");
  }
}



  filterByDescription(doq: doq): void {
    doq.media = doq.media.filter(media => media.description.includes(this.searchDescription));
  }
  

  filterByType(doq: doq, type: 'image' | 'video'): void {
    doq.media = doq.media.filter(media => media.type === type);
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
  this.filtereddoqs = this.doqs.filter(doq=> 
    doq.name.toLowerCase().includes(this.searchdoqName.toLowerCase()) &&
    doq.media.some(media =>
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
  slogan: string = "Deuxième couture, première perfection. Avec précision et détermination, notre équipe Second Sew excelle dans chaque détail.";
  placeholderDescription: string = "Filtrer par description";
  placeholderdoqName:string ="Filtrer par nom de dossier";
  allTypesOption: string = "Tous les types";
  nomboutton:string= "Créer";
  nomboutton2:string="filtrer";
  nomboutton3:string="Ajouter";

translateToEnglish(): void {
    this.companyName = "Tunisian Boat Equipment Company";
    this.slogan = "Second stitch, first perfection. With precision and determination, our Second Sew team excels in every detail.";
    this.placeholderDescription = "Filter by description";
    this.placeholderdoqName = "Filter by folder name";
    this.allTypesOption = "All types";
    this.nomboutton="Create";
    this.nomboutton2="filter";
    this.nomboutton3="Add"

  }

 
  


  }
  
  

