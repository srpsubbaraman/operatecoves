import { Component, ViewChild } from '@angular/core';
import { UserInputService } from '../user-input.service';
import { Console } from 'console';
import { MatTabGroup } from '@angular/material/tabs';
import axios from 'axios';

@Component({
  selector: 'app-client-qualification',
  templateUrl: './client-qualification.component.html',
  styleUrl: './client-qualification.component.css'
})


   // Define isSideNavBarClosed variable

export class ClientQualificationComponent {
  abapClientQualification: any;
  clientID: any;
  quoteID: string | null = null  ;
  yourModel: string | undefined;
  isFieldDisabled: boolean = true;
  currClient: any;
  // countries: any[] = [];
  countries: { name: string, code: string }[] = [];
  selectedCountryName: string = '';
  selectedCountryCode: string = '';
  purpose: string = '';

  toggleField() {
    this.isFieldDisabled = !this.isFieldDisabled;
    this.next = !this.next;
  }

  checkNullOrEmptyVariables(): boolean {
    const variablesToCheck = [
      this.requestType, this.clientName, this.pjtName,
      this.SAPStandardRatio, this.CrossSysInt, this.FITBestPractices, this.SystemMaturity,
      this.regressionQual, this.ITReleases, this.QASTesting, this.RegressionTesting,
      this.type, this.objcomp,

      this.firstSelect, this.mainSelect, this.dependentSelect, this.thirdLevelSelect
    ];
    console.log('variable' + variablesToCheck)

    for (let variable of variablesToCheck) {
      if (variable === null || variable === "") {
        return true; // Found a null or empty variable
      }

    }

    // None of the variables are null or empty
    return false;
  }


  checkNullOrEmptyGenInfo(): boolean {
    const variablesToCheck = [
       this.clientName, this.pjtName,
    ];
    console.log('variable' + variablesToCheck)

    for (let variable of variablesToCheck) {
      if (variable === null || variable === "") {
        return true; // Found a null or empty variable
      }

    }

    // None of the variables are null or empty
    return false;
  }




  checkNullOrEmptyVariablesforfirst(): boolean {
    const variablesToCheck = [
     
      this.SAPStandardRatio, this.CrossSysInt, this.FITBestPractices, this.SystemMaturity,
      this.regressionQual, this.ITReleases, this.QASTesting, this.RegressionTesting,
      
    ];
    console.log('variable' + variablesToCheck)

    for (let variable of variablesToCheck) {
      if (variable == null || variable == "") {
        return true; // Found a null or empty variable
      }

    }

    // None of the variables are null or empty
    return false;
  }












  async createQual() {
    const all= [
    this.clientID = this.quoteID,
    this.type = (document.getElementById("type") as HTMLSelectElement).options[(document.getElementById("type") as HTMLSelectElement).selectedIndex].value,
    this.objcomp = (document.getElementById("objcomp") as HTMLSelectElement).options[(document.getElementById("objcomp") as HTMLSelectElement).selectedIndex].value,
    // this.funcEff = Number(document.getElementById("funcEff")!.innerHTML),
    // this.techEff = Number(document.getElementById("techEff")!.innerHTML),
    // this.testEff = Number(document.getElementById("testEff")!.innerHTML),
    // this.autoEff = Number(document.getElementById("autoEff")!.innerHTML),
    this.funcEff = Number((document.getElementById("funcEff") as HTMLInputElement).value),
    this.techEff = Number((document.getElementById("techEff") as HTMLInputElement).value),
    this.testEff = Number((document.getElementById("testEff") as HTMLInputElement).value),
    this.autoEff = Number((document.getElementById("autoEff") as HTMLInputElement).value),

    // this.firstSelect = (document.getElementById("firstSelect") as HTMLSelectElement).options[(document.getElementById("firstSelect") as HTMLSelectElement).selectedIndex].value,
    this.mainSelect = (document.getElementById("mainSelect") as HTMLSelectElement).options[(document.getElementById("mainSelect") as HTMLSelectElement).selectedIndex].value,
    this.dependentSelect = (document.getElementById("dependentSelect") as HTMLSelectElement).options[(document.getElementById("dependentSelect") as HTMLSelectElement).selectedIndex].value,
    this.thirdLevelSelect = (document.getElementById("thirdLevelSelect") as HTMLSelectElement).options[(document.getElementById("thirdLevelSelect") as HTMLSelectElement).selectedIndex].innerHTML,
    // console.log("Value:" + (document.getElementById("objEff")! as HTMLInputElement).value)
    this.objEff = Number((document.getElementById("objEff")! as HTMLInputElement).value),
    ];
    console.log("All" + all);

    if (!this.checkNullOrEmptyVariables()) {
      var createQuali = `{
          "abapClientQualification": {
              "clientID":\"${this.clientID}\",
              "clientName": \"${this.clientName}\",
              "projectName": \"${this.pjtName}\",
              "systemMaturity": \"${this.SystemMaturity}\",
              "sapStandardizationRatio": \"${this.SAPStandardRatio}\",
              "crossSystemsIntegration": \"${this.CrossSysInt}\",
              "itBestPracticesLevel": \"${this.FITBestPractices}\",
              "regressionQualification": \"${this.regressionQual}\",
              "itReleasesPerYear": \"${this.ITReleases}\",
              "qasTesting": \"${this.QASTesting}\",
              "regressionTesting": \"${this.RegressionTesting}\",
              "effortDetails": [
                  {
                      "objectType": \"${this.type}\",
                      "objectComplexity": \"${this.objcomp}\",
                      "functionalEffort": ${this.funcEff},
                      "technicalEffort": ${this.techEff},
                      "testingEffort": ${this.testEff},
                      "automationEffort": ${this.autoEff}
                  }
              ],
              "effortBreakUp": [
                  {
                      "objectCategory": \"${this.mainSelect}\",
                      "objectType": \"${this.dependentSelect}\",
                      "objectName": \"${this.thirdLevelSelect}\",
                      "objectEffort": ${this.objEff}
                  }
                  
              ]
          }
      }`

      console.log(createQuali);


      await fetch("http://localhost:8080/estimation/abap/clientQualification/updateBkp", { method: "PUT", headers: { "content-type": "application/json" }, body: (createQuali) }).then((data) => { return data.json() }).then((response) => {
        try {
          alert("Qualification Created! ");
          location.reload();
          console.log("Status: " + JSON.stringify(response));
        }
        catch (e: any) {
          console.log("Problem occured: " + JSON.stringify(e.message()));
        }
      });

    }

    // else if(!this.checkNullOrEmptyVariables() && this.clientID == null){
    //   var createQuali = `{
    //     "abapClientQualification": {
    //         "clientID":\"${this.clientID}\",
    //         "clientName": \"${this.clientName}\",
    //         "projectName": \"${this.pjtName}\",
    //         "systemMaturity": \"${this.SystemMaturity}\",
    //         "sapStandardizationRatio": \"${this.SAPStandardRatio}\",
    //         "crossSystemsIntegration": \"${this.CrossSysInt}\",
    //         "itBestPracticesLevel": \"${this.FITBestPractices}\",
    //         "regressionQualification": \"${this.regressionQual}\",
    //         "itReleasesPerYear": \"${this.ITReleases}\",
    //         "qasTesting": \"${this.QASTesting}\",
    //         "regressionTesting": \"${this.RegressionTesting}\",
    //         "effortDetails": [
    //             {
    //                 "objectType": \"${this.type}\",
    //                 "objectComplexity": \"${this.objcomp}\",
    //                 "functionalEffort": ${this.funcEff},
    //                 "technicalEffort": ${this.techEff},
    //                 "testingEffort": ${this.testEff},
    //                 "automationEffort": ${this.autoEff}
    //             }
    //         ],
    //         "effortBreakUp": [
    //             {
    //                 "object": \"${this.firstSelect}\",
    //                 "objectCategory": \"${this.mainSelect}\",
    //                 "objectType": \"${this.dependentSelect}\",
    //                 "objectName": \"${this.thirdLevelSelect}\",
    //                 "objectEffort": ${this.objEff}
    //             }
                
    //         ]
    //     }
    // }`

    // console.log(createQuali);


    // await fetch("http://localhost:8080/estimation/abap/clientQualification/updateBkp", { method: "POST", headers: { "content-type": "application/json" }, body: (createQuali) }).then((data) => { return data.json() }).then((response) => {
    //   try {
    //     alert("Qualification Created! ");
    //     console.log("Status: " + JSON.stringify(response));
    //   }
    //   catch (e: any) {
    //     console.log("Problem occured: " + JSON.stringify(e.message()));
    //   }
    // });



    // }


    else {
      alert("Some field is left empty please review")
    }
  }




