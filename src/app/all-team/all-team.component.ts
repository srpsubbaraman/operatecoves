import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team-profile.service';
import { TeamMember } from '../models/team-member';
import { Router } from '@angular/router';

interface Location {
  name: string;
  Component: string;
}

@Component({
  selector: 'app-all-team',
  templateUrl: './all-team.component.html',
  styleUrls: ['./all-team.component.css']
})
export class AllTeamComponent implements OnInit {
  locations: Location[] = [
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
  ];

  teamMembers: TeamMember[] = [];
  filteredMembers: TeamMember[] = [];
  skills: string[] = [];
  projects: string[] = [];
  isSkills: boolean = true;
  isProj: boolean = false;
  selectedValue: string = 'skills'; 

  constructor(private teamService: TeamService, private router: Router) {}

  async ngOnInit(): Promise<void> {
    this.teamMembers = await this.teamService.getTeamData(); 
    this.extractSkillsAndProjects();
    console.log(this.teamMembers)
  }

  showProj(): void {
    this.isProj = true;
    this.isSkills = false;
    this.filteredMembers = [];
  }

  showSkills(): void {
    this.isProj = false;
    this.isSkills = true;
    this.filteredMembers = [];
  }

  extractSkillsAndProjects(): void {
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

  filterBySkill(skill: string): TeamMember[] {
    return this.filteredMembers = this.teamMembers.filter(member => member.skills.includes(skill));
  }
  
  filterByProject(project: string): TeamMember[] {
    return this.filteredMembers = this.teamMembers.filter(member => member.projects.includes(project));
  }
  

  navigateToLocation(selectedLocation: Location): void {
    this.router.navigate([selectedLocation.Component]);
  }

  clearFilter(): void {
    this.filteredMembers = [];
  }
}
