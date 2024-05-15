import { Component, OnInit } from '@angular/core';
import { TeamService } from '../team-profile.service';

@Component({
  selector: 'app-team-profile',
  templateUrl: './team-profile.component.html',
  styleUrl: './team-profile.component.css'
})


export class TeamProfileComponent implements OnInit {
  teamData: any[] = [];
  teamByLocation: any = {};
  originalTeamData = [];
  searchText: string = '';


  

  constructor(private teamService: TeamService) {}

  ngOnInit(): void {
    this.teamService.getTeamData().subscribe(data => {
      this.teamData = data;
      this.groupByLocation();
    });
  }


  groupByLocation() {
       // Sort data
       this.teamData.sort((a, b) => a.location.localeCompare(b.location));

       // Group data
       this.teamData.forEach(member => {
         if (!this.teamByLocation[member.location]) {
           this.teamByLocation[member.location] = [];
         }
         this.teamByLocation[member.location].push(member);
       });
   
}

getLocations(): string[] {
  return Object.keys(this.teamByLocation);
}

}



