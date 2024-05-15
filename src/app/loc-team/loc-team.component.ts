import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team-profile.service';
import { TeamMember } from '../models/team-member';
import { Router } from '@angular/router';
import { MUMTeamComponent } from '../mum-team/mum-team.component';


interface Location {
  name: string;
  Component: string;
}

@Component({
  selector: 'app-loc-team',
  templateUrl: './loc-team.component.html',
  styleUrls: ['./loc-team.component.css']
})
export class LocTeamComponent {
   locations: Location[] = [
    { name: 'All', Component: 'AllTeamComponent' },
    { name: 'Mumbai', Component: 'MUMTeamComponent' },
    { name: 'Coimbatore', Component: 'CBETeamComponent' },
    { name: 'Chennai', Component: 'ChenTeamComponent' },
    { name: 'Bengaluru', Component: 'BangTeamComponent' },
    { name: 'Hyderabad', Component: 'HydTeamComponent' },
    { name: 'Delhi', Component: 'DelTeamComponent' },
    { name: 'Pune', Component: 'PuneTeamComponent' },
    { name: 'Kolkata', Component: 'KolTeamComponent' },
    { name: 'Ahmedabad', Component: 'AhmTeamComponent' },
    { name: 'Bhubaneshwar', Component: 'BhuTeamComponent' },
    { name: 'Thane', Component: 'ThaneTeamComponent' },

    
    // Add more locations as needed
  ];

  teamMembers: TeamMember[] = [];
  filteredMembers: TeamMember[] = [];
  skills: string[] = [];
  projects: string[] = [];

  isLoc: boolean = true;
  isSkills: boolean = false;
  isProj: boolean = false;

  selectedValue: string = 'location'; // default selection
  selectedLocation: Location | null = null;

  constructor(private teamService: TeamService, private router: Router) {}
  loading: boolean = true; 
  async ngOnInit(): Promise<void> {
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

    this.teamMembers = await this.teamService.getTeamData(); 
    //console.log("I am Ironman" + JSON.stringify(this.teamMembers))
    let data = this.teamMembers;
      this.extractSkillsAndProjects();
      this.showMembers(this.locations[0]);
      this.selectedLocation=this.locations[0];

      
  }

  showLoc(): void {
    this.isLoc = true;
    this.isSkills = false;
    this.isProj = false;
    this.filteredMembers = [];
  }

  showSkills(): void {
    this.isLoc = false;
    this.isSkills = true;
    this.isProj = false;
    this.filteredMembers = [];
  }

  showProj(): void {
    this.isLoc = false;
    this.isSkills = false;
    this.isProj = true;
    this.filteredMembers = [];
  }

  extractSkillsAndProjects(): void {
    //console.log("THIS IS THE BOSS" + this.teamMembers)
    this.teamMembers.forEach(member => {
      member.skills.forEach(skill => {
        
        if (!this.skills.includes(skill)) {
          this.skills.push(skill);
        }
      });

      member.projects.forEach(project => {
        if (!this.projects.includes(project)) {
          this.projects.push(project);
        }
      });
    });
  }

  showMembers(selectedLocation: Location): void {
    this.selectedLocation = selectedLocation;
    // console.log("Selected Location: "+selectedLocation.name)
    this.filteredMembers = this.teamMembers.filter(member => member.location === selectedLocation.name);
    // console.log( this.selectedLocation.Component)
    // console.log(JSON.stringify(this.filteredMembers))    
  }

  filterBySkill(skill: string): void {
    this.clearFilter();
    this.filteredMembers = this.teamMembers.filter(member => member.skills.includes(skill));
  }

  filterByProject(project: string): void {
    this.clearFilter();
    this.filteredMembers = this.teamMembers.filter(member => member.projects.includes(project));
  }

  navigateToLocation(selectedLocation: Location): void {
    
    this.router.navigate([selectedLocation.Component]);
  }

  clearFilter(): void {
    this.selectedLocation = null;
    this.filteredMembers = [];
  }
}