  requestType: string = 'Basic';
  isBasic: boolean = true;
  isEffort: boolean = false;
  isGeneral: boolean = true;
  isDev: boolean = false;
  clientName: string|null = null;
  pjtName: string|null = null;
  viewCartButtonVisible = false;
  viewCartButtonVisible1 = false;
  showCRTable = false;
  reqQuote = false
  showCRTable1 = false;
  reqQuote1 = false;
  SAPStandardRatio: string = "90+ %";
  CrossSysInt: string = "0 - 2";
  FITBestPractices: string = "Basic";
  SystemMaturity: string = "> 10 Year";
  regressionQual: string = "1 - 15";
  ITReleases: string = "3M";
  QASTesting: string = "True";
  RegressionTesting: string = "True";
  type: string = 'Report';
  objcomp: string = 'Low';
  funcEff: number = 20.53;
  techEff: number = 20.53;
  testEff: number = 17.11;
  autoEff: number = 25.67;
  firstSelect: string = 'Change Request';
  mainSelect: string = 'New'; // Assuming this is the initial text of the first option
  dependentSelect: string = 'Functional'; // This will be initialized based on the dependentOptions array
  thirdLevelSelect: string = 'Analyse RD'; // This will be initialized based on the thirdLevelOptions array
  objEff: number = 0; // You can set the default value for objEff as needed, as it's an input field
  // mainOptions:  { value: string; label: string; }[] = [];
  // dependentOptions:  { value: string; label: string; }[] = [];
  // thirdLevelOptions:  { value: string; label: string; }[] = [];

  // disableMainSelect: boolean = true;
  // disableDependentSelect: boolean = true;
  // disableThirdLevelSelect: boolean = true;

  isExtCl: boolean = false;
  isNewCl: boolean = true;


  clientType: string = 'isExtCl';

  onClientType(event: any): void {
    this.clientType = event.target.value;

    if (this.clientType == "isExtCl") {








      this.ngOnInit();
    } else {
      this.clientType = 'isNewCl'
      this.quoteID = null;
    }
  
  }


  @ViewChild('tabGroup') tabGroup!: MatTabGroup;

  async switchToTab(event:any, parameter:any) {
    console.log("Event Obj: "+JSON.stringify(event))
    this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
    this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
    console.log("Event: "+(parameter));
    
    if(parameter == "NewCl_Next"){
      // this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      // this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;

    if(!this.checkNullOrEmptyGenInfo()){
      this.tabGroup.selectedIndex = 1;
      // this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      // this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
      console.log("Client Name: " + this.clientName + "\n\n\nProject: " + this.pjtName);

      (document.getElementById("SAPStandardRatio") as HTMLSelectElement).value = "";
      (document.getElementById("CrossSysInt") as HTMLSelectElement).value = "";
      (document.getElementById("FITBestPractices") as HTMLSelectElement).value = "";
      (document.getElementById("SystemMaturity") as HTMLSelectElement).value = "";
      (document.getElementById("regressionQual") as HTMLSelectElement).value = "";
      (document.getElementById("ITReleases") as HTMLSelectElement).value = "";
      (document.getElementById("QASTesting") as HTMLSelectElement).value = "";
      (document.getElementById("RegressionTesting") as HTMLSelectElement).value = "";

    }
    else{
      alert("Please Enter Required Details")
    }
    }
    else if(parameter == "ExtCl_Update" || parameter== "ExtCl_Next"){    //needs to be changed to Update or Next
      if(parameter =="ExtCl_Update")this.toggleField();
      this.tabGroup.selectedIndex = 1;
    
      await this.sample(0.5);
      

      this.SystemMaturity =(this.currClient.abapClientQualification["systemMaturity"]);
      this.CrossSysInt = (this.currClient.abapClientQualification["crossSystemsIntegration"]);
      this.FITBestPractices = (this.currClient.abapClientQualification["itBestPracticesLevel"]);
      this.ITReleases = (this.currClient.abapClientQualification["itReleasesPerYear"]);
      this.QASTesting = (this.currClient.abapClientQualification["qasTesting"]);
      this.RegressionTesting = (this.currClient.abapClientQualification["regressionTesting"]);
      this.SAPStandardRatio = (this.currClient.abapClientQualification["sapStandardizationRatio"]);
      this.regressionQual = (this.currClient.abapClientQualification["regressionQualification"]);


      let eft_bkp =(this.currClient.abapClientQualification.effortBreakUp);
      let eft_details = (this.currClient.abapClientQualification.effortDetails);
      this.type = eft_details[0]["objectType"];
        this.objcomp = eft_details[0]["objectComplexity"];
        this.funcEff = eft_details[0]["functionalEffort"];
        this.techEff = eft_details[0]["technicalEffort"];
        this.testEff = eft_details[0]["testingEffort"];
        this.autoEff =eft_details[0]["automationEffort"];
        
        //effort Breakup
        // this.firstSelect = eft_bkp[0]["object"];
        this.mainSelect = eft_bkp[0]["objectCategory"];
        this.dependentSelect = eft_bkp[0]["objectType"];
        this.thirdLevelSelect = eft_bkp[0]["objectName"];
        this.objEff = eft_bkp[0]["objectEffort"];



      if(document.getElementById("SAPStandardRatio")){
      
      // this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      // this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
      console.log("Client Name: " + this.clientName + "\n\n\nProject: " + this.pjtName);
      //console.log("client: "+this.currClient);
      

      

      //console.log([this.SystemMaturity,this.CrossSysInt,this.FITBestPractices,this.ITReleases,this.QASTesting,this.RegressionTesting,this.SAPStandardRatio,this.regressionQual]);
      
      await this.sample(0.3);
      (document.getElementById("SAPStandardRatio") as HTMLSelectElement).value = this.SAPStandardRatio;
      (document.getElementById("CrossSysInt") as HTMLSelectElement).value = this.CrossSysInt;
      (document.getElementById("FITBestPractices") as HTMLSelectElement).value = this.FITBestPractices;
      (document.getElementById("SystemMaturity") as HTMLSelectElement).value = this.SystemMaturity;
      (document.getElementById("regressionQual") as HTMLSelectElement).value = this.regressionQual;
      (document.getElementById("ITReleases") as HTMLSelectElement).value = this.ITReleases;
      (document.getElementById("QASTesting") as HTMLSelectElement).value = this.QASTesting;
      (document.getElementById("RegressionTesting") as HTMLSelectElement).value = this.RegressionTesting;
      
      }
      else{
        await this.sample(0.3);
        console.log("Obj: "+this.objEff);
        
        (document.getElementById("type") as HTMLSelectElement).value = this.type;
        (document.getElementById("objcomp") as HTMLSelectElement).value = this.objcomp;
        (document.getElementById("funcEff")! as HTMLInputElement).value = (this.funcEff).toString();
        (document.getElementById("techEff") as HTMLInputElement).value = (this.techEff).toString();
        (document.getElementById("testEff") as HTMLInputElement).value = (this.testEff).toString();
        (document.getElementById("autoEff") as HTMLInputElement).value = (this.autoEff).toString();
        // (document.getElementById("firstSelect") as HTMLSelectElement).value = this.firstSelect;
        (document.getElementById("mainSelect") as HTMLSelectElement).value = this.mainSelect;
        (document.getElementById("dependentSelect") as HTMLSelectElement).value = this.dependentSelect;
        await this.sample(0.2);
        (document.getElementById("thirdLevelSelect") as HTMLSelectElement).value = this.thirdLevelSelect;
        (document.getElementById("objEff")! as HTMLInputElement).value = (this.objEff).toString();
      }

    }
    // this.tabChanged(event);
  }

