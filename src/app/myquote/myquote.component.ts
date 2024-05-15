import { Component, ViewChild } from '@angular/core';
import { ADOServiceComponent } from '../RestTemplate/adoservice/adoservice.component';
import { JiraServiceComponent } from '../RestTemplate/jira-service/jira-service.component';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from '../dialog-content/dialog-content.component';
import { ElementRef } from '@angular/core';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-myquote',
  templateUrl: './myquote.component.html',
  styleUrl: './myquote.component.css'
})
export class MyquoteComponent {
    tableElement: any;
    feEffort: any=0;
    rtAutoEffort: any=0;
    qasAutoEffort: any=0;
    rtEffort: any=0;
    teEffort: any=0;
    fatEffort: any = 0;
    fatAutoEffort: any = 0;
    qasEffort: any = 0;
    clientName: any;
    projectName: any;
    quoteCrtDate: any;
    totalEff: string='';
    quoteID: any;
    detailedInformation: Object[]=[];
    dialogRef: any;
    feAnalyseRD: any;
    feSUC: any;
    feSUCReview: any;
    feUATSupport: any;
    feCrtLaunchDel: any;
    teSUCAnalysis: any;
    teDetailedDesign: any;
    teDesignReview: any;
    teCodeReview: any;
    teDevTest: any;
    fatDesignReview: any;
    fatTestCases: any;
    fatAutoAnalysisKT: any;
    fatAutoManualExec: any;
    fatAutoTSDesign: any;
    qasAutoTSDesign: any;
    qasAutoManualExec: any;
    qasAutoAnalysisKT: any;
    qasDesignReview: any;
    qasTestCases: any;
    rtDesignReview: any;
    rtTestCases: any;
    rtAutoAnalysisKT: any;
    rtAutoManualExec: any;
    rtAutoTSDesign: any;

    functionsExecuted: boolean = false;


    originalData = [
        [
          ["Functional Effort",'','Functional Config',"Analyse RD","SUC","SUC Review","UAT Support","Create Launching Del.",'',"Total Functional Effort"],
         
        ],
        [
          ["Technical Effort",'','Coding',"SUC Analysis","Detailed Design","Design Review","Code Review","Developer Test",'',"Total Technical Effort"],
         
        ],
        [
          ["FAT (Manual)",'','Test Execution',"Test Design Review","Test Cases",'',"Total FAT (Manual) Effort"],
         
        ],
        [
          ["FAT (Automation)",'','Script Execution',"Analysis & KT","Manual Execution","Test Script Design",'',"Total FAT (Auto) Effort"],
        ],
        [
          ["QA (Manual)",'','Test Execution',"Test Design Review","Test Cases",'',"Total QA (Manual) Effort"],
        ],
        [
          ["QA (Automation)",'','Script Execution',"Analysis & KT","Manual Execution","Test Script Design",'',"Total QA (Auto) Effort"],
        ],
        [
          ["RT (Manual)",'','Test Execution',"Test Design Review","Test Cases",'',"Total RT (Manual) Effort"],
        ],
        [
          ["RT (Automation)",'','Script Execution',"Analysis & KT","Manual Execution","Test Script Design",'',"Total RT (Auto) Effort"],
     
        ]
      ];
    


      
  constructor(private http:HttpClient, public dialog: MatDialog,private el: ElementRef){}
  analyzeRD = 0;
  suc = 0;
  ts = 0;
  build = 0;
  codeReview = 0;
  unitTesting = 0;
  testCasePrep = 0;
  fat = 0;
  sit = 0;
  uat =0;
  rt = 0;
  count:number=0;


  adoComp:ADOServiceComponent = new ADOServiceComponent(this.http);
  jiraComp:JiraServiceComponent = new JiraServiceComponent(this.http);  
  showTable: boolean = false;
  selectedALM: string = 'Jira';
  showJiraFields: boolean = true;
  showADOFields: boolean = false;
  sbServer:string="http://localhost:8080"
  jiraIssueCategory:any;
  jiraProjectName:any;
  jiraIssueStatus:any;
  jiraIssueID:any;
  jiraIssue:any;
  adoProjectName:any;
  adoIssueCategory:any;
  adoIssueStatus:any;
  adoIssueID:any;
  adoIssue:any;
  

  

 
  ngOnInit() {
    console.log("GET QUOTE");
    //console.log("Init")
    this.callSBAPI(this.jiraComp.getJiraProjectDetails(), 'projectName');
  }
 
