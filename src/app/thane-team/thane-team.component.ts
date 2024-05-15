import { Component, OnInit } from '@angular/core';
import { TeamMember } from '../models/team-member';
import { TeamService } from '../team-profile.service';

@Component({
  selector: 'app-thane-team',
  // standalone: true,
  // imports: [],
  templateUrl: './thane-team.component.html',
  styleUrl: './thane-team.component.css'
})
export class ThaneTeamComponent implements OnInit {
  teamMembers: TeamMember[] = [];
  teamByProject: { [key: string]: TeamMember[] } = {};
  filteredMembers: TeamMember[] = [];
  locations: string[] = ['Mumbai', 'Coimbatore', 'Chennai', 'Bengaluru', 'Hyderabad', 'Pune', 'Delhi', 'Ahmedabad', 'Bhubaneshwar', 'Kolkata', 'Thane'];
  locProjects: string[] = [];
  locTeamMembers: TeamMember[] = [];
  expandedProject: string | null = null;

  currentLocation: string = '';

  skills: string[] = [];
  projects: string[] = [];

  isProj: boolean = true;
  isSkills: boolean = false;

  selectedValue: string = 'projects';

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
      this.teamMembers = this.teamService.getStoredTeamData(); 
      let data = this.teamMembers;
      this.groupByProject();
      this.locProjects = this.getProjectsForLocation(data, 'Thane');
      this.locTeamMembers = this.getTeamMembersForLocation(data, 'Thane');
      this.extractSkillsAndProjects();


     

  }

  toggleTeamMembers(project: string): void {
    if (this.expandedProject === project) {
      this.expandedProject = null;
    } else {
      this.expandedProject = project;
    }
  }

  groupByProject(): void {
    this.teamByProject = this.teamMembers.reduce((acc: { [key: string]: TeamMember[] }, member) => {
      const project = member.projects[0];
      if (!acc[project]) {
        acc[project] = [];
      }
      acc[project].push(member);
      return acc;
    }, {} as { [key: string]: TeamMember[] });
  }

  getProjects(): string[] {
    return Object.keys(this.teamByProject);
  }

  showMembers(location: string): void {
    this.filteredMembers = this.teamMembers.filter(member => member.location === location);
  }

  private getProjectsForLocation(data: TeamMember[], location: string): string[] {
    const projects: string[] = [];

    data
      .filter(member => member.location === location)
      .forEach(member => {
        member.projects.forEach(project => {
          if (!projects.includes(project)) {
            projects.push(project);
          }
        });
      });

    return projects;
  }

  private getTeamMembersForLocation(data: TeamMember[], location: string): TeamMember[] {
    return data.filter(member => member.location === location);
  }

  getMembersForProject(project: string): TeamMember[] {
    return this.locTeamMembers.filter(member => member.projects.includes(project));
  }

  extractSkillsAndProjects(): void {
    this.locTeamMembers.forEach(member => {
      member.skills.forEach((skill: string) => {
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
    return this.locTeamMembers.filter(member => member.skills.includes(skill));
  }

  clearFilter(): void {
    this.filteredMembers = [];
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
}