  async switchToTab_stepper(event:any, parameter:any) {
    console.log("Event Obj: "+JSON.stringify(event))
    try {
      this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
    } catch (error) {
      console.log(error)
    }
   
    console.log("Event: "+(parameter));

    // if(((document.getElementById('Select_type') as HTMLSelectElement).options[(document.getElementById('Select_type') as HTMLSelectElement).selectedIndex].value)) this.clientType = (document.getElementById('Select_type') as HTMLSelectElement).options[(document.getElementById('Select_type') as HTMLSelectElement).selectedIndex].value    
    try{this.clientType = (document.getElementById('Select_type') as HTMLSelectElement).options[(document.getElementById('Select_type') as HTMLSelectElement).selectedIndex].value}
    catch{
      this.clientType = this.clientType
    }
    if(parameter == 'step2'){
    console.log('This.requestype: '+this.requestType)
    if(this.requestType=='Basic'){

    
    
    // parameter=(document.getElementById('Select_type') as HTMLSelectElement).options[(document.getElementById('Select_type') as HTMLSelectElement).selectedIndex].value
    parameter =  this.clientType =='isExtCl'? 'ExtCl_Update' : 'NewCl_Next'
    console.log(parameter +"   --> params")
    if(parameter == "NewCl_Next"){
      // this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      // this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
    if(!this.checkNullOrEmptyGenInfo()){
      
      this.tabGroup.selectedIndex = 1;
      console.log("Client Name: " + this.clientName + "\n\n\nProject: " + this.pjtName);
      (document.getElementById("SAPStandardRatio") as HTMLSelectElement).value = "";
      (document.getElementById("CrossSysInt") as HTMLSelectElement).value = "";
      (document.getElementById("FITBestPractices") as HTMLSelectElement).value = "";
      (document.getElementById("SystemMaturity") as HTMLSelectElement).value = "";
      (document.getElementById("regressionQual") as HTMLSelectElement).value = "";
      (document.getElementById("ITReleases") as HTMLSelectElement).value = "";
      (document.getElementById("QASTesting") as HTMLSelectElement).value = "";
      (document.getElementById("RegressionTesting") as HTMLSelectElement).value = "";

    }
    else{
      alert("Please Enter Required Details")
      return 0;
    }
    }
    else if(parameter == "ExtCl_Update" || parameter== "ExtCl_Next"){    //needs to be changed to Update or Next
      if(parameter =="ExtCl_Update")this.toggleField();
      this.tabGroup.selectedIndex = 1;
    
      await this.sample(0.5);
      
      console.log("\n\n\n\nHERE\n\n\n");

      console.log("currClient: "+JSON.stringify(this.currClient))
      this.SystemMaturity =(this.currClient.abapClientQualification["systemMaturity"]);
      this.CrossSysInt = (this.currClient.abapClientQualification["crossSystemsIntegration"]);
      this.FITBestPractices = (this.currClient.abapClientQualification["itBestPracticesLevel"]);
      this.ITReleases = (this.currClient.abapClientQualification["itReleasesPerYear"]);
      this.QASTesting = (this.currClient.abapClientQualification["qasTesting"]);
      this.RegressionTesting = (this.currClient.abapClientQualification["regressionTesting"]);
      this.SAPStandardRatio = (this.currClient.abapClientQualification["sapStandardizationRatio"]);
      this.regressionQual = (this.currClient.abapClientQualification["regressionQualification"]);


      let eft_bkp =(this.currClient.abapClientQualification.effortBreakUp);
      let eft_details = (this.currClient.abapClientQualification.effortDetails);
      this.type = eft_details[0]["objectType"]||null;
        this.objcomp = eft_details[0]["objectComplexity"]||null;
        this.funcEff = eft_details[0]["functionalEffort"]||null;
        this.techEff = eft_details[0]["technicalEffort"]||null;
        this.testEff = eft_details[0]["testingEffort"]||null;
        this.autoEff =eft_details[0]["automationEffort"]||null;
        
        //effort Breakup
        // this.firstSelect = eft_bkp[0]["object"];
        this.mainSelect = eft_bkp[0]["objectCategory"];
        this.dependentSelect = eft_bkp[0]["objectType"];
        this.thirdLevelSelect = eft_bkp[0]["objectName"];
        this.objEff = eft_bkp[0]["objectEffort"];



      if(document.getElementById("SAPStandardRatio")){
      
      // this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      // this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
      console.log("Client Name: " + this.clientName + "\n\n\nProject: " + this.pjtName);
      //console.log("client: "+this.currClient);
      

      

      //console.log([this.SystemMaturity,this.CrossSysInt,this.FITBestPractices,this.ITReleases,this.QASTesting,this.RegressionTesting,this.SAPStandardRatio,this.regressionQual]);
      
      await this.sample(0.3);
      console.log("\n\nCONSOLE: "+this.SAPStandardRatio);
      (document.getElementById("SAPStandardRatio") as HTMLSelectElement).value = this.SAPStandardRatio;
      (document.getElementById("CrossSysInt") as HTMLSelectElement).value = this.CrossSysInt;
      (document.getElementById("FITBestPractices") as HTMLSelectElement).value = this.FITBestPractices;
      (document.getElementById("SystemMaturity") as HTMLSelectElement).value = this.SystemMaturity;
      (document.getElementById("regressionQual") as HTMLSelectElement).value = this.regressionQual;
      (document.getElementById("ITReleases") as HTMLSelectElement).value = this.ITReleases;
      (document.getElementById("QASTesting") as HTMLSelectElement).value = this.QASTesting;
      (document.getElementById("RegressionTesting") as HTMLSelectElement).value = this.RegressionTesting;
       
      }
      else{
        await this.sample(0.3);
        console.log("Obj: "+this.objEff);
        
        (document.getElementById("type") as HTMLSelectElement).value = this.type;
        (document.getElementById("objcomp") as HTMLSelectElement).value = this.objcomp;
        (document.getElementById("funcEff")! as HTMLInputElement).value = (this.funcEff).toString();
        (document.getElementById("techEff") as HTMLInputElement).value = (this.techEff).toString();
        (document.getElementById("testEff") as HTMLInputElement).value = (this.testEff).toString();
        (document.getElementById("autoEff") as HTMLInputElement).value = (this.autoEff).toString();
        // (document.getElementById("FirstSelect") as HTMLSelectElement).value = this.firstSelect;
        (document.getElementById("mainSelect") as HTMLSelectElement).value = this.mainSelect;
        (document.getElementById("dependentSelect") as HTMLSelectElement).value = this.dependentSelect;
        await this.sample(0.2);
        (document.getElementById("thirdLevelSelect") as HTMLSelectElement).value = this.thirdLevelSelect;
        (document.getElementById("objEff")! as HTMLInputElement).value = (this.objEff).toString();
        return 1;
      }
      

    }
    }
    else{
      this.requestType='Basic'
      await this.switchToTab_stepper(Event,'step2')
      return 1;
      



    }
  }

    if(parameter=="firstPage_Cl")
      {
        this.tabGroup.selectedIndex = 0;
        return 1;
      }

    if(parameter=='step3'){
      
      let n =await this.switchToTab_stepper(Event, 'step2');
      console.log("\n\n\nN: "+n)
      await this.sample(0.5)
      if(n!=0)this.nextClicked();
      return 1;
    }
    return 1;
    // this.tabChanged(event);
  }



  // showDiv(option: string): boolean {
  //   return this.clientType === option;
  // }

  crDetails: any[] = [];
  incDetails: any[] = []; // Array to store CR details


  tab0DataFetched: boolean = false;

  constructor(private userInputService: UserInputService) { }

  userInputData: any = {};



  delay = (delayInms: any) => {
    return new Promise(resolve => setTimeout(resolve, delayInms));
  };

  sample = async (time: number) => {
    console.log('a');
    console.log('waiting...')
    let delayres = await this.delay(time * 1000);
    console.log('b');
  };



  previous_Step(){
    this.tabGroup.selectedIndex = 0;
  }

  async previousClicked() {
    // Toggle between Basic and Effort pages
    this.requestType = this.requestType === 'Basic' ? 'Effort' : 'Basic';
    this.type = (document.getElementById("type") as HTMLSelectElement).options[(document.getElementById("type") as HTMLSelectElement).selectedIndex].value
    this.objcomp = (document.getElementById("objcomp") as HTMLSelectElement).options[(document.getElementById("objcomp") as HTMLSelectElement).selectedIndex].value
    this.funcEff = Number(document.getElementById("funcEff")!.innerHTML)
    this.techEff = Number(document.getElementById("techEff")!.innerHTML)
    this.testEff = Number(document.getElementById("testEff")!.innerHTML)
    this.autoEff = Number(document.getElementById("autoEff")!.innerHTML)
    // this.firstSelect = (document.getElementById("firstSelect") as HTMLSelectElement).options[(document.getElementById("firstSelect") as HTMLSelectElement).selectedIndex].value
    this.mainSelect = (document.getElementById("mainSelect") as HTMLSelectElement).options[(document.getElementById("mainSelect") as HTMLSelectElement).selectedIndex].value
    this.dependentSelect = (document.getElementById("dependentSelect") as HTMLSelectElement).options[(document.getElementById("dependentSelect") as HTMLSelectElement).selectedIndex].value
    this.thirdLevelSelect = (document.getElementById("thirdLevelSelect") as HTMLSelectElement).options[(document.getElementById("thirdLevelSelect") as HTMLSelectElement).selectedIndex].innerHTML;
    this.objEff = Number((document.getElementById("objEff")!).innerHTML)


    if (this.requestType === 'Basic') {
      await this.sample(0.2); //add time in seconds



      (document.getElementById("SAPStandardRatio") as HTMLSelectElement).value = this.SAPStandardRatio;
      (document.getElementById("CrossSysInt") as HTMLSelectElement).value = this.CrossSysInt;
      (document.getElementById("FITBestPractices") as HTMLSelectElement).value = this.FITBestPractices;
      (document.getElementById("SystemMaturity") as HTMLSelectElement).value = this.SystemMaturity;
      (document.getElementById("regressionQual") as HTMLSelectElement).value = this.regressionQual;
      (document.getElementById("ITReleases") as HTMLSelectElement).value = this.ITReleases;
      (document.getElementById("QASTesting") as HTMLSelectElement).value = this.QASTesting;
      (document.getElementById("RegressionTesting") as HTMLSelectElement).value = this.RegressionTesting;



    }


  }

