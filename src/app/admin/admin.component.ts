import dayGridPlugin from '@fullcalendar/daygrid';
import {Component, ViewChild, AfterViewInit} from "@angular/core";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {

	calendarPlugins = [dayGridPlugin]; // important!
	calendarEvents = [
	  // initial events here
	  { title: 'Event 1', date: '2024-03-20' },
	  { title: 'Event 2', date: '2024-03-25' }
	];
  
	








	





}




