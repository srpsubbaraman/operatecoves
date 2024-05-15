import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  isMenuOpen: boolean = false;
  isMenuOpen1: boolean = false;
  isMenuOpen2: boolean = false;
  isMenuOpen3: boolean = false;
  isHomeItemsOpen = false;
  isServiceItemsOpen = false;
  isProfileItemsOpen = false;
  currentUrl: string;
  isLogin: boolean;
 
  constructor(private router: Router) {
    this.isHomeItemsOpen = false;
    this.isServiceItemsOpen = false;
    this.isProfileItemsOpen = false;
    this.currentUrl = this.router.url;
    console.log(this.currentUrl)

    this.isLogin = (this.currentUrl== "/" || this.currentUrl=="/Login")?true:false
 
  }
 
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
 
  // Close all menus when clicking anywhere on the screen
  @HostListener('document:click', ['$event'])
  closeMenus(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (
      !target.closest('.menu-items') &&
      !target.classList.contains('hamburger') &&
      !target.classList.contains('fa-chevron-down') &&
      !target.classList.contains('fa-chevron-up') &&
      !target.classList.contains('fa-user')
    ) {
      this.closeAllMenus();
    }
  }
 
 
  closeAllMenus() {
    this.isHomeItemsOpen = false;
    this.isMenuOpen1 = false;
    this.isServiceItemsOpen = false;
    this.isMenuOpen2 = false;
    this.isProfileItemsOpen = false;
    this.isMenuOpen3 = false;
  }
 
  closeHomeMenu() {
    const homeItems = document.querySelector('.home-items');
    if (homeItems && this.isHomeItemsOpen) {
      homeItems.classList.remove('show');
      homeItems.classList.add('hide');
      this.isHomeItemsOpen = false;
    }
    this.isMenuOpen1 = false;
  }
 
  closeServiceMenu() {
    const serviceItems = document.querySelector('.service-items');
    if (serviceItems && this.isServiceItemsOpen) {
      serviceItems.classList.remove('show');
      serviceItems.classList.add('hide');
      this.isServiceItemsOpen = false;
    }
    this.isMenuOpen2 = false;
  }
 
  closeProfileMenu() {
    const profileItems = document.querySelector('.profile-items');
    if (profileItems && this.isProfileItemsOpen) {
      profileItems.classList.remove('show');
      profileItems.classList.add('hide');
      this.isProfileItemsOpen = false;
    }
    this.isMenuOpen3 = false;
  }
 
  homeMenu() {
    this.closeServiceMenu();
    this.closeProfileMenu();
    const homeItems = document.querySelector('.home-items');
    if (homeItems) {
      homeItems.classList.toggle('show');
      homeItems.classList.toggle('hide');
      this.isHomeItemsOpen = !this.isHomeItemsOpen;
 
    }
   
    this.isMenuOpen1 = !this.isMenuOpen1;
   
   
 
  }
  serviceMenu() {
    this.closeHomeMenu();
    this.closeProfileMenu();
    const homeItems = document.querySelector('.service-items');
    if (homeItems) {
      homeItems.classList.toggle('show');
      homeItems.classList.toggle('hide');
      this.isServiceItemsOpen = !this.isServiceItemsOpen;
 
    }
    this.isMenuOpen2 = !this.isMenuOpen2;
 
  }
  profileMenu() {
    this.closeServiceMenu();
    this.closeHomeMenu();
    const homeItems = document.querySelector('.profile-items');
    if (homeItems) {
      homeItems.classList.toggle('show');
      homeItems.classList.toggle('hide');
      this.isProfileItemsOpen = !this.isProfileItemsOpen;
 
    }
    this.isMenuOpen3 = !this.isMenuOpen3;
 
  }
  
  scrollToAbout() {
    this.router.navigate(['./Home'], { fragment: 'Introduction' });
    // this.isMenuOpen1 = false; // Close the menu immediately
 
    setTimeout(() => {
      const aboutSection = document.getElementById('aboutSection');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      }
 
      // Close the home items menu
      const homeItems = document.querySelector('.home-items');
      if (homeItems) {
        homeItems.classList.remove('show');
        this.isHomeItemsOpen = false;
      }
    }, 0);
    this.isMenuOpen1 = !this.isMenuOpen1;
  }
 
 
 