  onALMSelectionChange() {
    this.showJiraFields = this.selectedALM === 'Jira';
    this.showADOFields = this.selectedALM === 'ADO';
    this.showTable = !(this.showJiraFields || this.showADOFields);
    this.showJiraFields ? this.callSBAPI(this.jiraComp.getJiraProjectDetails(), 'projectName') : this.callSBAPI_ado(this.adoComp.getADOProjectDetails(), 'projectName');
}

getQuote() {
  this.detailedInformation=[]  
  var eff=0;
  var table = document.getElementById("lineItems") as HTMLTableElement;
  while(table.childNodes.length>2){
    table.removeChild(table.lastChild!)
  };
  
  //var d = new Date()

  var quoteID_inp = document.getElementById("outputQuote")! as HTMLInputElement
  var quoteID = quoteID_inp.value;
  this.quoteID =quoteID;
  if (quoteID.trim().length != 0) {
      fetch('http://localhost:8080/estimation/' + quoteID)
          .then(response => {
              return response.json();
          }).then(data => {
            console.log("Data Quotation: "+data.quotation);
          if (data.quotation == null) {
            this.functionsExecuted?this.functionsExecuted=false:this.functionsExecuted;  
            alert('Quote ID not found');
              
              return;
          } else {
              var clientID = data.quotation.technology[0].abapDetails[0].clientID;

              fetch('http://localhost:8080/estimation/abap/clientQualification/' + clientID)
                  .then(response2 => {
                      return response2.json();
                  }).then(data2 => {
                  var clientName=document.getElementById("clientName")! as HTMLInputElement
                  clientName.value = data2.abapClientQualification.clientName;
                  this.clientName=data2.abapClientQualification.clientName;
                  var projectName = document.getElementById("projectName")! as HTMLInputElement
                  projectName.value = data2.abapClientQualification.projectName;
                  this.projectName= data2.abapClientQualification.projectName;
                  // document.getElementById("stableFactor")!.value = data2.abapClientQualification.stabilizationFactor;
                  // document.getElementById("testingFactor")!.value = data2.abapClientQualification.testingFactor;

                  //document.getElementById("outputQuote").value = data.quotation.quoteID;
                  var quoteCrtDate = document.getElementById("quoteCrtDate") as HTMLInputElement;
                  quoteCrtDate.value = data.quotation.createdDate;
                  var d = new Date(data.quotation.createdDate);
                  quoteCrtDate.value = d.toLocaleDateString('en-GB');
                  this.quoteCrtDate=quoteCrtDate.value;
                  //document.getElementById("quoteCrtDate").value = new Date( data.quotation.createdDate).toLocaleDateString("en-GB");
                  //var totalEff=document.getElementById("totalEffort") as HTMLInputElement
                  //totalEff.value = totalEffort.toFixed(2);
                  //document.getElementById("lineItems")!.innerHTML = tableTemplate!.innerHTML;
                  var table = document.getElementById("lineItems");
                  for (var i in data.quotation.technology[0].abapDetails) {
                      var row = document.createElement('tr');
                      row.id = "tr" + i;
                      
                      

                      var td0 = row.appendChild(document.createElement('td'));
                      //td0.classList.add('leftedge');
                      var td1 = row.appendChild(document.createElement('td'));
                      var td2 = row.appendChild(document.createElement('td'));
                      var td3 = row.appendChild(document.createElement('td'));
                      var td4 = row.appendChild(document.createElement('td'));
                      var td5 = row.appendChild(document.createElement('td'));
                      var td6 = row.appendChild(document.createElement('td'));
                      var td7 = row.appendChild(document.createElement('td'));
                      var td7a = row.appendChild(document.createElement('td'));

                      var td8 = row.appendChild(document.createElement('td'));
                      var td9 = row.appendChild(document.createElement('td'));

                      var td10 = row.appendChild(document.createElement('td'));
                      var td11 = row.appendChild(document.createElement('td'));

                      var td12 = row.appendChild(document.createElement('td'));
                      var td13 = row.appendChild(document.createElement('td'));
                      var td14 = row.appendChild(document.createElement('td'));
                      var td15 = row.appendChild(document.createElement('td'));

                      var td16 = row.appendChild(document.createElement('td'));
                      var td17 = row.appendChild(document.createElement('td'));
                      var td18 = row.appendChild(document.createElement('td'));
                      var td19 = row.appendChild(document.createElement('td'));

                      var td20 = row.appendChild(document.createElement('td'));
                      var td21 = row.appendChild(document.createElement('td'));
                      var td22 = row.appendChild(document.createElement('td'));
                      var td23 = row.appendChild(document.createElement('td'));
                      //td23.classList.add("rightedge");



                      td0.innerHTML = data.quotation.technology[0].abapDetails[i].objectType;
                      td1.innerHTML = data.quotation.technology[0].abapDetails[i].complexity;
                      td2.innerHTML = data.quotation.technology[0].abapDetails[i].category;
                      if (data.quotation.technology[0].abapDetails[i].devConfig) {
                          td3.innerHTML = 'Yes';
                      } else {
                          td3.innerHTML = 'No';
                      }
                      if (data.quotation.technology[0].abapDetails[i].automation) {
                          td4.innerHTML = 'Auto';
                      } else {
                          td4.innerHTML = 'Manual';
                      }
                      if (data.quotation.technology[0].abapDetails[i].qa) {
                          td5.innerHTML = 'Yes';
                      } else {
                          td5.innerHTML = 'No';
                      }
                      if (data.quotation.technology[0].abapDetails[i].rt) {
                          td6.innerHTML = 'Yes';
                      } else {
                          td6.innerHTML = 'No';
                      }

                      td7.innerHTML = data.quotation.technology[0].abapDetails[i].regressionQualification;
                      td7a.innerHTML = data.quotation.technology[0].abapDetails[i].abapItemEffort;
                      eff+=Number(td7a.innerHTML)

                      this.analyzeRD = this.analyzeRD + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feAnalyseRD;
                      this.suc = this.suc + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUC;
                      this.suc = this.suc + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUCReview;
                      this.suc = this.suc + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teSUCAnalysis;
                      this.uat = this.uat + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feUATSupport;

                      this.build = this.build + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feConfig;
                      this.build = this.build + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teCoding;

                      this.ts = this.ts + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDetailedDesign;
                      this.ts = this.ts + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDesignReview;

                      this.codeReview = this.codeReview + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teCodeReview;
                      this.unitTesting = this.unitTesting + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDevTest;

                      this.testCasePrep = this.testCasePrep + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription;
                      this.testCasePrep = this.testCasePrep + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription;
                      this.testCasePrep = this.testCasePrep + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription;
                      this.fat = this.fat + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestExecution + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptExecution;
                      this.sit = this.sit + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestExecution + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptExecution;
                      this.rt = this.rt + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestExecution + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptExecution;

                      //funcitonal
                      var feEffort = 'Analyse RD : ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feAnalyseRD;
                      this.feAnalyseRD= data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feAnalyseRD;

                      feEffort += '\\nSUC: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUC;
                      this.feSUC=data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUC;

                      feEffort += '\\nSUC Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUCReview;
                      this.feSUCReview=data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feSUCReview;

                      feEffort += '\\nUAT Support: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feUATSupport;
                      this.feUATSupport=data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feUATSupport;

                      feEffort += '\\nCreate Launching Del.: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feCrtLaunchDel;
                      this.feCrtLaunchDel=data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].feCrtLaunchDel;

                      feEffort += '\\n--------------------------------';

                      feEffort += '\\nTotal Functional Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feOthers;
                      this.feEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feOthers;
                      

                      feEffort += '\\n--------------------------------';
                      var feRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + feEffort + '\');\">';
                      td8.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feConfig;
                      td9.innerHTML = feRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feOthers + '</a>';
                      //td9.onclick(alert('Hello world!'));
                      console.log("i: "+i)
                      
                      this.originalData[0][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td8.innerHTML),this.feAnalyseRD,this.feSUC,this.feSUCReview,this.feUATSupport,this.feCrtLaunchDel,'',Number((Number(td8.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feOthers)).toFixed(2))]

                      //technical
                      var teEffort = 'SUC Analysis : ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teSUCAnalysis;
                      this.teSUCAnalysis = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teSUCAnalysis;
                      
                      teEffort += '\\nDetailed Design: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDetailedDesign;
                      this.teDetailedDesign = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDetailedDesign;

                      teEffort += '\\nDesign Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDesignReview;
                      this.teDesignReview =  data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDesignReview;

                      teEffort += '\\nCode Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teCodeReview;
                      this.teCodeReview = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teCodeReview;

                      teEffort += '\\nDeveloper Test: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDevTest;
                      this.teDevTest = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].teDevTest;
                      
                      teEffort += '\\n--------------------------------';
                      teEffort += '\\nTotal Technical Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teOthers;
                      this.teEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teOthers;
                      teEffort += '\\n--------------------------------';
                      var teRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + teEffort + '\');\">';

                      td10.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teCoding;
                      td11.innerHTML = teRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teOthers + '</a>';

                      this.originalData[1][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td10.innerHTML),this.teSUCAnalysis,this.teDetailedDesign,this.teDesignReview,this.teCodeReview ,this.teDevTest,'',Number((Number(td10.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teOthers)).toFixed(2))]

                      //fat
                      var fatEffort = '\\nTest Design Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatDesignReview;
                      this.fatDesignReview = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatDesignReview;

                      fatEffort += '\\nTest Cases: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatTestCases;
                      this.fatTestCases = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatTestCases;

                      fatEffort += '\\n--------------------------------';
                      fatEffort += '\\nTotal FAT (Manual) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription;
                      this.fatEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription;
                      

                      fatEffort += '\\n--------------------------------';

                      var fatRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + fatEffort + '\');\">';
                      var fatAutoEffort = '\\nAnalysis & KT: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoAnalysisKT;
                      this.fatAutoAnalysisKT = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoAnalysisKT;

                      fatAutoEffort += '\\nManual Execution: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoManualExec;
                      this.fatAutoManualExec =  data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoManualExec;

                      fatAutoEffort += '\\nTest Script Design: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoTSDesign;
                      this.fatAutoTSDesign = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].fatAutoTSDesign;

                      fatAutoEffort += '\\n--------------------------------';

                      fatAutoEffort += '\\nTotal FAT (Auto) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription;
                      this.fatAutoEffort =data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription;

                      fatAutoEffort += '\\n--------------------------------';

                      var fatAutoRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + fatAutoEffort + '\');\">';
                      td12.innerHTML = fatRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription + '</a>';
                      td13.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestExecution;
                      td14.innerHTML = fatAutoRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription + '</a>';
                      td15.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptExecution;
                      this.originalData[2][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td13.innerHTML),this.fatDesignReview,this.fatTestCases,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription)+Number(td13.innerHTML)).toFixed(2))]
                      this.originalData[3][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td15.innerHTML),this.fatAutoAnalysisKT,this.fatAutoManualExec,this.fatAutoEffort,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription )+Number(td15.innerHTML)).toFixed(2))]

                      //qa
                      var qasEffort = '\\nTest Design Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasDesignReview;
                      this.qasDesignReview = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasDesignReview;

                      qasEffort += '\\nTest Cases: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasTestCases;
                      this.qasTestCases = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasTestCases;

                      qasEffort += '\\n--------------------------------';2

                      qasEffort += '\\nTotal QA (Manual) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription;
                      this.qasEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription;

                      qasEffort += '\\n--------------------------------';

                      var qasRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + qasEffort + '\');\">';
                      var qasAutoEffort = '\\nAnalysis & KT: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoAnalysisKT;
                      this.qasAutoAnalysisKT = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoAnalysisKT;

                      qasAutoEffort += '\\nManual Execution: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoManualExec;
                      this.qasAutoManualExec = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoManualExec;

                      qasAutoEffort += '\\nTest Script Design: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoTSDesign;
                      this.qasAutoTSDesign = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].qasAutoTSDesign;

                      qasAutoEffort += '\\n--------------------------------';

                      qasAutoEffort += '\\nTotal QA (Auto) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription;
                      this.qasAutoEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription;

                      qasAutoEffort += '\\n--------------------------------';
                      
                      var qasAutoRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + qasAutoEffort + '\');\">';
                      this.qasAutoEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription;

                      td16.innerHTML = qasRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription + '</a>';
                      td17.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestExecution;
                      td18.innerHTML = qasAutoRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription + '</a>';
                      td19.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptExecution;

                      this.originalData[4][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td17.innerHTML),this.qasDesignReview,this.qasTestCases,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription)+Number(td17.innerHTML)).toFixed(2))]
                      this.originalData[5][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td19.innerHTML),this.qasAutoAnalysisKT,this.qasAutoManualExec,this.qasAutoEffort,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription)+Number(td19.innerHTML)).toFixed(2))]
                      //this.originalData[2][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',td17.innerHTML,this.fatDesignReview,this.fatTestCases,'',(Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription)+Number(td17.innerHTML)).toFixed(2)]
                      
                      //rt
                      var rtEffort = '\\nTest Design Review: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtDesignReview;
                      this.rtDesignReview = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtDesignReview;
                      
                      rtEffort += '\\nTest Cases: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtTestCases;
                      this.rtTestCases = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtTestCases;

                      rtEffort += '\\n--------------------------------';

                      rtEffort += '\\nTotal RT (Manual) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription;
                      this.rtEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription;

                      rtEffort += '\\n--------------------------------';

                      var rtRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + rtEffort + '\');\">';
                      var rtAutoEffort = '\\nAnalysis & KT: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoAnalysisKT;
                      this.rtAutoAnalysisKT = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoAnalysisKT;

                      rtAutoEffort += '\\nManual Execution: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoManualExec;
                      this.rtAutoManualExec = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoManualExec;

                      rtAutoEffort += '\\nTest Script Design: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoTSDesign;
                      this.rtAutoTSDesign = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].crBreakUp[0].rtAutoTSDesign;

                      rtAutoEffort += '\\n--------------------------------';

                      rtAutoEffort += '\\nTotal RT (Auto) Effort: ' + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription;
                      this.rtAutoEffort = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription;

                      rtAutoEffort += '\\n--------------------------------';

                      var rtAutoRefStr = '<a style="color:blue;text-decoration:underline;" onclick=\"alert(\'' + rtAutoEffort + '\');\">';
                      this.rtAutoEffort =data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription;

                      td20.innerHTML = rtRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription + '</a>';
                      td21.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestExecution;
                      td22.innerHTML = rtAutoRefStr + data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription + '</a>';
                      td23.innerHTML = data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptExecution;
                      this.originalData[6][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td21.innerHTML),this.rtDesignReview,this.rtTestCases,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription)+Number(td21.innerHTML)).toFixed(2))]
                      this.originalData[7][Number(i)+1] = [td0.innerHTML+'-'+td1.innerHTML,'',Number(td23.innerHTML),this.rtAutoAnalysisKT,this.rtAutoManualExec,this.rtAutoEffort,'',Number((Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription)+Number(td23.innerHTML)).toFixed(2))]
                      
                        var tempObj:Object = {
                            quoteID:this.quoteID,
                            desc:td0.innerHTML+"--"+td1.innerHTML,
                            clientName: this.clientName,
                            projectName:this.projectName,
                            quoteCrtDate:this.quoteCrtDate,
                            totalEff: eff.toFixed(2),
                            feEffort: (Number(td8.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].feOthers)).toFixed(2),
                            teEffort: (Number(td10.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].teOthers)).toFixed(2),
                            fatEffort:(Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatTestDescription)+Number(td13.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].fatScriptDescription )+Number(td15.innerHTML)).toFixed(2),
                            qaEffort: (Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasTestDescription)+Number(td17.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].qasScriptDescription)+Number(td19.innerHTML)).toFixed(2),
                            rtEffort: (Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtTestDescription)+Number(td21.innerHTML)+Number(data.quotation.technology[0].abapDetails[i].estimationBreakUp[0].rtScriptDescription)+Number(td23.innerHTML)).toFixed(2),
                          
                            //functional
                            feConfig: Number(td8.innerHTML),

                            feAnalyseRD:this.feAnalyseRD,
                            feSUC: this.feSUC,
                            feSUCReview:this.feSUCReview,
                            feUATSupport:this.feUATSupport,
                            feCrtLaunchDel:this.feCrtLaunchDel,
                          
                            
                            

                            //technical
                            teCod: (Number(td10.innerHTML)),

                            teSUCAnalysis: this.teSUCAnalysis,
                            teDetailedDesign: this.teDetailedDesign,
                            teDesignReview: this.teDesignReview,
                            teCodeReview: this.teCodeReview,
                            teDevTest: this.teDevTest,



                            //fat
                            fatDesignReview: this.fatDesignReview,
                            fatTestCases : this.fatTestCases,

                            fatTestExe: Number(td13.innerHTML),
                            
                            fatAutoAnalysisKT: this.fatAutoAnalysisKT,
                            fatAutoManualExec: this.fatAutoManualExec,
                            fatAutoTSDesign: this.fatAutoTSDesign,

                            fatScriptExe: Number(td15.innerHTML), 





                            //qa
                            qasDesignReview: this.qasDesignReview,
                            qasTestCases: this.qasTestCases,

                            qasTestExe: Number(td17.innerHTML),

                            qasAutoAnalysisKT: this.qasAutoAnalysisKT,
                            qasAutoManualExec: this.qasAutoManualExec,
                            qasAutoTSDesign: this.qasAutoTSDesign,

                            qasScriptExe: Number(td19.innerHTML),


                            




                            //rt
                            rtDesignReview: this.rtDesignReview,
                            rtTestCases: this.rtTestCases,

                            rtTestExe: Number(td21.innerHTML),

                            rtAutoAnalysisKT: this.rtAutoAnalysisKT,
                            rtAutoManualExec: this.rtAutoManualExec,
                            rtAutoTSDesign: this.rtAutoTSDesign,


                            rtScriptExe: Number(td23.innerHTML)



                            
                        };

                        (this.detailedInformation).push(tempObj);
                        this.count++;

                      table!.appendChild(row);


                      if(Number(i)==((data.quotation.technology[0].abapDetails).length)-1){
                          td0.classList.add('leftedge');
                          td23.classList.add('rightedge')
                      }
                      var totalEff = document.getElementById("totalEffort") as HTMLInputElement;
                      totalEff.value = eff.toString();
                      this.totalEff = eff.toString();

                      /*row.insertCell(5).textContent=data.quotation.technology[0].abapDetails[i].complexity;
                      row.insertCell(6).textContent=data.quotation.technology[0].abapDetails[i].objectType;
                      row.insertCell(7).textContent=data.quotation.technology[0].abapDetails[i].complexity;*/
                  }


              })
              console.log("Hello!");
            this.functionsExecuted = true;
              //document.getElementById("jsonRsp").value = obj;
          }

      });

      
  } else {
      alert('Quote ID can not be blank');
  }
}

