import { Component } from '@angular/core';

@Component({
  selector: 'app-pipo',
  templateUrl: './pipo.component.html',
  styleUrl: './pipo.component.css'
})
export class PipoComponent {

  isBasic: boolean = true;
  isEffort: boolean = false;
  isCreate: boolean = true;
  isChange: boolean = false;

  showBasic() {
    this.isBasic = true;
    this.isEffort = false;
  }

  showEffort() {
    this.isBasic = false;
    this.isEffort = true;
  }

  showCreate() {
    this.isCreate = true;
    this.isChange = false;
  }

  showChange() {
    this.isCreate = false;
    this.isChange = true;
  }

  requestType: string = 'Create'; // Default value

  showIncidentFields: boolean = false;
  showCRFields: boolean = false;

  loadCRINCInfo() {
    // Toggle visibility based on the selected "Request Type"
    this.showIncidentFields = this.requestType === 'Incident';
    this.showCRFields = this.requestType === 'CR';
  }



  
  viewCartButtonVisible = false;
  viewCartButtonVisible1 = false;
  showCRTable = false;
  reqQuote= false
  showCRTable1 = false;
  reqQuote1 = false


  crDetails: any[] = [];
  incDetails: any[] = []; // Array to store CR details

  addToCart() {
    if (this.requestType === 'CR') {
      // Validate each field and show alert messages if needed
      const objectType = this.getValue('objectType');
      if (!objectType || objectType === 'Select') {
        alert('Please select Object Type.');
        return;
      }
  
      const objectComplexity = this.getValue('objectComplexity');
      if (!objectComplexity || objectComplexity === 'Select') {
        alert('Please select Object Complexity.');
        return;
      }
  
      const objectDevCategory = this.getValue('objectDevCategory');
      if (!objectDevCategory || objectDevCategory === 'Select') {
        alert('Please select Development Category.');
        return;
      }
  
      const objectDevConfig = this.getValue('objectDevConfig');
      if (!objectDevConfig || objectDevConfig === 'Select') {
        alert('Please select Configuration Involved.');
        return;
      }
  
      const objectTestType = this.getValue('objectTestType');
      if (!objectTestType || objectTestType === 'Select') {
        alert('Please select Testing Type.');
        return;
      }
  
      const objectQa = this.getValue('objectQa');
      if (!objectQa || objectQa === 'Select') {
        alert('Please select QA Test Required.');
        return;
      }
  
      const objectRt = this.getValue('objectRt');
      if (!objectRt || objectRt === 'Select') {
        alert('Please select Regression Test Required.');
        return;
      }
  
      const objectRtQual = this.getValue('objectRtQual');
      if (!objectRtQual || objectRtQual === 'Select') {
        alert('Please select Regression Qualification.');
        return;
      }
  
      this.viewCartButtonVisible = true;
  
      // Collect CR details and add to the array
      const crDetail = {
        objectType: objectType,
        objectComplexity: objectComplexity,
        objectDevCategory: objectDevCategory,
        objectDevConfig: objectDevConfig,
        objectTestType: objectTestType,
        objectQa: objectQa,
        objectRt: objectRt,
        objectRtQual: objectRtQual
      };
  
      this.crDetails.push(crDetail);
    }
  }
  
  getValue(elementId: string): string {
    const element = document.getElementById(elementId) as HTMLSelectElement | null;
    return element ? element.value : '';
  }
  

  removeCRDetail(crDetail: any) {
    // Implement the logic to remove the CR detail from the array or data structure
    // For example, if crDetails is an array, you can use array methods like splice
    const index = this.crDetails.indexOf(crDetail);
    if (index !== -1) {
      this.crDetails.splice(index, 1);
    }
  }

  
  viewCart() {
    this.showCRTable = true;
    this.reqQuote = true;
  }

