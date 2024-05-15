// footer.component.ts

import { Component} from '@angular/core';
import { ToggleService } from '../toggle.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']  // Correct property name is styleUrls
})
export class FooterComponent {
 
  isToggleButtonChecked!: boolean;
  currentYear: number = new Date().getFullYear();  
  
  
  constructor(private toggleService: ToggleService) {}

  ngOnInit() {
    // Subscribe to toggle button state changes
    this.toggleService.isToggleButtonChecked$.subscribe((isChecked) => {
      this.isToggleButtonChecked = isChecked;
    });
  }

  getCurrentYear(): void {
    const currentDate = new Date();
    this.currentYear = currentDate.getFullYear();
  }



  
redirectToEmail() {
  window.location.href = 'mailto:inconetpsapopt@deloitte.com';
}

openTeamProfileInNewWindow() {
  const teamProfileUrl = 'LocTeamComponent';
  window.open(teamProfileUrl, '_blank');
}


redirectToMemories() {
  const teamProfileUrl = 'MemoriesComponent';
  window.open(teamProfileUrl, '_blank');
}


}