loadWorkItemStates() {
  this.adoProjectName = document.getElementById("adoProject") as HTMLSelectElement
  this.adoProjectName=this.adoProjectName.options[this.adoProjectName.selectedIndex].innerHTML;
  this.adoIssueCategory = document.getElementById("adoWorkItemType") as HTMLSelectElement 
  this.adoIssueCategory = this.adoIssueCategory.options[this.adoIssueCategory.selectedIndex].value;
  console.log("Project: "+this.adoProjectName+"\nIssue Category:"+this.adoIssueCategory);
  this.callSBAPI_ado(this.adoComp.getADOIssueTypeStatus(this.adoProjectName,this.adoIssueCategory),'states')

}

loadWorkItemTypes() {
  this.adoProjectName = document.getElementById("adoProject") as HTMLSelectElement
  this.adoProjectName=this.adoProjectName.options[this.adoProjectName.selectedIndex].innerHTML;
  this.callSBAPI_ado(this.adoComp.getADOIssueTypes(this.adoProjectName), 'category');
}
loadWorkItems() {
  this.adoProjectName = document.getElementById("adoProject") as HTMLSelectElement
  this.adoProjectName = this.adoProjectName.options[this.adoProjectName.selectedIndex].innerHTML;
  this.adoIssueCategory = document.getElementById("adoWorkItemType") as HTMLSelectElement 
  this.adoIssueCategory = this.adoIssueCategory.options[this.adoIssueCategory.selectedIndex].value;
  this.adoIssueStatus = document.getElementById("adoWorkItemStatus") as HTMLSelectElement;
  //this.callSBAPI(this.adoComp.getIssues('project%20%3D%20"' + this.adoProjectName + '"%20AND%20type%20%3D%20"' + this.adoIssueCategory + '"AND%20status%20%3D%20"' + this.adoIssueStatus.options[this.adoIssueStatus.selectedIndex].value + '"%20ORDER%20BY%20created%20DESC'), 'issues');
  
  //console.log("______________BEEEEEEEEEEEEEEEEEEEE___________")
  this.callSBAPI_ado(this.adoComp.getADOWorkItems(  {"WorkItemType":this.adoIssueCategory, "State":this.adoIssueStatus.options[this.adoIssueStatus.selectedIndex].value },this.adoProjectName), 'issues');
}
loadAdoSummary() {
  this.adoIssueID = document.getElementById("adoWorkItemID") as HTMLSelectElement
  this.callSBAPI_ado(this.adoComp.getADOWorkItem(this.adoProjectName,this.adoIssue.options[this.adoIssue.selectedIndex].value), 'issueSummary');
}