  onDropdownChange(event: any) {
    // Update the requestType based on the selected dropdown value
    this.requestType = event.target.value;
  }


  async nextClicked() {
    // this.userInputService.setUserInputData(this.userInputData);
    this.SAPStandardRatio = (document.getElementById("SAPStandardRatio") as HTMLSelectElement)!.options[(document.getElementById("SAPStandardRatio") as HTMLSelectElement).selectedIndex].value
      this.CrossSysInt = (document.getElementById("CrossSysInt") as HTMLSelectElement)!.options[(document.getElementById("CrossSysInt") as HTMLSelectElement).selectedIndex].value
      this.FITBestPractices = (document.getElementById("FITBestPractices") as HTMLSelectElement)!.options[(document.getElementById("FITBestPractices") as HTMLSelectElement).selectedIndex].value
      this.SystemMaturity = (document.getElementById("SystemMaturity") as HTMLSelectElement)!.options[(document.getElementById("SystemMaturity") as HTMLSelectElement).selectedIndex].value
      this.regressionQual = (document.getElementById("regressionQual") as HTMLSelectElement)!.options[(document.getElementById("regressionQual") as HTMLSelectElement).selectedIndex].value
      this.ITReleases = (document.getElementById("ITReleases") as HTMLSelectElement)!.options[(document.getElementById("ITReleases") as HTMLSelectElement).selectedIndex].value
      this.QASTesting = (document.getElementById("QASTesting") as HTMLSelectElement)!.options[(document.getElementById("QASTesting") as HTMLSelectElement).selectedIndex].value
      this.RegressionTesting = (document.getElementById("RegressionTesting") as HTMLSelectElement)!.options[(document.getElementById("RegressionTesting") as HTMLSelectElement).selectedIndex].value

    this.requestType = (document.getElementById("req") as HTMLSelectElement).value //== 'Basic' ? this.requestType='Effort': this.requestType='Basic';
    console.log(this.requestType);
    // Check the request type and navigate accordingly

    if(!this.checkNullOrEmptyVariablesforfirst()){

    if (this.requestType === 'Basic') {



      

      console.log("SySMAT: " + this.SystemMaturity)
      // Navigate to Effort page
      this.requestType = 'Effort';
      await this.sample(0.4);
      // (document.getElementById("type") as HTMLSelectElement).value = this.type;
      // (document.getElementById("objcomp") as HTMLSelectElement).value = this.objcomp;
      // document.getElementById("funcEff")!.innerHTML = (this.funcEff).toString();
      // document.getElementById("techEff")!.innerHTML = (this.techEff).toString();
      // document.getElementById("testEff")!.innerHTML = (this.testEff).toString();
      // document.getElementById("autoEff")!.innerHTML = (this.autoEff).toString();
      // (document.getElementById("firstSelect") as HTMLSelectElement).value = this.firstSelect;
      // (document.getElementById("mainSelect") as HTMLSelectElement).value = this.mainSelect;
      // (document.getElementById("dependentSelect") as HTMLSelectElement).value = this.dependentSelect;
      // await this.sample(0.2);
      // (document.getElementById("thirdLevelSelect") as HTMLSelectElement).value = this.thirdLevelSelect;
      // document.getElementById("objEff")!.innerHTML = (this.objEff).toString();
      if(this.clientType=='isExtCl'){
      let eft_bkp =(this.currClient.abapClientQualification.effortBreakUp);
      
        let eft_details = (this.currClient.abapClientQualification.effortDetails);
        this.type = eft_details[0]["objectType"];
          this.objcomp = eft_details[0]["objectComplexity"];
          this.funcEff = eft_details[0]["functionalEffort"];
          this.techEff = eft_details[0]["technicalEffort"];
          this.testEff = eft_details[0]["testingEffort"];
          this.autoEff =eft_details[0]["automationEffort"];
         
          //effort Breakup
          // this.firstSelect = eft_bkp[0]["object"];
          this.mainSelect = eft_bkp[0]["objectCategory"];
          this.dependentSelect = eft_bkp[0]["objectType"];
          this.thirdLevelSelect = eft_bkp[0]["objectName"];
          this.objEff = eft_bkp[0]["objectEffort"];
          
          await this.sample(0.3);
          console.log("Obj: "+this.objEff);
         
          (document.getElementById("type") as HTMLSelectElement).value = this.type;
          (document.getElementById("objcomp") as HTMLSelectElement).value = this.objcomp;
          (document.getElementById("funcEff")! as HTMLInputElement).value = (this.funcEff).toString();
          (document.getElementById("techEff") as HTMLInputElement).value = (this.techEff).toString();
          (document.getElementById("testEff") as HTMLInputElement).value = (this.testEff).toString();
          (document.getElementById("autoEff") as HTMLInputElement).value = (this.autoEff).toString();
          // (document.getElementById("firstSelect") as HTMLSelectElement).value = this.firstSelect;
          (document.getElementById("mainSelect") as HTMLSelectElement).value = this.mainSelect;
          (document.getElementById("dependentSelect") as HTMLSelectElement).value = this.dependentSelect;
          await this.sample(0.2);
          (document.getElementById("thirdLevelSelect") as HTMLSelectElement).value = this.thirdLevelSelect;
          (document.getElementById("objEff")! as HTMLInputElement).value = (this.objEff).toString();

      }
      else if(this.clientType=='isNewCl'){
        console.log("This is New Client");
      }


    }
    




    // const userInput = {
    //   SAPStandardRatio: (<HTMLSelectElement>document.getElementById('SAPStandardRatio')).value,
    //   CrossSysInt: (<HTMLSelectElement>document.getElementById('CrossSysInt')).value,
    //   FITBestPractices: (<HTMLSelectElement>document.getElementById('FITBestPractices')).value,
    //   SystemMaturity: (<HTMLSelectElement>document.getElementById('SystemMaturity')).value,
    //   regressionQual: (<HTMLSelectElement>document.getElementById('regressionQual')).value,
    //   ITReleases: (<HTMLSelectElement>document.getElementById('ITReleases')).value,
    //   QASTesting: (<HTMLSelectElement>document.getElementById('QASTesting')).value,
    //   RegressionTesting: (<HTMLSelectElement>document.getElementById('RegressionTesting')).value
    // };

    // this.userInputService.setUserInputData(userInput);

  }
  else{
    alert("Please Select all the required fields");
  }
  }


  tabChanged(event: any) {
    var selectedIndex = event.index
    if (selectedIndex === 1) {

      // Fetch data from Tab 0 if it hasn't been fetched already
      this.fetchTab0Data().then(() => {
        // Once data is fetched, set tab0DataFetched flag to true

        // Move to Tab 1 after data is fetched
        this.moveToTab(selectedIndex);
      });
    } else {
      // Move to the selected tab directly
      this.moveToTab(selectedIndex);
    }
  }

  fetchTab0Data() {

    return new Promise<void>((resolve, reject) => {

      console.log('Fetching data for Tab 0...');

      this.clientName = (document.getElementById("clientName")! as HTMLInputElement).value;
      this.pjtName = (document.getElementById("pjtName")! as HTMLInputElement).value;
      console.log("Client Name: " + this.clientName + "\n\n\nProject: " + this.pjtName);


      setTimeout(() => {
        console.log('Data fetched for Tab 0');
        resolve();
      }, 2000); // Simulated 2 seconds delay
    });
  }

  moveToTab(index: number) {
    // Move to the selected tab
    console.log('Moving to Tab', index);
  }

  //Test for submit
  submitTest() {
    console.log("Submit Clicked");
    console.log("System Maturity: " + (document.getElementById("SystemMaturity") as HTMLSelectElement).options[(document.getElementById("SystemMaturity") as HTMLSelectElement).selectedIndex].innerHTML)
    console.log("")
  } //end of Test fot submit







  showBasic() {
    this.isBasic = true;
    this.isEffort = false;
  }

  showEffort() {
    this.isBasic = false;
    this.isEffort = true;
  }

