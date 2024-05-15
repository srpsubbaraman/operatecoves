import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrl: './get-quote.component.css'
})
export class GetQuoteComponent implements OnInit {
  showTable: boolean = false;
  selectedALM: string = 'Jira';
  showJiraFields: boolean = true;
  showADOFields: boolean = false;
 
  ngOnInit() {
  }
 
  onALMSelectionChange() {
    this.showJiraFields = this.selectedALM === 'Jira';
    this.showADOFields = this.selectedALM === 'ADO';
    this.showTable = !(this.showJiraFields || this.showADOFields);
}
 
  toggleBox1(){
    this.showTable = !this.showTable;
  }
}