callSBAPI_ado(url:Observable<any>, context:string) {
  var respStatus:any;
  console.log(url)
  url.subscribe
      (response => {
          var data:any;
          respStatus = response.status;
          data= response;
          console.log("ADO:"+JSON.stringify(response));
          
      if (response.length != 0) {
          if (context == 'projectName') {
              document.getElementById("adoProject")!.innerHTML = "";
              for (var i in data.value) {
                  var pjtInfo = document.createElement('option');
                  pjtInfo.value = data.value[i].id;
                  pjtInfo.title = data.value[i].name;
                  pjtInfo.innerHTML = data.value[i].name;
                  if (Number(i) == 0) {
                      this.adoProjectName = data.value[i].id;
                  }
                  document.getElementById("adoProject")!.appendChild(pjtInfo);
              }
              //var adoPro =document.getElementById("adoProject")! as HTMLSelectElement;
              this.adoProjectName = document.getElementById("adoProject")! as HTMLSelectElement;
              console.log("PJT NAME: "+this.adoProjectName);
              this.adoProjectName = this.adoProjectName.options[this.adoProjectName.selectedIndex].innerHTML;
              
              console.log("This ADO:"+this.adoProjectName)
              this.callSBAPI_ado(this.adoComp.getADOIssueTypes(this.adoProjectName), 'category');
          }
          if (context == 'category') {
              document.getElementById("adoWorkItemType")!.innerHTML = "";
              console.log("Data WorkItems:"+JSON.stringify(data))
              for (var i in data.value) {

                  var category = document.createElement('option');
                  category.value = data.value[i].name;
                  category.innerHTML = data.value[i].name;
                  if (Number(i) == 0) {
                      this.adoIssueCategory = data.value[i].name;
                  }
                  document.getElementById("adoWorkItemType")!.appendChild(category);
              }
              this.adoIssueStatus = document.getElementById("adoWorkItemStatus") as HTMLSelectElement;
              
              this.callSBAPI_ado(this.adoComp.getADOIssueTypeStatus(  this.adoProjectName,this.adoIssueCategory), 'states');
          } 
          else if(context == 'states'){
              console.log("issue:"+response.value.length);
              if(response.value.length!=0){
              document.getElementById("adoWorkItemStatus")!.innerHTML = "";
              console.log("In ADO States")
              console.log("Data: "+JSON.stringify(data))
             
              for (var i in data.value) {

                  var category = document.createElement('option');
                  category.value = data.value[i].name;
                  category.innerHTML = data.value[i].name;
                  if (Number(i) == 0) {
                      category.selected = true;
                  }
                  document.getElementById("adoWorkItemStatus")!.appendChild(category);
              }
              
              this.adoIssue = document.getElementById("adoWorkItemID") as HTMLSelectElement;
              console.log(this.adoIssue)
               
              this.callSBAPI_ado(this.adoComp.getADOWorkItems(  {"WorkItemType":this.adoIssueCategory, "State":this.adoIssueStatus.options[this.adoIssueStatus.selectedIndex].value,"TeamProject":this.adoProjectName },this.adoProjectName),`issues`);
              
            }
              }else if (context == 'issues') {
                  console.log("issue:"+response.workItems.length);
                  if(response.workItems.length!=0){
                  document.getElementById("adoWorkItemID")!.innerHTML = "";
                  console.log("In ADO Issues")
                  console.log("Data: "+JSON.stringify(data))
                  if(data.workItems){
                      console.log("It was true")
                  for (var i in data.workItems) {

                      var category = document.createElement('option');
                      category.value = data.workItems[i].id;
                      category.innerHTML = data.workItems[i].id;
                      if (Number(i) == 0) {
                          category.selected = true;
                      }
                      document.getElementById("adoWorkItemID")!.appendChild(category);
                  }
                  ;
                  this.adoIssue = document.getElementById("adoWorkItemID") as HTMLSelectElement;
                  console.log(this.adoIssue)
                  
                  this.callSBAPI_ado(this.adoComp.getADOWorkItem(this.adoProjectName,this.adoIssue.options[this.adoIssue.selectedIndex].value),`issueSummary`);
                  }
                  
              }
              else{
                  console.log("In Else");
                  document.getElementById("adoWorkItemID")!.innerHTML = "";
                  document.getElementById("adoWorkItemSummary")!.innerHTML = "";

              }

            
          } else if (context == 'issueSummary') {
              document.getElementById("adoWorkItemSummary")!.innerHTML = data.fields["System.Title"];
          }
          
      }

  });
}

