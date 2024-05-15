import { Component, OnDestroy } from '@angular/core';
import { ToggleService } from './toggle.service';
import { ThemeService } from './theme.service';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  onToggleTheme(event: string){
throw new Error('Method not implemented.');
}
navigate($event: string) {
throw new Error('Method not implemented.');
}
  title = 'Estimation';
  isToggleButtonChecked!: boolean;
  styleDetails: any;  // Declare styleDetails property
  private themeSubscription!: Subscription;

  constructor(
    private toggleService: ToggleService,
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    // Subscribe to toggle button state changes
    this.toggleService.isToggleButtonChecked$.subscribe((isChecked) => {
      this.isToggleButtonChecked = isChecked;
    });

    // Subscribe to theme changes
    this.themeSubscription = this.themeService.theme$.subscribe((theme) => {
      console.log('Received theme change:', theme);
      document.body.classList.remove('light-theme', 'dark-theme');
      document.body.classList.add(theme + '-theme');
      this.updateStyleDetails(theme);
    });
  }

  ngOnDestroy(): void {
    this.themeSubscription.unsubscribe();
  }

  private updateStyleDetails(theme: string): void {
    // Update styleDetails based on the theme
    if (theme === 'dark') {
      this.styleDetails = {
        theme: 'background-color: black; color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };
    } else if(theme === 'purple') {
      this.styleDetails = {
        theme: 'background-color: rgb(46, 45, 49); color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };

    }
    else if(theme === 'green') {
      this.styleDetails = {
        theme: 'background-color: #031803; color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };

    }
    else if(theme === 'pale') {
      this.styleDetails = {
        theme: 'background-color: #643f28; color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };

    }
    else if(theme === 'blue') {
      this.styleDetails = {
        theme: 'background-color: #002147; color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };

    }
    else {
      this.styleDetails = {
        theme: 'background-color: black; color: white; font-style: bold;',
        deloitteLogo: './assets/images/DeloitteLogo_Black_BG.png',
        deloitteIcon: './assets/images/Deloitte-Symbol.webp',
      };
    }
  }



  
}