  addToCart1() {
    if (this.requestType === 'Incident') {
     
  
      // Validate each field and show alert messages if needed
      const defectCategory = this.getValue('defectCategory');
      if (!defectCategory || defectCategory === 'Select') {
        alert('Please select Defect Category.');
        return;
      }
  
      const devRequired = this.getValue('devRequired');
      if (!devRequired || devRequired === 'Select') {
        alert('Please select Dev. Required.');
        return;
      }
  
      const objectRt1 = this.getValue('objectRt1');
      if (!objectRt1 || objectRt1 === 'Select') {
        alert('Please select Regression Test Required.');
        return;
      }
  
      const objectTestType1 = this.getValue('objectTestType1');
      if (!objectTestType1 || objectTestType1 === 'Select') {
        alert('Please select Testing Type.');
        return;
      }
  
      const objectQa1 = this.getValue('objectQa1');
      if (!objectQa1 || objectQa1 === 'Select') {
        alert('Please select QA Test Required.');
        return;
      }
  
      const Priorty = this.getValue('Priorty');
      if (!Priorty || Priorty === 'Select') {
        alert('Please select Priority.');
        return;
      }
  
      const objectRtQual1 = this.getValue('objectRtQual1');
      if (!objectRtQual1 || objectRtQual1 === 'Select') {
        alert('Please select Regression TC Qualification.');
        return;
      }
      this.viewCartButtonVisible1 = true;
      // Collect Incident details and add to the array
      const incDetail = {
        defectCategory: defectCategory,
        devRequired: devRequired,
        objectRt1: objectRt1,
        objectTestType1: objectTestType1,
        objectQa1: objectQa1,
        Priorty: Priorty,
        objectRtQual1: objectRtQual1
      };
  
      this.incDetails.push(incDetail);
    }
  }
  

  removeINCDetail(incDetail: any) {
    // Implement the logic to remove the CR detail from the array or data structure
    // For example, if crDetails is an array, you can use array methods like splice
    const index = this.incDetails.indexOf(incDetail);
    if (index !== -1) {
      this.incDetails.splice(index, 1);
    }
  }

  viewCart1(){
    this.showCRTable1 = true;
    this.reqQuote1 = true;
 

}



complexityOptions = [
  { label: 'Option 1', value: 'option1' },
  { label: 'Option 2', value: 'option2' },
  { label: 'Option 3', value: 'option3' },
  // Add more options as needed
];

showOptions = false;
selectedOption: string = '';

selectOption(option: any) {
  if (this.selectedOption === option.label) {
    this.showOptions = true; // Close the options when the same option is selected
  } else {
    this.selectedOption = option.label;
    this.showOptions = true;
  }
 
  this.selectedOption = option.label;
  this.showOptions = true;
}



isTable: boolean = false;
isTable1: boolean = false;

  submitCreate() {
    // Add any logic or service calls needed on submit for bordered-div1
    // For example, you can make API calls here.

    // Toggle visibility
    // this.isCreate = false;
    // this.isTable = true;
   
  }
  submitChange(){

  }

  submitTable() {
     
    this.isCreate = true;
    this.isTable = false;
  }

  
  


 
  showScrollableInput: boolean = false;



  // tableData: any[][] = [
  //   ['Row 1, Col 1', 'Row 1, Col 2', 'Row 1, Col 3', 'Row 1, Col 4', 'Row 1, Col 5'],
  //   ['Row 2, Col 1', 'Row 2, Col 2', 'Row 2, Col 3', 'Row 2, Col 4', 'Row 2, Col 5'],
  //   ['Row 3, Col 1', 'Row 3, Col 2', 'Row 3, Col 3', 'Row 3, Col 4', 'Row 3, Col 5'],
  //   ['Row 4, Col 1', 'Row 4, Col 2', 'Row 4, Col 3', 'Row 4, Col 4', 'Row 4, Col 5'],
  //   ['Row 5, Col 1', 'Row 5, Col 2', 'Row 5, Col 3', 'Row 5, Col 4', 'Row 5, Col 5'],
  //   ['Row 6, Col 1', 'Row 6, Col 2', 'Row 6, Col 3', 'Row 6, Col 4', 'Row 6, Col 5'],
  //   ['Row 7, Col 1', 'Row 7, Col 2', 'Row 7, Col 3', 'Row 7, Col 4', 'Row 7, Col 5'],
  //   ['Row 8, Col 1', 'Row 8, Col 2', 'Row 8, Col 3', 'Row 8, Col 4', 'Row 8, Col 5'],
    // Ninth row is not included in the tableData array
  // ];
  showEffortTable: boolean = false;
  selectedTabIndex: number = 0; // To keep track of the selected tab

  onTabChanged(event: any) {
    this.selectedTabIndex = event.index;
  }
}