callSBAPI(url:Observable<any>, context:string) {
  var respStatus:any;
  console.log(url)
  url.subscribe
      (response => {
          var data:any;
          respStatus = response.status;
          data= response;
          console.log("Total: "+response.total);
      
      if (response.total != 0) {
          if (context == 'projectName') {
              document.getElementById("jiraProject")!.innerHTML = "";
              for (var i in data.values) {
                  var pjtInfo = document.createElement('option');
                  pjtInfo.value = data.values[i].key;
                  pjtInfo.title = data.values[i].name;
                  pjtInfo.innerHTML = data.values[i].name;
                  if (Number(i) == 0) {
                      this.jiraProjectName = data.values[i].key;
                  }
                  document.getElementById("jiraProject")!.appendChild(pjtInfo);
              }
              var jiraPro =document.getElementById("jiraProject")! as HTMLSelectElement;
              this.jiraProjectName = document.getElementById("jiraProject")! as HTMLSelectElement;
              this.jiraProjectName = this.jiraProjectName.options[jiraPro.selectedIndex].value;
              this.callSBAPI(this.jiraComp.getJiraIssueTypes(this.jiraProjectName), 'category');
          }
          if (context == 'category') {
              document.getElementById("jiraIssueType")!.innerHTML = "";

              for (var i in data.issueTypes) {
                  var category = document.createElement('option');
                  category.value = data.issueTypes[i].name;
                  category.innerHTML = data.issueTypes[i].name;
                  if (Number(i) == 0) {
                      this.jiraIssueCategory = data.issueTypes[i].name;
                  }
                  document.getElementById("jiraIssueType")!.appendChild(category);
              }
              this.jiraIssueStatus = document.getElementById("jiraIssueStatus") as HTMLSelectElement;
              this.callSBAPI(this.jiraComp.getSpecificIssues('project%20%3D%20"' + this.jiraProjectName + '"%20AND%20type%20%3D%20"' + this.jiraIssueCategory + '"AND%20status%20%3D%20"' + this.jiraIssueStatus.options[this.jiraIssueStatus.selectedIndex].value + '"%20ORDER%20BY%20created%20DESC'), 'issues');
          } else if (context == 'issues') {
              document.getElementById("jiraIssueID")!.innerHTML = "";
              console.log("In Issues")
              console.log("Data: "+JSON.stringify(data))
              if(data.issues.length!=0){
              for (var i in data.issues) {
                  var category = document.createElement('option');
                  category.value = data.issues[i].key;
                  category.innerHTML = data.issues[i].key;
                  if (Number(i) == 0) {
                      category.selected = true;
                  }
                  document.getElementById("jiraIssueID")!.appendChild(category);
              }
              this.jiraIssue = document.getElementById("jiraIssueID") as HTMLSelectElement;
              console.log(this.jiraIssue)
               
              this.callSBAPI(this.jiraComp.getJiraIssueDetails(this.jiraIssue.options[this.jiraIssue.selectedIndex].value),`issueSummary`);
            }else{
              console.log("In Else");
              document.getElementById("jiraIssueID")!.innerHTML = "";
              document.getElementById("jiraIssueSummary")!.innerHTML = "";

          }
            
          } else if (context == 'issueSummary') {
              document.getElementById("jiraIssueSummary")!.innerHTML = data.fields.summary;
          }
          
      }
      else{
          console.log("In Else");
          document.getElementById("jiraIssueID")!.innerHTML = "";
          document.getElementById("jiraIssueSummary")!.innerHTML = "";

      }
  });
}

