import { Component } from '@angular/core';

@Component({
  selector: 'app-our-leaders',
  templateUrl: './our-leaders.component.html',
  styleUrl: './our-leaders.component.css'
})
export class OurLeadersComponent {


  leaders = [
    {
        imageSrc: 'assets/images/RajeshBaliga.png',
        name: 'Rajesh Baliga',
        role: 'DTTIL Operate Leader',
        email: 'rajeshbaliga@deloitte.com'
    },
    {
        imageSrc: 'assets/images/GaneshPrabhu.png',
        name: 'Ganesh Prabhu',
        role: 'DTTIL Operate Techstack Leader',
        email: 'gprabhu@deloitte.com'
    },
    { 
        imageSrc: 'assets/images/VeerendraG.png',
        name: 'Veerendra Gadigi',
        role: 'DTTIL Operate Delivery Leader',
        email: 'vgadigi@deloitte.com'
    }
 
];
}
