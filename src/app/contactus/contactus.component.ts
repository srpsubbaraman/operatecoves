import { Component, ElementRef, ViewChild } from '@angular/core';
import { Chart, ChartConfiguration, registerables } from 'chart.js';
import { Router } from '@angular/router'; 

Chart.register(...registerables);

@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.css']
})
export class ContactusComponent {

  loading: boolean = true; 
  async ngOnInit() {
    console.log("Login: "+localStorage.getItem('login_info'));
    //console.log("In TTL? : "+ String((Date.now() - JSON.parse(localStorage.getItem('login_info')!).ttl) <=300000 ))
    if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
      console.log("in there!");
      
    }
    else{
       localStorage.setItem('login_info',"{}");
       await this.router.navigate(['/Login']); 
       
    }
    setTimeout(() => {
      
      this.loading = false; // Set loading to false to hide the loader
    }, 2000);
  }


  constructor(private router: Router){}

}