loadIssueTypes() {
  this.jiraProjectName = document.getElementById("jiraProject") as HTMLSelectElement
  this.jiraProjectName=this.jiraProjectName.options[this.jiraProjectName.selectedIndex].value;
  this.callSBAPI(this.jiraComp.getJiraIssueTypes(this.jiraProjectName), 'category');
}

loadIssues() {
  this.jiraProjectName = document.getElementById("jiraProject") as HTMLSelectElement
  this.jiraProjectName = this.jiraProjectName.options[this.jiraProjectName.selectedIndex].value;
  this.jiraIssueCategory = document.getElementById("jiraIssueType") as HTMLSelectElement 
  this.jiraIssueCategory = this.jiraIssueCategory.options[this.jiraIssueCategory.selectedIndex].value;
  this.jiraIssueStatus = document.getElementById("jiraIssueStatus") as HTMLSelectElement;
  this.callSBAPI(this.jiraComp.getSpecificIssues('project%20%3D%20"' + this.jiraProjectName + '"%20AND%20type%20%3D%20"' + this.jiraIssueCategory + '"AND%20status%20%3D%20"' + this.jiraIssueStatus.options[this.jiraIssueStatus.selectedIndex].value + '"%20ORDER%20BY%20created%20DESC'), 'issues');
}

