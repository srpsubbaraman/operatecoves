import { Component } from '@angular/core';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  companyName: string = "©"+(new Date().getFullYear())+" Deloitte Touche Tohmatsu India LLP.";
contactEmail: string = "inconetpsapopt@deloitte.com";
}
