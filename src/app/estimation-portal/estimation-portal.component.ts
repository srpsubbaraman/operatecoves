import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { AbapComponent } from '../abap/abap.component';
import { Router } from '@angular/router';

 

@Component({
  selector: 'app-estimation-portal',
  templateUrl: './estimation-portal.component.html',
  styleUrls: ['./estimation-portal.component.scss'],
  
 
})
export class EstimationPortalComponent {

   navListName: string = 'Overview';
  
 
  isDarkTheme:boolean = false ;
  isOverviewVisible= true;
  selectedContent: string | null = null;
  isDashboardVisible: boolean = false;
  isABAPVisible: boolean = false;
  isPIPOCPIVisible: boolean = false;
  isBasisVisible: boolean = false;
  ismyQuoteVisible: boolean = false;
  isClientQualificationVisible: boolean = false;

  isSidenavOpened = true;




  
  constructor(private router: Router) {}
  loading: boolean = true; 
  async ngOnInit(){
      console.log("Login: "+localStorage.getItem('login_info'));
       
        if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
          //await this.router.navigate(['/OperateSync']);
          console.log("in there!")
         
        }
        else{
           localStorage.setItem('login_info',"{}");
           await this.router.navigate(['/Login']);
           
        }




      setTimeout(() => {
      
        this.loading = false; // Set loading to false to hide the loader
      }, 2000);
    }


    
  toggleSidenav() {
    this.isSidenavOpened = !this.isSidenavOpened;
  }

  onSidenavToggle(isOpened: boolean) {
    // Add any logic you want when the sidenav is opened or closed
  }



  // ismyCart : boolean = false;
 
 
  // showmyCart() {
  //   this.resetVisibility();
  //   this.ismyCart = true;
  // }
  getTextColor(): string {
    return this.isDarkTheme ? 'white' : 'black';
  }
  
  updateContent(content: string): void {
    this.selectedContent = content;
    this.resetVisibility();
  }
 
  showDashboard() {
    this.resetVisibility();
    this.isDashboardVisible = true;
    
    
  }
 
  showABAP() {
    this.resetVisibility();
    this.isABAPVisible = true;
  }
 
  showPIPOCPI() {
    this.resetVisibility();
    this.isPIPOCPIVisible = true;

  }
 
  showBasis() {
    this.resetVisibility();
    this.isBasisVisible = true;
  }

  showMyquote() {
    this.resetVisibility();
    this.ismyQuoteVisible = true;
    
  }
 
  showClientQualification() {
    this.resetVisibility();
    this.isClientQualificationVisible = true;
    
  }

  showOverview() {
    this.resetVisibility();
    this.isOverviewVisible = true;
    
  }


  private resetVisibility() {
    this.isDashboardVisible = false;
    this.isABAPVisible = false;
    this.isPIPOCPIVisible = false;
    this.isBasisVisible = false;
    this.ismyQuoteVisible = false;
    this.isClientQualificationVisible = false;
    this.isOverviewVisible = false;
    // this.ismyCart = false;
  }

  countGetter() {
    return AbapComponent.count;
   
  }


  
}