loadSummary() {
  this.jiraIssueID = document.getElementById("jiraIssueID") as HTMLSelectElement
  this.callSBAPI(this.jiraComp.getJiraIssueDetails(this.jiraIssue.options[this.jiraIssue.selectedIndex].value), 'issueSummary');
}

async postTimeTrackingJira(jiraUSID:any, jiraTotalEffort:any) {
  var jsonText = "{\"issueID\":\"" + jiraUSID + "\",";
  jsonText += "\"estimation\":\"" + jiraTotalEffort + "h\"}";
  console.log(jsonText)
 await fetch(this.sbServer + '/estimation/jira/issue/timetracking', {
      method: 'PUT',
      headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json'
      },
      body: jsonText
    
  }).then(res => {
          //alert("Response Status = "+res.status+"\nEstimation Updated");
          console.log(JSON.stringify(res))
      }
      
  );
}

 addToJira() {

  let respStatus;
  let jiraUSID;
  let jiraID;
  try{
      jiraID=document.getElementById("jiraIssueID") as HTMLSelectElement
      jiraUSID = jiraID.options[jiraID.selectedIndex].value;
      console.log(jiraUSID)
  }catch{
      alert("Issue ID cannot be blank")
  }
  let jiraTotalEffort_input = document.getElementById("totalEffort") as HTMLInputElement
  let jiraTotalEffort = Number(jiraTotalEffort_input.value);
  jiraTotalEffort = Math.ceil(jiraTotalEffort);
  console.log("teff"+jiraTotalEffort )
  this.postTimeTrackingJira(jiraUSID, jiraTotalEffort)

  alert("User Story Updated with Total Effort");

  fetch(this.sbServer + '/estimation/jira/issue/' + jiraUSID)
      .then(response => {
          respStatus = response.status;
          return response.json();
      }).then(data => {

      for (var i in data.fields.subtasks) {
          switch (data.fields.subtasks[i].fields.summary) {
              case "Analyze RD":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.analyzeRD));
                  break;
              case "Technical Specification":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.ts));
                  break;
              case "SUC Review":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.suc));
                  break;
              case "Build (Coding/Config)":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.build));
                  break;
              case "Code Review":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.codeReview));
                  break;
              case "Unit Testing":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.unitTesting));
                  break;
              case "Test Case preparation":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.testCasePrep));
                  break;
              case "Functional Acceptance Testing":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.fat));
                  break;
              case "System integration Testing":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.sit));
                  break;
              case "UAT Testing":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.uat));
                  break;
              case "Regression Testing":
                  this.postTimeTrackingJira(data.fields.subtasks[i].key, Math.ceil(this.rt));
                  break;
          }
      }

  });

  alert("Sub Tasks updated with effort split");
}
 
  toggleBox1(){
    this.showTable = !this.showTable;
  }



  lineItemsContent: string = '<p>Your initial HTML content here</p>';

