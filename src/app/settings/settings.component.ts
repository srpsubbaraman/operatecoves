import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, Renderer2 } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
// import { ToastrService } from 'ngx-toastr';
import { ThemeService } from '../theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent {
  
  isAccount: boolean = true;
  isAppearance: boolean = false;
  isLanguage: boolean = false;

  selectedTheme: string = '';
 


  async ngAfterViewInit(){
    let u_info =JSON.parse(localStorage.getItem('login_info')!);
        console.log("u_info: "+JSON.stringify(u_info.user))
        if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
         
       (document.getElementById("name")! as HTMLInputElement).value = u_info.user;
       (document.getElementById("email")! as HTMLInputElement).value = u_info.em;
         
        }
        else{
           localStorage.setItem('login_info',"{}");
           await this.router.navigate(['/Login']);
           
        }
  }

  
  ngOnInit(): void {
    
    this.loadGoogleTranslateScript();
  }
 

  private loadGoogleTranslateScript() {
    const script = this.renderer.createElement('script');
    script.type = 'text/javascript';
    script.text = `
    function googleTranslateElementInit() {
      new google.translate.TranslateElement({
        pageLanguage: 'en',
        includedLanguages: 'en,en,ja,zh-CN',
      }, 'google_translate_element');
    }
    `;
    this.renderer.appendChild(document.head, script);
  
    const translateScript = this.renderer.createElement('script');
    translateScript.type = 'text/javascript';
    translateScript.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    this.renderer.appendChild(document.head, translateScript);
  }

  
  constructor(
    private router: Router,
    // ... (existing injections)
    private themeService: ThemeService,
    // private dialogRef: MatDialogRef<SettingsComponent>,
    private renderer: Renderer2 ,
    // private toastr: ToastrService

  ) {}

 
  showAccount(): void {
    this.isAccount = true;
    this.isAppearance = false;
    this.isLanguage = false;
  }

  showAppearance(): void {
    this.isAccount = false;
    this.isAppearance = true;
    this.isLanguage = false;
  }

  showLanguage(): void {
    this.isAccount = false;
    this.isAppearance = false;
    this.isLanguage = true;
  }

  Lighttheme(): void {
    document.body.classList.add('light-theme');
  }

  Darktheme(): void {
    document.body.classList.add('dark-theme');
  }
  PurpleTheme(): void {
    document.body.classList.add('purple-theme');
  }
  GreenTheme(): void {
    document.body.classList.add('green-theme');
  }
  PaleTheme(): void {
    document.body.classList.add('pale-theme');
  }
  BlueTheme(): void {
    document.body.classList.add('blue-theme');
  }

  setTheme(theme: string): void {
    // Remove any existing theme class from body
    document.body.classList.remove('light-theme', 'dark-theme','purple-theme', 'green-theme', 'pale-theme', 'blue-theme' );

    // Set the selected theme
    this.selectedTheme = theme;

    // Add your theme change logic here (Lighttheme() and Darktheme() functions)
    if (theme === 'light') {
      this.Lighttheme();
    } else if (theme === 'dark') {
      this.Darktheme();
    }
    else if (theme === 'purple') {
      this.PurpleTheme();
    }
    else if (theme === 'green') {
      this.GreenTheme();
    }
    else if (theme === 'pale') {
      this.PaleTheme();
    }
    else if (theme === 'blue') {
      this.BlueTheme();
    }
  }

  oncancel(): void {
    console.log('Cancel button clicked');
    // this.dialogRef.close(); // Close the dialog
  }

  // onsave(): void {
  //   this.themeService.setTheme(this.selectedTheme);
  //   console.log('Theme saved:', this.selectedTheme);
  //   this.dialogRef.close(); // Close the dialog after saving
  // }

  onsave(): void {
    this.themeService.setTheme(this.selectedTheme);
    console.log('Theme saved:', this.selectedTheme);
  
    // this.toastr.success('Theme saved', 'Success');
    alert('Settings Saved');
  
    // this.dialogRef.close();
  }
  
}