  showGeneral() {
    this.isGeneral = true;
    this.isDev = false;
  }

  showDev() {
    this.isGeneral = false;
    this.isDev = true;
  }





  showIncidentFields: boolean = false;
  showCRFields: boolean = false;

  loadCRINCInfo() {

    this.showIncidentFields = this.requestType === 'Incident';
    this.showCRFields = this.requestType === 'CR';
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



  removeINCDetail(incDetail: any) {
    // Implement the logic to remove the CR detail from the array or data structure
    // For example, if crDetails is an array, you can use array methods like splice
    const index = this.incDetails.indexOf(incDetail);
    if (index !== -1) {
      this.incDetails.splice(index, 1);
    }
  }

  viewCart1() {
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


  showBorderedDiv1: boolean = true;
  showBorderedDiv2: boolean = false;

  submitBorderedDiv1() {
    // Add any logic or service calls needed on submit for bordered-div1
    // For example, you can make API calls here.

    // Toggle visibility
    this.showBorderedDiv1 = false;
    this.showBorderedDiv2 = true;
  }

  submitBorderedDiv2() {
    // Add any logic or service calls needed on submit for bordered-div2
    // For example, you can make API calls here.

    // Toggle visibility
    this.showBorderedDiv1 = true;
    this.showBorderedDiv2 = false;
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





  firstOption: {value: string; label: string}[] = [
    {value: 'Change Request', label: 'Change Request'},
    {value:'Incident', label: 'Incident'},
  ];



  mainOptions: { value: string; label: string; }[] = [
    { value: 'New', label: 'New' },
    { value: 'Existing', label: 'Existing' },
    // { value: 'All', label: 'All' },
    { value: 'Incident', label: 'Incident' },
    // {value: '', label:'Select'}


  ];

  dependentOptions: { value: string; label: string; }[] = [
    { value: 'Functional', label: 'Functional' },
    { value: 'Technical', label: 'Technical' },
    { value: 'Change', label: 'Change' },
    { value: 'Testing Type', label: 'Testing Type' },
    { value: 'Testing', label: 'Testing' },
    { value: 'Automation', label: 'Automation' },
    { value: 'Testing Type', label: 'Testing Type' },
    { value: 'RT TC Qualification', label: 'RT TC Qualification' },
    { value: 'Functional Effort', label: 'Functional Effort' },
    { value: 'Technical Effort', label: 'Technical Effort ' },
    { value: 'Incident Priority', label: 'Incident Priority' },
    { value: 'Testing', label: 'Testing' },
    { value: 'Automation', label: 'Automation' },
    { value: 'Test Priority', label: 'Test Priority' },
    { value: 'Test Category Exemption', label: 'Test Category Exemption' },
    { value: 'Testing Type', label: 'Testing Type' },
    { value: 'RT TC Qualification', label: 'RT TC Qualification' },




  ];
  thirdLevelOptions: { value: string; label: string; }[] = [
    { value: 'Analyse RD', label: 'Analyse RD' },
    { value: 'SUC', label: 'SUC' },
    { value: 'SUC Review', label: 'SUC Review' },
    { value: 'Config', label: 'Config' },
    { value: 'UAT Support', label: 'UAT Support' },
    { value: 'Create Launching Del.', label: 'Create Launching Del.' },


    { value: 'SUC Analysis', label: 'SUC Analysis' },
    { value: 'Detailed Design', label: 'Detailed Design' },
    { value: 'Design Review', label: 'Design Review' },
    { value: 'Coding', label: 'Coding' },
    { value: 'Code Review', label: 'Code Review' },
    { value: 'Developer Test', label: 'Developer Test' },


    { value: 'Functional Effort', label: 'Functional Effort' },
    { value: 'Technical Effort', label: 'Technical Effort' },
    { value: 'Testing Effort', label: 'Testing Effort' },


    { value: 'FAT Testing', label: 'FAT Testing' },
    { value: 'FAT Automation', label: 'FAT Automation' },
    { value: 'QAT Testing', label: 'QAT Testing' },
    { value: 'QAT Automation', label: 'QAT Automation' },
    { value: 'RT Testing', label: 'RT Testing' },
    { value: 'RT Automation', label: 'RT Automation' },


    { value: 'Describe Defect', label: 'Describe Defect' },
    { value: 'UAT Support', label: 'UAT Support' },


    { value: 'Defect Analysis', label: 'Defect Analysis' },
    { value: 'Coding', label: 'Coding' },
    { value: 'Code Review', label: 'Code Review' },
    { value: 'Developer Test', label: 'Developer Test' },


    { value: 'P1', label: 'P1' },
    { value: 'P2', label: 'P2' },
    { value: 'P3', label: 'P3' },
    { value: 'P4', label: 'P4' },


    { value: 'Test Cases', label: 'Test Cases' },
    { value: 'System & Release Test', label: 'System & Release Test' },


    { value: 'Analysis & KT', label: 'Analysis & KT' },
    { value: 'Manual Executiion', label: 'Manual Executiion' },
    { value: 'Test Script Design', label: 'Test Script Design' },
    { value: 'Test Execution', label: 'Test Execution' },



    { value: 'P1', label: 'P1' },
    { value: 'P2', label: 'P2' },
    { value: 'P3', label: 'P3' },
    { value: 'P4', label: 'P4' },


    { value: 'L0', label: 'L0' },
    { value: 'L1', label: 'L1' },
    { value: 'L2', label: 'L2' },
    { value: 'L3', label: 'L3' },


    { value: 'FAT Testing', label: 'FAT Testing' },
    { value: 'FAT Automation', label: 'FAT Automation' },
    { value: 'QAT Testing', label: 'QAT Testing' },
    { value: 'QAT Automation', label: 'QAT Automation' },
    { value: 'RT Testing', label: 'RT Testing' },
    { value: 'RT Automation', label: 'RT Automation' },


    { value: '1-15', label: '1-15' },
    { value: '15-30', label: '15-30' },
    { value: '30+', label: '30+' },


    { value: 'Test Design & Review', label: 'Test Design & Review' },
    { value: 'Test Case', label: 'Test Case' },
    { value: 'Feature & Release Test', label: 'Feature & Release Test' },


    { value: 'Analysis & KT', label: 'Analysis & KT' },
    { value: 'Manual Execution', label: 'Manual Execution' },
    { value: 'Test Script Design', label: 'Test Script Design' },
    { value: 'Test Execution', label: 'Test Execution' },


    { value: 'FAT Testing', label: 'FAT Testing' },
    { value: 'FAT Automation', label: 'FAT Automation' },
    { value: 'QAT Testing', label: 'QAT Testing' },
    { value: 'QAT Automation', label: 'QAT Automation' },
    { value: 'RT Testing', label: 'RT Testing' },
    { value: 'RT Automation', label: 'RT Automation' },



    { value: '1-15', label: '1-15' },
    { value: '15-30', label: '15-30' },
    { value: '30+', label: '30+' },







  ];



  selectedFirstOption: string = '';
  selectedMainOption: string = '';
  selectedDependentOption: string = '';
  selectedThirdLevelOption: string = '';
  objectEffort: number = 0;





  onFirstSelectChange(){


 
     if(this.selectedFirstOption === 'Change Request'){
      this.mainOptions = [
        { value: 'New', label: 'New' },
        { value: 'Existing', label: 'Existing' },
       
      ];

    }
    else if(this.selectedFirstOption === 'Incident'){
      this.mainOptions = [
        { value: 'Incident', label: 'Incident' },
       
      ];
    
    }
    else
    {
      this.selectedMainOption = '';
      this.selectedDependentOption = '';
      this.selectedThirdLevelOption = '';
     
      this.mainOptions = []; 
      this.dependentOptions = []; 
      this.thirdLevelOptions = [];
    }
  }





  onMainSelectChange() {
    // Logic to determine dependent options based on the selected main option
     if (this.selectedMainOption === 'New') {
      this.dependentOptions = [
        { value: 'Functional', label: 'Functional' },
        { value: 'Technical', label: 'Technical' },

      ];
    } else if (this.selectedMainOption === 'Existing') {
      this.dependentOptions = [
        { value: 'Change', label: 'Change' },
        { value: 'Testing Type', label: 'Testing Type' },


      ];
    } else if (this.selectedMainOption === 'All') {
      this.dependentOptions = [
        { value: 'Testing', label: 'Testing' },
        { value: 'Automation', label: 'Automation' },
        { value: 'Testing Type', label: 'Testing Type' },
        { value: 'RT TC Qualification', label: 'RT TC Qualification' },

      ];
    } else if (this.selectedMainOption === 'Incident') {
      this.dependentOptions = [
        { value: 'Functional Effort', label: 'Functional Effort' },
        { value: 'Technical Effort', label: 'Technical Effort ' },
        { value: 'Incident Priority', label: 'Incident Priority' },
        { value: 'Testing', label: 'Testing' },
        { value: 'Automation', label: 'Automation' },
        { value: 'Test Priority', label: 'Test Priority' },
        { value: 'Test Category Exemption', label: 'Test Category Exemption' },
        { value: 'Testing Type', label: 'Testing Type' },
        { value: 'RT TC Qualification', label: 'RT TC Qualification' },

      ];
    } else {
      this.dependentOptions = [];
    }

    // Clear the selected dependent and third-level options when main option changes
    this.selectedDependentOption = '';
    this.selectedThirdLevelOption = '';
    this.thirdLevelOptions = [];
  }
  clientData: any = [];

 async ngOnInit() {
    
    // var clientQualList = document.getElementById("clientID");
    await fetch('http://localhost:8080/estimation/abap/allClientQualifications')
    .then(response => {
      return response.json();
    }).then(data => {


      for (var i in data.abapClientQualification) {
        var clientInfo = document.createElement('option');
        // clientInfo.innerHTML = data.abapClientQualification[i].clientID + '-' + data.abapClientQualification[i].clientName;
        clientInfo.value = (data.abapClientQualification[i].clientID + '-' + data.abapClientQualification[i].clientName);
        clientInfo.innerHTML = data.abapClientQualification[i].clientName
        console.log("I: " + (i));
        if (Number(i) == 0) {
          console.log("DATA is:" + JSON.stringify(data.abapClientQualification[i]))
          clientInfo.selected = true;
          var clientName = document.getElementById("clientName") as HTMLInputElement
          var projectName = document.getElementById("pjtName") as HTMLInputElement
          clientName!.value =data.abapClientQualification[i].clientName;
          projectName!.value = data.abapClientQualification[i].projectName
        }
        this.clientData.push(data.abapClientQualification[i]);
        document.getElementById("clientID")!.appendChild(clientInfo);
      }
    });
    var clientQualList_select = document.getElementById("clientID") as HTMLSelectElement
    var clientQualList = clientQualList_select.value;
    this.quoteID =  clientQualList?.split('-')[0];

    this.currClient = await fetch('http://localhost:8080/estimation/abap/clientQualification/'+this.quoteID)
    .then(response => {
      return response.json();
    })




    this.fetchCountries();
     
  
  }


  fetchCountries() {
    axios.get('https://restcountries.com/v3.1/all')
      .then(response => {
        response.data.forEach((country: any) => {
          const name = country.name.common;
          const code = country.cca2;
          // console.log('Country:', name);
          // console.log('Country Code:', code);
          this.countries.push({ name, code });
        });
      })
      .catch(error => {
        console.error('Error fetching countries:', error);
      });


  }

  // onSelectCountry(country: any) {
  //   this.selectedCountryName = country.name;
  //   this.selectedCountryCode = country.code;
  //   console.log('Country:',  this.selectedCountryName);
  //   console.log('Country Code:', this.selectedCountryCode);
  // }


  onSelect(event: any) {
    const countryCode = event.target.value;
    const selectedCountry = this.countries.find(country => country.code === countryCode);
    if (selectedCountry) {
      this.selectedCountryName = selectedCountry.name;
      this.selectedCountryCode = selectedCountry.code;
      console.log('Selected Country Name:', this.selectedCountryName);
      console.log('Selected Country Code:', this.selectedCountryCode);
    } else {
      console.error('Selected country not found');
    }
  }
  
  accessSelectedCountry() {
    console.log('Accessing Selected Country Name:', this.selectedCountryName);
    console.log('Accessing Selected Country Code:', this.selectedCountryCode);
  }

  async OnClientChange() {
    
    var clientQualList_select = document.getElementById("clientID") as HTMLSelectElement
    var clientQualList = clientQualList_select.value;
    this.quoteID =  clientQualList?.split('-')[0];
 
    console.log("\n\nClient ID: " + clientQualList?.split('-')[0])
    this.currClient = await fetch('http://localhost:8080/estimation/abap/clientQualification/' + clientQualList?.split('-')[0])
      .then(response => {
        return response.json();
      }).then(data => {
 
 
 
        var clientInfo = document.createElement('option');
        clientInfo.innerHTML = data.abapClientQualification.clientID + '-' + data.abapClientQualification.clientName;
 
 
 
        clientInfo.selected = true;
        var clientName = document.getElementById("clientName") as HTMLInputElement
        var projectName = document.getElementById("pjtName") as HTMLInputElement
        clientName!.value = data.abapClientQualification.clientName;
        projectName!.value = data.abapClientQualification.projectName
 
        //this.clientData.push(data.abapClientQualification[i]);
        //document.getElementById("clientID")!.appendChild(clientInfo);
        return data;
 
      });
 
      console.log("currClient-change: "+JSON.stringify(this.currClient));
  }

  onDependentSelectChange() {
    
    // Logic to determine third-level options based on the selected dependent option
    if (this.selectedDependentOption === 'Functional') {
      this.thirdLevelOptions = [
        { value: 'Analyse RD', label: 'Analyse RD' },
        { value: 'SUC', label: 'SUC' },
        { value: 'SUC Review', label: 'SUC Review' },
        { value: 'Config', label: 'Config' },
        { value: 'UAT Support', label: 'UAT Support' },
        { value: 'Create Launching Del.', label: 'Create Launching Del.' },
      ];
    } else if (this.selectedDependentOption === 'Technical') {
      this.thirdLevelOptions = [
        { value: 'SUC Analysis', label: 'SUC Analysis' },
        { value: 'Detailed Design', label: 'Detailed Design' },
        { value: 'Design Review', label: 'Design Review' },
        { value: 'Coding', label: 'Coding' },
        { value: 'Code Review', label: 'Code Review' },
        { value: 'Developer Test', label: 'Developer Test' },
      ];
    } else if (this.selectedDependentOption === 'Change') {
      this.thirdLevelOptions = [
        { value: 'Functional Effort', label: 'Functional Effort' },
        { value: 'Technical Effort', label: 'Technical Effort' },
        { value: 'Testing Effort', label: 'Testing Effort' },
      ];
    } else if (this.selectedDependentOption === 'Testing Type') {
      this.thirdLevelOptions = [
        { value: 'FAT Testing', label: 'FAT Testing' },
        { value: 'FAT Automation', label: 'FAT Automation' },
        { value: 'QAT Testing', label: 'QAT Testing' },
        { value: 'QAT Automation', label: 'QAT Automation' },
        { value: 'RT Testing', label: 'RT Testing' },
        { value: 'RT Automation', label: 'RT Automation' },
      ];
    } else if (this.selectedDependentOption === 'Testing') {
      this.thirdLevelOptions = [
        { value: 'Test Design & Review', label: 'Test Design & Review' },
        { value: 'Test Case', label: 'Test Case' },
        { value: 'Feature & Release Test', label: 'Feature & Release Test' },
      ];
    } else if (this.selectedDependentOption === 'Automation') {
      this.thirdLevelOptions = [
        { value: 'Analysis & KT', label: 'Analysis & KT' },
        { value: 'Manual Execution', label: 'Manual Execution' },
        { value: 'Test Script Design', label: 'Test Script Design' },
        { value: 'Test Execution', label: 'Test Execution' },
      ];
    } else if (this.selectedDependentOption === 'Testing Type') {
      this.thirdLevelOptions = [
        { value: 'FAT Testing', label: 'FAT Testing' },
        { value: 'FAT Automation', label: 'FAT Automation' },
        { value: 'QAT Testing', label: 'QAT Testing' },
        { value: 'QAT Automation', label: 'QAT Automation' },
        { value: 'RT Testing', label: 'RT Testing' },
        { value: 'RT Automation', label: 'RT Automation' },
      ];
    } else if (this.selectedDependentOption === 'RT-TC Qualification') {
      this.thirdLevelOptions = [
        { value: '1-15', label: '1-15' },
        { value: '15-30', label: '15-30' },
        { value: '30+', label: '30+' },

      ];
    } else if (this.selectedDependentOption === 'Functional Effort') {
      this.thirdLevelOptions = [
        { value: 'Describe Defect', label: 'Describe Defect' },
        { value: 'UAT Support', label: 'UAT Support' },
      ];
    } else if (this.selectedDependentOption === 'Technical Effort') {
      this.thirdLevelOptions = [
        { value: 'Defect Analysis', label: 'Defect Analysis' },
        { value: 'Coding', label: 'Coding' },
        { value: 'Code Review', label: 'Code Review' },
        { value: 'Developer Test', label: 'Developer Test' },
      ];
    } else if (this.selectedDependentOption === 'Incident Priority') {
      this.thirdLevelOptions = [
        { value: 'P1', label: 'P1' },
        { value: 'P2', label: 'P2' },
        { value: 'P3', label: 'P3' },
        { value: 'P4', label: 'P4' },
      ];
    } else if (this.selectedDependentOption === 'Testing') {
      this.thirdLevelOptions = [
        { value: 'Test Cases', label: 'Test Cases' },
        { value: 'System & Release Test', label: 'System & Release Test' },
      ];
    } else if (this.selectedDependentOption === 'Automation') {
      this.thirdLevelOptions = [
        { value: 'Analysis & KT', label: 'Analysis & KT' },
        { value: 'Manual Execution', label: 'Manual Execution' },
        { value: 'Test Script Design', label: 'Test Script Design' },
        { value: 'Test Execution', label: 'Test Execution' },
      ];
    } else if (this.selectedDependentOption === 'Test Priority') {
      this.thirdLevelOptions = [
        { value: 'P1', label: 'P1' },
        { value: 'P2', label: 'P2' },
        { value: 'P3', label: 'P3' },
        { value: 'P4', label: 'P4' },
      ];
    } else if (this.selectedDependentOption === 'Test Category Exemption') {
      this.thirdLevelOptions = [
        { value: 'L0', label: 'L0' },
        { value: 'L1', label: 'L1' },
        { value: 'L2', label: 'L2' },
        { value: 'L3', label: 'L3' },
      ];
    } else if (this.selectedDependentOption === 'Testing Type') {
      this.thirdLevelOptions = [
        { value: 'FAT Testing', label: 'FAT Testing' },
        { value: 'FAT Automation', label: 'FAT Automation' },
        { value: 'QAT Testing', label: 'QAT Testing' },
        { value: 'QAT Automation', label: 'QAT Automation' },
        { value: 'RT Testing', label: 'RT Testing' },
        { value: 'RT Automation', label: 'RT Automation' },
      ];
    } else if (this.selectedDependentOption === 'RT-TC Qualification') {
      this.thirdLevelOptions = [
        { value: '1-15', label: '1-15' },
        { value: '15-30', label: '15-30' },
        { value: '30+', label: '30+' },
      ];
    } else {
      this.thirdLevelOptions = [];
    }

    // Clear the selected third-level option when dependent option changes
    this.selectedThirdLevelOption = '';
  }




//Object effort details with values 

  // objeff(): void {
  //   console.log("ObjEff in obj : "+this.objectEffort)
  //   const selectedMainOption = this.selectedMainOption;
  //   const selectedDependentOption = this.selectedDependentOption;
  //   const selectedThirdLevelOption = this.selectedThirdLevelOption;
  
  //   if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'Analyse RD'
  //   ) {
  //     this.objectEffort = 0.35;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'SUC'
  //   ) {
  //     this.objectEffort = 0.25;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'SUC Review'
  //   ) {
  //     this.objectEffort = 0.05;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'Config'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'UAT Support'
  //   ) {
  //     this.objectEffort = 0.15;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Functional' &&
  //     selectedThirdLevelOption === 'Create Launching Del.'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'SUC Analysis'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'Detailed Design'
  //   ) {
  //     this.objectEffort = 0.30;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'Design Review'
  //   ) {
  //     this.objectEffort = 0.05;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'Coding'
  //   ) {
  //     this.objectEffort = 0.30;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'Code Review'
  //   ) {
  //     this.objectEffort = 0.05;
  //   } else if (
  //     selectedMainOption === 'New' &&
  //     selectedDependentOption === 'Technical' &&
  //     selectedThirdLevelOption === 'Developer Test'
  //   ) {
  //     this.objectEffort = 0.20;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Change' &&
  //     selectedThirdLevelOption === 'Functional Effort'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Change' &&
  //     selectedThirdLevelOption === 'Technical Effort'
  //   ) {
  //     this.objectEffort = 0.60;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Change' &&
  //     selectedThirdLevelOption === 'Testing Effort'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Testing' &&
  //     selectedThirdLevelOption === 'Test Design and Review'
  //   ) {
  //     this.objectEffort = 0.25;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Testing' &&
  //     selectedThirdLevelOption === 'Test Case'
  //   ) {
  //     this.objectEffort = 0.40;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Testing' &&
  //     selectedThirdLevelOption === 'Feature and Release Test'
  //   ) {
  //     this.objectEffort = 0.35;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Analysis and KT'
  //   ) {
  //     this.objectEffort = 0.20;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Manual Execution'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Test Script Design'
  //   ) {
  //     this.objectEffort = 0.60;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Test Execution'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'FAT Testing'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'FAT Automation'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'QAT Testing'
  //   ) {
  //     this.objectEffort = 0.75;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'QAT Automation'
  //   ) {
  //     this.objectEffort = 0.75;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'RT Testing'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'Existing' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'RT Automation'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '1-15'
  //   ) {
  //     this.objectEffort = 1.10;
  //   } else if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '15-30'
  //   ) {
  //     this.objectEffort =  1.15
  //   } else  if (
  //     selectedMainOption === 'All' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '30+'
  //   ) {
  //     this.objectEffort = 1.20;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Functional Effort' &&
  //     selectedThirdLevelOption === 'Describe Defect'
  //   ) {
  //     this.objectEffort = 0.70;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Functional Effort' &&
  //     selectedThirdLevelOption === 'UAT Support'
  //   ) {
  //     this.objectEffort = 0.30;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Technical Effort' &&
  //     selectedThirdLevelOption === 'Defect Analysis'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Technical Effort' &&
  //     selectedThirdLevelOption === 'Coding'
  //   ) {
  //     this.objectEffort = 0.15;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Technical Effort' &&
  //     selectedThirdLevelOption === 'Code Review'
  //   ) {
  //     this.objectEffort = 0.05;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Technical Effort' &&
  //     selectedThirdLevelOption === 'Developer Test'
  //   ) {
  //     this.objectEffort = 0.30;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Incident Priority' &&
  //     selectedThirdLevelOption === 'P1'
  //   ) {
  //     this.objectEffort = 1.20;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Incident Priority' &&
  //     selectedThirdLevelOption === 'P2'
  //   ) {
  //     this.objectEffort = 1.10;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Incident Priority' &&
  //     selectedThirdLevelOption === 'P3'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Incident Priority' &&
  //     selectedThirdLevelOption === 'P4'
  //   ) {
  //     this.objectEffort = 0.95;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing' &&
  //     selectedThirdLevelOption === 'Test Cases'
  //   ) {
  //     this.objectEffort = 0.65;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing' &&
  //     selectedThirdLevelOption === 'System and Release Test'
  //   ) {
  //     this.objectEffort = 0.35;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Analysis and KT'
  //   ) {
  //     this.objectEffort = 0.20;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Manual Execution'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Test Script Design'
  //   ) {
  //     this.objectEffort = 0.60;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Automation' &&
  //     selectedThirdLevelOption === 'Test Execution'
  //   ) {
  //     this.objectEffort = 0.10;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Priority' &&
  //     selectedThirdLevelOption === 'P1'
  //   ) {
  //     this.objectEffort = 1.10;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Priority' &&
  //     selectedThirdLevelOption === 'P2'
  //   ) {
  //     this.objectEffort = 1.05;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Priority' &&
  //     selectedThirdLevelOption === 'P3'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Priority' &&
  //     selectedThirdLevelOption === 'P4'
  //   ) {
  //     this.objectEffort = 0.95;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Category Exemption' &&
  //     selectedThirdLevelOption === 'L0'
  //   ) {
  //     this.objectEffort = 0.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Category Exemption' &&
  //     selectedThirdLevelOption === 'L1'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Category Exemption' &&
  //     selectedThirdLevelOption === 'L2'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Test Category Exemption' &&
  //     selectedThirdLevelOption === 'L3'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'FAT Testing'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'FAT Automation'
  //   ) {
  //     this.objectEffort = 1.00;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'QAT Testing'
  //   ) {
  //     this.objectEffort = 0.75;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'QAT Automation'
  //   ) {
  //     this.objectEffort = 0.75;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'RT Testing'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'Testing Type' &&
  //     selectedThirdLevelOption === 'RT Automation'
  //   ) {
  //     this.objectEffort = 0.50;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '1-15'
  //   ) {
  //     this.objectEffort = 1.10;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '15-30'
  //   ) {
  //     this.objectEffort = 1.15;
  //   } else if (
  //     selectedMainOption === 'Incident' &&
  //     selectedDependentOption === 'RT TC Qualification' &&
  //     selectedThirdLevelOption === '30+'
  //   ) {
  //     this.objectEffort = 1.20;
  //   } else {
  //     this.objectEffort = 0; 
  //   }
  // }  




  
  //Object effort details without values 
  
  objeff(): void {
    const selectedFirstOption = this.selectedFirstOption;
    const selectedMainOption = this.selectedMainOption;
    const selectedDependentOption = this.selectedDependentOption;
    const selectedThirdLevelOption = this.selectedThirdLevelOption;
    



   if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'Analyse RD'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'SUC'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'SUC Review'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'Config'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'UAT Support'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Functional' &&
      selectedThirdLevelOption === 'Create Launching Del.'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'SUC Analysis'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'Detailed Design'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'Design Review'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'Coding'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'Code Review'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'New' &&
      selectedDependentOption === 'Technical' &&
      selectedThirdLevelOption === 'Developer Test'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Change' &&
      selectedThirdLevelOption === 'Functional Effort'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Change' &&
      selectedThirdLevelOption === 'Technical Effort'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Change' &&
      selectedThirdLevelOption === 'Testing Effort'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Testing' &&
      selectedThirdLevelOption === 'Test Design and Review'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Testing' &&
      selectedThirdLevelOption === 'Test Case'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Testing' &&
      selectedThirdLevelOption === 'Feature and Release Test'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Analysis and KT'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Manual Execution'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Test Script Design'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Test Execution'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'FAT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'FAT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'QAT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'QAT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'RT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Existing' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'RT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '1-15'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '15-30'
    ) {
      this.objectEffort =  0;
    } else  if (
      selectedMainOption === 'All' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '30+'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Functional Effort' &&
      selectedThirdLevelOption === 'Describe Defect'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Functional Effort' &&
      selectedThirdLevelOption === 'UAT Support'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Technical Effort' &&
      selectedThirdLevelOption === 'Defect Analysis'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Technical Effort' &&
      selectedThirdLevelOption === 'Coding'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Technical Effort' &&
      selectedThirdLevelOption === 'Code Review'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Technical Effort' &&
      selectedThirdLevelOption === 'Developer Test'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Incident Priority' &&
      selectedThirdLevelOption === 'P1'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Incident Priority' &&
      selectedThirdLevelOption === 'P2'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Incident Priority' &&
      selectedThirdLevelOption === 'P3'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Incident Priority' &&
      selectedThirdLevelOption === 'P4'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing' &&
      selectedThirdLevelOption === 'Test Cases'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing' &&
      selectedThirdLevelOption === 'System and Release Test'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Analysis and KT'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Manual Execution'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Test Script Design'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Automation' &&
      selectedThirdLevelOption === 'Test Execution'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Priority' &&
      selectedThirdLevelOption === 'P1'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Priority' &&
      selectedThirdLevelOption === 'P2'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Priority' &&
      selectedThirdLevelOption === 'P3'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Priority' &&
      selectedThirdLevelOption === 'P4'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Category Exemption' &&
      selectedThirdLevelOption === 'L0'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Category Exemption' &&
      selectedThirdLevelOption === 'L1'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Category Exemption' &&
      selectedThirdLevelOption === 'L2'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Test Category Exemption' &&
      selectedThirdLevelOption === 'L3'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'FAT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'FAT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'QAT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'QAT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'RT Testing'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'Testing Type' &&
      selectedThirdLevelOption === 'RT Automation'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '1-15'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '15-30'
    ) {
      this.objectEffort = 0;
    } else if (
      selectedMainOption === 'Incident' &&
      selectedDependentOption === 'RT TC Qualification' &&
      selectedThirdLevelOption === '30+'
    ) {
      this.objectEffort = 0;
    } else {
      this.objectEffort = 0; 
    }
  }  



  selectedType: string = '';
  selectedObjectComplexity: string = '';

  functionalEffort: number = 0;
  technicalEffort: number = 0;
  testingEffort: number = 0;
  automationEffort: number = 0;

  onTypeChange() {
    if (this.selectedType === 'Report') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 20.53;
        this.technicalEffort = 30.8;
        this.testingEffort = 17.11;
        this.automationEffort = 25.67;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 32.00;
        this.technicalEffort = 48.00;
        this.testingEffort = 26.67;
        this.automationEffort = 40.00;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 46.20;
        this.technicalEffort = 69.30;
        this.testingEffort = 38.50;
        this.automationEffort = 57.75;
      }
    }
    if (this.selectedType === 'Interface') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 36.67;
        this.technicalEffort = 55.00;
        this.testingEffort = 30.56;
        this.automationEffort = 45.83;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 26.67;
        this.technicalEffort = 40.00;
        this.testingEffort = 22.22;
        this.automationEffort = 33.33;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 42.00;
        this.technicalEffort = 63.00;
        this.testingEffort = 35.00;
        this.automationEffort = 52.50;
      }
    }
    if (this.selectedType === 'Data Conversion') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 18.00;
        this.technicalEffort = 27.00;
        this.testingEffort = 15.56;
        this.automationEffort = 22.50;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 26.67;
        this.technicalEffort = 40.00;
        this.testingEffort = 22.22;
        this.automationEffort = 33.33;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 42.00;
        this.technicalEffort = 63.00;
        this.testingEffort = 35.00;
        this.automationEffort = 52.50;
      }
    }
    if (this.selectedType === 'Enhancement / User Exits') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 19.80;
        this.technicalEffort = 29.70;
        this.testingEffort = 16.50;
        this.automationEffort = 24.75;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 30.80;
        this.technicalEffort = 46.20;
        this.testingEffort = 25.67;
        this.automationEffort = 38.50;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 46.20;
        this.technicalEffort = 69.30;
        this.testingEffort = 38.50;
        this.automationEffort = 57.75;
      }
    }
    if (this.selectedType === 'Smart Form') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 23.33;
        this.technicalEffort = 35.00;
        this.testingEffort = 19.44;
        this.automationEffort = 29.17;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 32.67;
        this.technicalEffort = 49.00;
        this.testingEffort = 27.22;
        this.automationEffort = 40.83;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 51.33;
        this.technicalEffort = 77.00;
        this.testingEffort = 42.78;
        this.automationEffort = 64.17;
      }
    }

    if (this.selectedType === 'Workflow') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 23.33;
        this.technicalEffort = 35.00;
        this.testingEffort = 19.44;
        this.automationEffort = 29.17;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 42.00;
        this.technicalEffort = 63.00;
        this.testingEffort = 35.00;
        this.automationEffort = 52.50;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 86.53;
        this.technicalEffort = 129.80;
        this.testingEffort = 72.11;
        this.automationEffort = 108.17;
      }
    }
    if (this.selectedType === 'Webdynpro') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 30.67;
        this.technicalEffort = 46.00;
        this.testingEffort = 25.56;
        this.automationEffort = 38.33;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 48.00;
        this.technicalEffort = 72.00;
        this.testingEffort = 40.00;
        this.automationEffort = 60.00;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 82.13;
        this.technicalEffort = 123.20;
        this.testingEffort = 68.44;
        this.automationEffort = 102.67;
      }
    }
    if (this.selectedType === 'Dialogs / Infotypes') {
      if (this.selectedObjectComplexity === 'Low') {
        this.functionalEffort = 6.90;
        this.technicalEffort = 13.80;
        this.testingEffort = 6.90;
        this.automationEffort = 0.00;
      } else if (this.selectedObjectComplexity === 'Medium') {
        this.functionalEffort = 10.35;
        this.technicalEffort = 20.70;
        this.testingEffort = 10.35;
        this.automationEffort = 0.00;
      } else if (this.selectedObjectComplexity === 'High') {
        this.functionalEffort = 13.80;
        this.technicalEffort = 34.50;
        this.testingEffort = 13.80;
        this.automationEffort = 0.00;
      }
    }
    if (this.selectedType === 'Incident') {
      if (this.selectedObjectComplexity === 'L0') {
        this.functionalEffort = 0.50;
        this.technicalEffort = 1.00;
        this.testingEffort = 1.00;
        this.automationEffort = 3.00;
      } else if (this.selectedObjectComplexity === 'L1') {
        this.functionalEffort = 1.75;
        this.technicalEffort = 3.50;
        this.testingEffort = 3.50;
        this.automationEffort = 6.90;
      } else if (this.selectedObjectComplexity === 'L2') {
        this.functionalEffort = 6.90;
        this.technicalEffort = 10.40;
        this.testingEffort = 6.90;
        this.automationEffort = 13.80;
      } else if (this.selectedObjectComplexity === 'L3') {
        this.functionalEffort = 10.40;
        this.technicalEffort = 13.80;
        this.testingEffort = 10.40;
        this.automationEffort = 20.70;
      }
    }
  }







  next: boolean = true;

  replaceButton() {
    this.next = !this.next;
  }
}