//   constructor(private dialog: MatDialog, private el: ElementRef) {}

//   ngAfterViewInit(): void {
//     // Initialize the lineItemsContent after the view has been initialized
//     const lineItemsTable = this.el.nativeElement.querySelector('#lineItems');
//     if (lineItemsTable) {
//       this.lineItemsContent = lineItemsTable.innerHTML;
//     }
//   }

//   // Function to open the dialog with the lineItems table content
//   openDialogWithTableContent(): void {
//     const dialogRef = this.dialog.open(DialogContentComponent, {
//       width: '80%', // Adjust the width as needed
//       data: { content: this.lineItemsContent }
//     });
//   }




//   ngAfterViewInit(): void {
//     // Use setTimeout to delay execution and ensure the table content is loaded
//     setTimeout(() => {
//       this.initializeLineItemsContent();
//     });
//   }
  
//   private initializeLineItemsContent(): void {
//     const lineItemsTable = this.el.nativeElement.querySelector('#lineItems');
//     if (lineItemsTable) {
//       this.lineItemsContent = lineItemsTable.innerHTML;
//     }
//   }
  
//   openDialogWithTableContent(): void {
//     this.initializeLineItemsContent(); // Ensure lineItemsContent is updated
//     const dialogRef = this.dialog.open(DialogContentComponent, {
//       width: '80%', // Adjust the width as needed
//       data: { head: this.getTableHeaders(), content: this.lineItemsContent }
//     });
//   }
  
//   private getTableHeaders(): string {
//     const lineItemsTable = this.el.nativeElement.querySelector('#lineItems');
//     if (lineItemsTable) {
//       const headersRow = lineItemsTable.querySelector('thead tr');
//       return headersRow ? headersRow.innerHTML : '';
//     }
//     return '';
//   }








openDialog(): void {
    
    
    this.dialogRef = this.dialog.open(DialogContentComponent, {
      width: '95%',
      height: '90%',
      data:  this.detailedInformation, 
    });
   
  }





closeDialog(){

   this.dialogRef.close();
}







exportToExcel(): void {
    // Check if this.originalData is populated with the data you want to export
    console.log(this.originalData);
 
    // Get the reference to the table element with the id 'lineItems'
    const table = document.getElementById('lineItems');
 
    // Function to transpose data
    function transposeArray(array: any) {
        return array[0].map((_: any, colIndex: any) => array.map((row: any) => row[colIndex]));
    }
 
    // Transpose the original data for each sheet
    const transposedData = this.originalData.map(sheetData => transposeArray(sheetData));
 
    // Creating a new workbook
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
 
    // Convert the table to a worksheet and append it to the workbook
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);
 
    // Apply styles to all cells in the worksheet
    const range = XLSX.utils.decode_range(ws['!ref']!);
    for (let R = range.s.r; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = { c: C, r: R };
            const cellRef = XLSX.utils.encode_cell(cellAddress);
            if (!ws[cellRef]) continue; // Skip if cell is empty
            const cellFont = { bold: true };
            const cellAlignment = { horizontal: 'center' };
            Object.assign(ws[cellRef], { font: cellFont, alignment: cellAlignment });
        }
    }
 
    // Append the worksheet to the workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Estimate');
 
    // Adding sheets to the workbook
    transposedData.forEach((sheetData, index) => {
        // Create a worksheet with transposed data
        const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(sheetData);
 
        // Apply styles to all cells in the worksheet
        const range = XLSX.utils.decode_range(ws['!ref']!);
        for (let R = range.s.r; R <= range.e.r; ++R) {
            for (let C = range.s.c; C <= range.e.c; ++C) {
                const cellAddress = { c: C, r: R };
                const cellRef = XLSX.utils.encode_cell(cellAddress);
                if (!ws[cellRef]) continue; // Skip if cell is empty
                const cellFont = { bold: true };
                const cellAlignment = { horizontal: 'center' };
                Object.assign(ws[cellRef], { font: cellFont, alignment: cellAlignment });
            }
        }
 
        // Adding the worksheet to the workbook
        // Ensure sheetData has valid content before accessing its elements
        if (sheetData.length > 0 && sheetData[0].length > 0) {
            XLSX.utils.book_append_sheet(wb, ws, `${sheetData[0][0]}`);
        }
    });
 
    // Writing the workbook to a file
    // Ensure this.quoteID contains a valid value
    XLSX.writeFile(wb, this.quoteID + '_Effort Breakup' + ".xlsx");
}












// exportToExcel(): void {
//     const table = document.getElementById('lineItems');
  
//     const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(table);


  
//     const wb: XLSX.WorkBook = XLSX.utils.book_new();
//     XLSX.utils.book_append_sheet(wb, ws,  'Estimate');
  
//     XLSX.writeFile(wb, 'Estimation_Table.xlsx');
//   }
  

//   functionsExecuted: boolean = false;

//   executeFunctionsAndToggleExportButton(): void {
    
//     this.functionsExecuted = true;
//   }











}