scrollTovideo() {
  this.router.navigate(['./Home'], { fragment: 'Overview' });
 
  setTimeout(() => {
    const videosection = document.getElementById('videosection');
    if (videosection) {
      videosection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
 
 
  const homeItems = document.querySelector('.home-items');
  if (homeItems) {
    homeItems.classList.remove('show');
    this.isHomeItemsOpen = false;
  }
}, 0);
this.isMenuOpen1 = !this.isMenuOpen1;
}
 
scrollToDashboard() {
  this.router.navigate(['./Home'], { fragment: 'dashboard' });
 
  setTimeout(() => {
    const dashboardsection = document.getElementById('dashboardsection');
    if (dashboardsection) {
      dashboardsection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
   
  const homeItems = document.querySelector('.home-items');
  if (homeItems) {
    homeItems.classList.remove('show');
    this.isHomeItemsOpen = false;
  }
}, 0);
this.isMenuOpen1 = !this.isMenuOpen1;
}
 
scrollToTouch() {
  this.router.navigate(['./Home'], { fragment: 'Getintouch' });
 
  setTimeout(() => {
    const contactSection = document.getElementById('contactSection');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
   
  const homeItems = document.querySelector('.home-items');
  if (homeItems) {
    homeItems.classList.remove('show');
    this.isHomeItemsOpen = false;
  }
}, 0);
this.isMenuOpen1 = !this.isMenuOpen1;
}
 
scrollToMemories() {
  this.router.navigate(['./Home'], { fragment: 'Memories' });
 
  setTimeout(() => {
    const Memoeriessection = document.getElementById('Memoeriessection');
    if (Memoeriessection) {
      Memoeriessection.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
    }
 
   
  const homeItems = document.querySelector('.home-items');
  if (homeItems) {
    homeItems.classList.remove('show');
    this.isHomeItemsOpen = false;
  }
}, 0);
this.isMenuOpen1 = !this.isMenuOpen1;
}
estimate() {
  this.router.navigate(['./EstimationPortal']);
  setTimeout(() => {
 const serviceItems = document.querySelector('.service-items');
  if (serviceItems) {
    serviceItems.classList.remove('show');
    this.isServiceItemsOpen = false;
  }
}, 0);
this.isMenuOpen2 = !this.isMenuOpen2;
}
grooming() {
  this.router.navigate(['./Groomingportal']);
  setTimeout(() => {
    const serviceItems = document.querySelector('.service-items');
     if (serviceItems) {
       serviceItems.classList.remove('show');
       this.isServiceItemsOpen = false;
     }
   }, 0);
   this.isMenuOpen2 = !this.isMenuOpen2;
}
team() {
  this.router.navigate(['./TeamProfile']);
  setTimeout(() => {
    const serviceItems = document.querySelector('.service-items');
     if (serviceItems) {
       serviceItems.classList.remove('show');
       this.isServiceItemsOpen = false;
     }
   }, 0);
   this.isMenuOpen2 = !this.isMenuOpen2;
}
operateSync() {
  this.router.navigate(['./OperateSync']);
  setTimeout(() => {
    const serviceItems = document.querySelector('.service-items');
     if (serviceItems) {
       serviceItems.classList.remove('show');
       this.isServiceItemsOpen = false;
     }
   }, 0);
   this.isMenuOpen2 = !this.isMenuOpen2;
}
 
setting() {
  this.router.navigate(['./Settings']);
  setTimeout(() => {
    const profileItems = document.querySelector('.profile-items');
     if (profileItems) {
      profileItems.classList.remove('show');
       this.isProfileItemsOpen = false;
     }
   }, 0);
   this.isMenuOpen3 = !this.isMenuOpen3;
}
 
signout() {
  localStorage.setItem('login_info',"{}");
  this.router.navigate(['./Login']);
    setTimeout(() => {
    const profileItems = document.querySelector('.profile-items');
     if (profileItems) {
      profileItems.classList.remove('show');
       this.isProfileItemsOpen = false;
     }
   }, 0);
   this.isMenuOpen3 = !this.isMenuOpen3;
}
 
 
}