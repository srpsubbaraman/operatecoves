// import { PdfService } from '../pdf.service';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import { ADOServiceComponent } from '../RestTemplate/adoservice/adoservice.component';
import { JiraServiceComponent } from '../RestTemplate/jira-service/jira-service.component';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-groomingportal',
  templateUrl: './groomingportal.component.html',
  styleUrl: './groomingportal.component.css'
})
export class GroomingportalComponent {
 


  selectedOption : string = 'Jira';
  showIncidentFields: boolean = true;
  showCRFields: boolean = false;
  jiraIssueStatus: string ='';
  WorkItem_assignee: string = "unAssigned";
    taskWorkItem_assignee: string = "unAssigned";
    

  constructor(private http:HttpClient, private router: Router){}
  loading: boolean = true; 
 async ngOnInit(){
    console.log("Login: "+localStorage.getItem('login_info'));
    //console.log("In TTL? : "+ String((Date.now() - JSON.parse(localStorage.getItem('login_info')!).ttl) <=300000 ))
    if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
        console.log("in there!")
     
    }
    else{
       localStorage.setItem('login_info',"{}");
       await this.router.navigate(['/Login']);
       
    }
    this.loadJiraProjectInfo()
    setTimeout(() => {
      
        this.loading = false; // Set loading to false to hide the loader
      }, 2000);
  }

  loadserver() {
   
    this.showIncidentFields = this.selectedOption === 'Jira';
    this.showCRFields = this.selectedOption === 'ADO';
    this.showIncidentFields ? this.callSBAPI(this.jiraComp.getJiraProjectDetails(), 'projectName'):this.callSBAPI1(this.adoComp.getADOProjectDetails(), 'projectName')
  }

  adoComp:ADOServiceComponent = new ADOServiceComponent(this.http);
  jiraComp:JiraServiceComponent = new JiraServiceComponent(this.http);  
  sbServer = 'http://localhost:8080';
  jiraServer = 'https://jira4operate.atlassian.net/';
  adoServer = 'https://dev.azure.com/OperateSync'
  count:any = 0;
  status:any = 'NEW';
  adoProjectName:any='PROJECTS'
  adoWorkItemCategory:any='CATEGORY';
  adoWorkitemID:any;
  jiraProjectName:any = 'PROJECTS';
  jiraIssueCategory:any="CATEGORY";
  jiraIssueID:any;
  jiraIssueRef:any;
  jiraSubTaskId:any;
  adoSubtaskId: any;




async loadJiraProjectInfo() {
  //console.log("OKAYYY")
    this.callSBAPI(this.jiraComp.getJiraProjectDetails(), 'projectName');
    this.loadStatusInfo();

}

loadStatusInfo() {
    //console.log("Selected Index: "+(document.getElementById("lb_issueStatus")! as HTMLSelectElement).selectedIndex)
    //document.getElementById("lb_status")!.innerHTML = (document.getElementById("lb_issueStatus")! as HTMLSelectElement).options[(document.getElementById("lb_issueStatus")!as HTMLSelectElement).selectedIndex].value;
    this.status=(document.getElementById("lb_issueStatus")! as HTMLSelectElement).value;
    //console.log("\n\n\n\nStatus:"+this.status );
    //document.getElementById("lb_issueStatus")!.innerHTML = this.status;
    this.loadIssues();
}



pjtName() {
    document.getElementById("lb_pname")!.innerHTML = this.jiraProjectName;
}

categoryName() {
    this.jiraIssueCategory
    document.getElementById("lb_catname")!.innerHTML = this.jiraIssueCategory;
    return this.jiraIssueCategory;
}

 loadIssueTypes() {
    this.jiraProjectName = (document.getElementById("jiraProjectName")as HTMLSelectElement).options[(document.getElementById("jiraProjectName")as HTMLSelectElement).selectedIndex].value;
    document.getElementById("lb_pname")!.innerHTML = this.jiraProjectName;
    this.callSBAPI(this.jiraComp.getJiraIssueTypes(this.jiraProjectName), 'category');
}

 loadIssues() {
    
    this.jiraProjectName = (document.getElementById("jiraProjectName")as HTMLSelectElement).options[(document.getElementById("jiraProjectName")as HTMLSelectElement).selectedIndex].value;
    //console.log("PJT NAME: "+this.jiraProjectName+"\nCategory: "+this.jiraIssueCategory+"IssueID: "+this.jiraIssueID)
    this.jiraIssueCategory = (document.getElementById("jiraIssueCategory")as HTMLSelectElement).options[(document.getElementById("jiraIssueCategory")as HTMLSelectElement).selectedIndex].value;
    this.jiraIssueStatus =  (document.getElementById("lb_issueStatus")as HTMLSelectElement).options[(document.getElementById("lb_issueStatus")as HTMLSelectElement).selectedIndex].value;
    //console.log("PJT NAME: "+this.jiraProjectName+"\nCategory: "+this.jiraIssueCategory+"IssueID: "+this.jiraIssueStatus)
    document.getElementById("lb_catname")!.innerHTML = this.jiraIssueCategory;
    document.getElementById("jiraSubTasks")!.innerHTML = "";
    document.getElementById("subTaskID")!.innerHTML ="";
    document.getElementById("subTaskEffort")!.innerHTML ="";
    document.getElementById("subTaskStatus")!.innerHTML="";
    document.getElementById("subtaskassigneeName")!.innerHTML ="unAssigned";
    this.callSBAPI(this.jiraComp.getSpecificIssues('project%20%3D%20"' + this.jiraProjectName + '"%20AND%20type%20%3D%20"' + this.jiraIssueCategory + '"AND%20status%20%3D%20"' + this.jiraIssueStatus + '"%20ORDER%20BY%20created%20DESC'), 'issues');

}


 loadIssueInfo() {
    this.jiraProjectName = (document.getElementById("jiraProjectName")as HTMLSelectElement).options[(document.getElementById("jiraProjectName") as HTMLSelectElement).selectedIndex].value;
    this.jiraIssueCategory = (document.getElementById("jiraIssueCategory")as HTMLSelectElement).options[(document.getElementById("jiraIssueCategory")as HTMLSelectElement).selectedIndex].value;
    this.jiraIssueID = (document.getElementById("jiraIssueID")as HTMLSelectElement).options[(document.getElementById("jiraIssueID")as HTMLSelectElement).selectedIndex].value;
    this.callSBAPI(this.jiraComp.getJiraIssueDetails(this.jiraIssueID), 'issueInfo');
}

 loadSubTaskInfo() {
    this.jiraProjectName = (document.getElementById("jiraProjectName")as HTMLSelectElement).options[(document.getElementById("jiraProjectName")as HTMLSelectElement).selectedIndex].value;
    this.jiraIssueCategory = (document.getElementById("jiraIssueCategory")as HTMLSelectElement).options[(document.getElementById("jiraIssueCategory")as HTMLSelectElement).selectedIndex].value;
    this.jiraIssueID = (document.getElementById("jiraIssueID")as HTMLSelectElement).options[(document.getElementById("jiraIssueID")as HTMLSelectElement).selectedIndex].value;
    this.jiraSubTaskId = (document.getElementById("jiraSubTasks")as HTMLSelectElement).options[(document.getElementById("jiraSubTasks")as HTMLSelectElement).selectedIndex].value;
    this.callSBAPI(this.jiraComp.getSpecificIssues( this.jiraSubTaskId), 'subTaskInfo');
}

 loadAssignee() {
    fetch(this.sbServer + '/estimation/jira/users')
        .then(response => {
            //var respStatus = Number(response.status);
            return response.json();
        }).then(data => {
        document.getElementById("assigneeName")!.innerHTML = "";
        for (var i in data) {
            if (data[i].accountType == 'atlassian') {
                var assigneeInfo = document.createElement('option');
                assigneeInfo.value = data[i].accountId;
                assigneeInfo.title = data[i].displayName;
                assigneeInfo.innerHTML = data[i].displayName;
                document.getElementById("assigneeName")!.appendChild(assigneeInfo);
            }
        }
    });
}

 subtaskLoadAssignee() {
    fetch(this.sbServer + '/estimation/jira/users')
        .then(response => {
            //respStatus = response.status;
            return response.json();
        }).then(data => {
        document.getElementById("subtaskassigneeName")!.innerHTML = "";
        for (var i in data) {
            if (data[i].accountType == 'atlassian') {
                var assigneeInfo = document.createElement('option');
                assigneeInfo.value = data[i].accountId;
                assigneeInfo.title = data[i].displayName;
                assigneeInfo!.innerHTML = data[i].displayName;
                document.getElementById("subtaskassigneeName")!.appendChild(assigneeInfo);
            }
        }
    });
}

 changeAssignee() {
    var accountId = (document.getElementById("assigneeName")as HTMLSelectElement).options[(document.getElementById("assigneeName")as HTMLSelectElement).selectedIndex].value;
    fetch(this.sbServer + '/estimation/jira/' + this.jiraIssueID + '/user/' + accountId, {
        method: 'PUT', headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        this.loadIssueInfo();
        alert("User Assigned");
        location.reload();

    })
}

 subtaskChangeAssignee() {
    var accountId = (document.getElementById("subtaskassigneeName")as HTMLSelectElement).options[(document.getElementById("subtaskassigneeName")as HTMLSelectElement).selectedIndex].value;
    fetch(this.sbServer + '/estimation/jira/' + this.jiraSubTaskId + '/user/' + accountId, {
        method: 'PUT', headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        }
    }).then(response => {
        this.loadIssueInfo();
        alert("User Assigned");
        location.reload();
    })
}

 createSubTask(taskType:any) {
    let descr = prompt("Provide Task Description");
    var jsonText = "{\"projectID\":\"" + this.jiraProjectName + "\",";
    jsonText += "\"parentID\":\"" + this.jiraIssueID + "\",";
    jsonText += "\"issueType\":\"" + taskType + "\",";
    jsonText += "\"severity\":\"High\",";
    jsonText += "\"description\":\"" + descr + "\"}";
    fetch(this.sbServer + '/estimation/jira/issue/subtask', {
        method: 'POST',
        headers: {
            'Accept': '*/*',
            'Content-Type': 'application/json'
        },
        body: jsonText
    }).then(res => {
            this.loadIssueInfo();
            alert("subtask Created");
        }
    );
    ;
}

 deleteSubTask() {
    fetch(this.sbServer + '/estimation/jira/issue/subtask/' + (document.getElementById("jiraSubTasks")as HTMLSelectElement).options[(document.getElementById("jiraSubTasks")as HTMLSelectElement).selectedIndex].value, {
        method: 'DELETE'
    }).then(res => {
            this.loadIssueInfo();
            alert("subtask deleted");
        }
    );
        console.log("hello")

}

 callSBAPI(url:Observable<any>, context:any) {
    var respStatus:any;
    //console.log(url)
    url.subscribe(response => {
            //console.log("Response incoming!")
            respStatus = (response.status);
            var data = response; 
            //console.log("Resp Status: "+JSON.stringify(data)+"\n\n\n\n"+respStatus);
        if (data.total !=0) {
            //console.log("Context: "+context);
            if (context == 'projectName') {
                //console.log("In if")
                document.getElementById("jiraProjectName")!.innerHTML = "";
                //console.log(JSON.stringify(data))
                //console.log("Hello")
                for (var i in data.values) {
                    var pjtInfo = document.createElement('option');
                    pjtInfo.value = data.values[i].key;
                    pjtInfo.title = data.values[i].name;
                    pjtInfo!.innerHTML = data.values[i].name;
                    //console.log("Name: "+pjtInfo.title+"\n\nProject: "+pjtInfo.value)
                    if (Number(i) == 0) {
                        this.jiraProjectName = data.values[i].key;
                        document.getElementById("lb_pname")!.innerHTML = this.jiraProjectName;
                    }
                    //console.log("PJT-"+pjtInfo.value)
                    document.getElementById("jiraProjectName")!.appendChild(pjtInfo);
                    //console.log("PJTINFO")
                }
                //console.log("HERE")
                this.jiraProjectName = (document.getElementById("jiraProjectName")as HTMLSelectElement).options[(document.getElementById("jiraProjectName")as HTMLSelectElement).selectedIndex].value;
                //document.getElementById("jiraProjectName")!.innerHTML = "<option>"+this.jiraProjectName+"</option>";
                this.loadAssignee();
                this.subtaskLoadAssignee();
                this.callSBAPI(this.jiraComp.getJiraIssueTypes(this.jiraProjectName), 'category');
            } else if (context == 'category') {
                document.getElementById("jiraIssueCategory")!.innerHTML = "";
                this.status=(document.getElementById("lb_issueStatus")! as HTMLSelectElement).value;
                for (var i in data.issueTypes) {
                    var category = document.createElement('option');
                    category.title = data.issueTypes[i].name;
                    category.value = data.issueTypes[i].name;
                    category.innerHTML = data.issueTypes[i].name;
                    if (Number(i) == 0) {
                        this.jiraIssueCategory = data.issueTypes[i].name;
                    }
                    ////console.log("Category: "+category.value)
                    document.getElementById("jiraIssueCategory")!.appendChild(category);
                }
                //document.getElementById("jiraIssueCategory")!.innerHTML = "<option>"+this.jiraIssueCategory+"</option>";

                this.callSBAPI(this.jiraComp.getSpecificIssues('project%20%3D%20"' + this.jiraProjectName + '"%20AND%20type%20%3D%20"' + this.jiraIssueCategory + '"%20AND%20status%20%3D%20"' + (document.getElementById("lb_issueStatus")!as HTMLSelectElement).value + '"%20ORDER%20BY%20created%20DESC'), 'issues');
            } else if (context == 'issues') {
                document.getElementById("jiraIssueID")!.innerHTML = "";
                //document.getElementById("jiraIssueCategory")!.innerHTML = this.jiraIssueCategory;
                this.count = data.issues.length;
                //document.getElementById("lb_count")!.innerHTML = data.issues.length;
                //console.log("DATA ISSUES: "+JSON.stringify(data))
                for (var i in data.issues) {
                    //console.log(data.issues)
                    var category = document.createElement('option');
                    category.value = data.issues[i].key;
                    category!.innerHTML = data.issues[i].key;
                    //console.log("ISSUE: "+data.issues[i].key)
                    //console.log("\n\nIssue CATEGORY: "+this.jiraIssueCategory);
                    if (Number(i)== 0) {
                        this.jiraIssueID = data.issues[i].key;
                        //if (this.jiraIssueCategory == 'Change Request' || this.jiraIssueCategory == 'Incident') {
                            this.jiraIssueRef = data.issues[i].fields.customfield_10063;
                            this.jiraIssueRef!=null ? document.getElementById("snowRef")!.innerHTML = data.issues[i].fields.customfield_10063 : document.getElementById("snowRef")!.innerHTML="Not Available";
                        //}
                        // else{
                        //     document.getElementById("snowRef")!.innerHTML = "";
                        // }
                        var jiraLink = "";

                        document.getElementById("jira_issue_details_summary")!.innerHTML = '<a href="' + this.jiraServer + '/jira/software/c/projects/' + this.jiraProjectName + '/issues/' + data.issues[i].key + '" target=\"_blank\">' + data.issues[i].fields.summary + '</a>';
                        
                        document.getElementById("issueStatus")!.innerHTML = data.issues[i].fields.status.name;
                        if (data.issues[i].fields.assignee != null) {
                            document.getElementById("assignee")!.innerHTML = data.issues[i].fields.assignee.displayName;
                        } else {
                            document.getElementById("assignee")!.innerHTML = 'unAssigned';
                        }
                        if (data.issues[i].fields.timeoriginalestimate != null) {
                            let timeSec = data.issues[i].fields.timeoriginalestimate;
                            let timeMin = (timeSec / 60) % 60;
                            timeMin = Math.floor(timeMin);
                            let timeHr = (timeSec / 3600) % 8;
                            timeHr = Math.floor(timeHr);
                            let timeDay = (timeSec / (3600 * 8)) % 5;
                            timeDay = Math.floor(timeDay);
                            let timeWeek = timeSec / (3600 * 8 * 5);
                            timeWeek = Math.floor(timeWeek);
                            let estimateValue = '';
                            if (timeWeek > 0) {
                                estimateValue += timeWeek + 'w '
                            }
                            if (timeDay > 0) {
                                estimateValue += timeDay + 'd '
                            }
                            if (timeHr > 0) {
                                estimateValue += timeHr + 'h '
                            }
                            if (timeMin > 0) {
                                estimateValue += timeMin + 'm '
                            }

                            document.getElementById("totalEffort")!.innerHTML = estimateValue;
                        } else {
                            document.getElementById("totalEffort")!.innerHTML = '0m';
                        }
                        document.getElementById("jiraSubTasks")!.innerHTML = "";
                        document.getElementById("subTaskID")!.innerHTML="";
                        document.getElementById("subtaskassignee")!.innerHTML="";
                        
                        //console.log("I am HERE");
                        for (var j in data.issues[i].fields.subtasks) {
                            var subTask = document.createElement('option');
                            subTask.value = data.issues[i].fields.subtasks[j].key;
                            subTask!.innerHTML = data.issues[i].fields.subtasks[j].fields.summary;
                            document.getElementById("jiraSubTasks")!.appendChild(subTask);
                            if (Number(j) == 0) {
                                //console.log("LOL")
                                document.getElementById("subTaskID")!.innerHTML = '<a href="' + this.jiraServer + '/jira/software/c/projects/' + this.jiraProjectName + '/issues/' + data.issues[i].fields.subtasks[j].key + '">' + data.issues[i].fields.subtasks[j].key + '</a>';
                                document.getElementById("subTaskStatus")!.innerHTML = data.issues[i].fields.subtasks[j].fields.status.name;
                                this.callSBAPI(this.jiraComp.getJiraIssueDetails(data.issues[i].fields.subtasks[j].key), 'subTaskInfo');
                                //document.getElementById("subtaskassignee")!.innerHTML = data.issues[i].fields.subtasks[j].fields.assignee.name;
                            }
                        }

                    }
                    document.getElementById("lb_catname")!.innerHTML = this.jiraIssueCategory;
                    document.getElementById("jiraIssueID")!.appendChild(category);

                    //customfield_10063 chg#
                    //assignee
                    //description
                    //summary
                }
            } else if (context == 'issueInfo') {
              //console.log("IssueInfo:"+JSON.stringify(data))
              document.getElementById("snowRef")!.innerHTML = "";
              this.jiraIssueRef = data.fields.customfield_10063;
              ("Issue INFO: "+this.jiraIssueRef)
                //if (this.jiraIssueCategory == 'Change Request') {

                    this.jiraIssueRef!=null ?document.getElementById("snowRef")!.innerHTML = this.jiraIssueRef : document.getElementById("snowRef")!.innerHTML = "Not Available";
                //}
                document.getElementById("jira_issue_details_summary")!.innerHTML = '<a href="' + this.jiraServer + '/jira/software/c/projects/' + this.jiraProjectName + '/issues/' + data.key + '">' + data.fields.summary + '</a>';
                document.getElementById("issueStatus")!.innerHTML = data.fields.status.name;
                this.subtaskLoadAssignee();
                if (data.fields.assignee != null) {
                    document.getElementById("assignee")!.innerHTML = data.fields.assignee.displayName;
                } else {
                    document.getElementById("assignee")!.innerHTML = 'unAssigned';
                }
                if (data.fields.timeoriginalestimate != null) {
                    let timeSec = data.fields.timeoriginalestimate;
                    let timeMin = (timeSec / 60) % 60;
                    timeMin = Math.floor(timeMin);
                    let timeHr = (timeSec / 3600) % 8;
                    timeHr = Math.floor(timeHr);
                    let timeDay = (timeSec / (3600 * 8)) % 5;
                    timeDay = Math.floor(timeDay);
                    let timeWeek = timeSec / (3600 * 8 * 5);
                    timeWeek = Math.floor(timeWeek);
                    let estimateValue = '';
                    if (timeWeek > 0) {
                        estimateValue += timeWeek + 'w '
                    }
                    if (timeDay > 0) {
                        estimateValue += timeDay + 'd '
                    }
                    if (timeHr > 0) {
                        estimateValue += timeHr + 'h '
                    }
                    if (timeMin > 0) {
                        estimateValue += timeMin + 'm '
                    }

                    document.getElementById("totalEffort")!.innerHTML = estimateValue;
                } else {
                    document.getElementById("totalEffort")!.innerHTML = '0m';
                }
                document.getElementById("jiraSubTasks")!.innerHTML = "";
                document.getElementById("subTaskID")!.innerHTML="";
                document.getElementById("subtaskassignee")!.innerHTML="unAssigned";
                document.getElementById("jiraSubTasks")!.innerHTML = "";
    //document.getElementById("subTaskID")!.innerHTML ="";
                document.getElementById("subTaskEffort")!.innerHTML ="";
                document.getElementById("subTaskStatus")!.innerHTML="";
                document.getElementById("subtaskassigneeName")!.innerHTML ="unAssigned";
                
                for (var i in data.fields.subtasks) {
                    var subTask = document.createElement('option');
                    subTask.value = data.fields.subtasks[i].key;
                    subTask!.innerHTML = data.fields.subtasks[i].fields.summary;
                    document.getElementById("jiraSubTasks")!.appendChild(subTask);
                    if (Number(i) == 0) {
                        document.getElementById("subTaskID")!.innerHTML = '<a href="' + this.jiraServer + '/jira/software/c/projects/' + this.jiraProjectName + '/issues/' + subTask.value + '">' + subTask.value + '</a>';
                        document.getElementById("subTaskStatus")!.innerHTML = data.fields.subtasks[i].fields.status.name;
                        this.callSBAPI(this.jiraComp.getJiraIssueDetails(subTask.value), 'subTaskInfo');
                        //document.getElementById("subtaskassignee")!.innerHTML = data.fields.subtasks[i].fields.assignee.name;
                    }
                }

            } else if (context == 'subTaskInfo') {
                this.subtaskLoadAssignee()         
                document.getElementById("subTaskID")!.innerHTML="";
                document.getElementById("subTaskID")!.innerHTML = '<a href="' + this.jiraServer + '/jira/software/c/projects/' + this.jiraProjectName + '/issues/' + data.key + '">' + data.key + '</a>';
                this.jiraSubTaskId = data.key;
                document.getElementById("subTaskStatus")!.innerHTML = data.fields.status.name;
                if (data.fields.assignee != null) {
                    document.getElementById("subtaskassignee")!.innerHTML = data.fields.assignee.displayName;
                } else {
                    document.getElementById("subtaskassignee")!.innerHTML = "unAssigned";
                }
                if (data.fields.timetracking.originalEstimate != null) {
                    document.getElementById("subTaskEffort")!.innerHTML = data.fields.timetracking.originalEstimate;
                } else {
                    document.getElementById("subTaskEffort")!.innerHTML = "0m";
                }
            }
        }

    });

}








// /////ado from myapp.js//////

           // ADO
       
         
         
         async callSBAPI1(url:Observable<any>, context:any,headers={}) {
                     var respStatus:any;
                     //console.log("Headers: "+JSON.stringify((headers)))
                     url.subscribe( async response => {
                             //respStatus = response.status;
                             var data =response;
                             
                         
                             //console.log("Data: "+JSON.stringify(data))
                         if (data.total !=0) {
                             if (context == 'projectName') {
                                 
                                 document.getElementById("adoProjectName")!.innerHTML = "";
                                 for (var i in data.value) {
                                     var pjtInfo = document.createElement('option');
                                     pjtInfo.value = data.value[i].id;
                                     pjtInfo.title = data.value[i].name;
                                     pjtInfo.innerHTML = data.value[i].name;
                                     if (Number(i) == 0) {
                                         this.adoProjectName = data.value[i].name;
                                     }
                                     document.getElementById("adoProjectName")!.appendChild(pjtInfo);
                                 }
                                 //this.adoProjectName = (document.getElementById("adoProjectName") as HTMLSelectElement).options[(document.getElementById("adoProjectName") as HTMLSelectElement).selectedIndex].value;
                                 document.getElementById("lb_pnameado")!.innerHTML = this.adoProjectName;
                                 await this.loadAssignee1();
                                 this.taskLoadAssignee1();
                                 this.callSBAPI1(this.adoComp.getADOIssueTypes(this.adoProjectName), 'category');
                             } else if (context == 'category') {
                                 document.getElementById("adoWorkItemCategory")!.innerHTML = "";
                                 
                                 for (var i in data.value) {
                                     var category = document.createElement('option');
                                     category.value = data.value[i].name;
                                     category.innerHTML = data.value[i].name;
                                     if (Number(i) == 0) {
                                         this.adoWorkItemCategory = data.value[i].name;
                                     }
                                     document.getElementById("adoWorkItemCategory")!.appendChild(category);
                                 }
                                 
                                 document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                                 
                                 
                                 this.callSBAPI1(this.adoComp.getADOIssueTypeStatus(this.adoProjectName,this.adoWorkItemCategory), 'states',headers);
                             }
                             else if(context == 'states'){
                                 
                                 
                                 //console.log("issue:"+data.value.length);
                                 if(data.value.length!=0){
                                 document.getElementById("lb_issueStatus1")!.innerHTML = "";
                                 //console.log("In ADO States")
                                 //console.log("Data: "+JSON.stringify(data))
                                
                                 for (var i in data.value) {
                   
                                     var category = document.createElement('option');
                                     category.value = data.value[i].name;
                                     category.innerHTML = data.value[i].name;
                                     if (Number(i) == 0) {
                                         category.selected = true;
                                     }
                                     document.getElementById("lb_issueStatus1")!.appendChild(category);
                                 }
                                 var body={
                                     "WorkItemType":this.adoWorkItemCategory,
                                     "State":(document.getElementById("lb_issueStatus1")! as HTMLSelectElement).options[(document.getElementById("lb_issueStatus1")! as HTMLSelectElement).selectedIndex].innerHTML,
                                     "TeamProject":this.adoProjectName
                                 }
                                 console.log("Body: "+JSON.stringify(body));
                                 headers={
                                     headers: {
                                         "Content-Type": "application/json",
                                         "Accept":"application/json"
                                     },
                                     "method":"POST",
                                     "body":JSON.stringify(body)
                                 }
                                 //document.getElementById("lb_issueStatus1")!.innerHTML = ;
                                 
                                 this.adoWorkitemID = document.getElementById("adoWorkItemID") as HTMLSelectElement;
                                 //console.log(this.adoWorkitemID)
                                  
                                 this.callSBAPI1(this.adoComp.getADOWorkItems(body,this.adoProjectName), 'issues',headers);
                                 
                               }
                             }else if (context == 'issues') {
                                 var cout=0;
                                 var workIteminfo;
                                 //console.log("ISSUES")
                                 document.getElementById("adoWorkitemID")!.innerHTML = "";
                                 document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                                 for(var k in data.workItems){
                                     cout++;
                                 }
                                 document.getElementById("lb_countado")!.innerHTML = cout.toString();
                                 for (var i in data.workItems) {
         
                                     //workIteminfo = await fetch(this.sbServer+'/estimation/ado/'+this.adoProjectName+"/"+data.workItems[i].id).then(jsoni=>{return jsoni.json()})
                                     
                                     var category = document.createElement('option');
                                     category.value = data.workItems[i].id;
                                     category.innerHTML = data.workItems[i].id;
                                     ////console.log("CATEGORY: "+category.value);
                                     document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                                     document.getElementById("adoWorkitemID")!.appendChild(category);
                 
                                     //customfield_10063 chg#
                                     //assignee
                                     //description
                                     //summary
                                 }
         
                                     if(data.workItems.length!=0){
                                     this.adoWorkitemID = (document.getElementById("adoWorkitemID") as HTMLSelectElement).options[(document.getElementById("adoWorkitemID") as HTMLSelectElement).selectedIndex].value;
                                     workIteminfo = await fetch(this.sbServer+'/estimation/ado/'+this.adoProjectName+"/"+this.adoWorkitemID).then(jsoni=>{return jsoni.json()})
         
                                     
                                         document.getElementById("snowRef1")!.innerHTML = (workIteminfo.fields["Custom.ServiceNowCRnumber"]? workIteminfo.fields["Custom.ServiceNowCRnumber"]:"");
                                     
                                     var adoLink = "";
             
                                     document.getElementById("ado_issue_details_summary")!.innerHTML = '<a target="_blank" href="' + this.adoServer + '/' + this.adoProjectName + '/_workItems/edit/' + workIteminfo.id + '">' + workIteminfo.fields["System.Title"]+ '</a>';
                                     document.getElementById("issueStatus1")!.innerHTML = workIteminfo.fields["System.State"];
                                     //console.log("S: "+workIteminfo.fields["System.AssignedTo"])
                                     if (workIteminfo.fields["System.AssignedTo"] != undefined) {
                                        
                                         document.getElementById("assigneeNameado")!.innerHTML = workIteminfo.fields["System.AssignedTo"].displayName;
                                     } else {
                                         this.WorkItem_assignee= 'unAssigned';
                                     }
         
                                     this.callSBAPI1(this.adoComp.getADOWorkItem(this.adoProjectName,this.adoWorkitemID), 'issueInfo');

         
                                 }
                                     
                                     // document.getElementById("adoSubTasks")!.innerHTML = "";
                                     // for (var j in data.issues[i].fields.subtasks) {
                                     //     var subTask = document.createElement('option');
                                     //     subTask.value = data.issues[i].fields.subtasks[j].key;
                                     //     subTask.innerHTML = data.issues[i].fields.subtasks[j].fields.summary;
                                     //     document.getElementById("adoSubTasks")!.appendChild(subTask);
                                     //     if (Number(j) == 0) {
                                     //         document.getElementById("subTaskID1")!.innerHTML = '<a href="' + this.adoServer + '/' + this.adoProjectName + '/_workItems/edit' + data.issues[i].fields.subtasks[j].key + '">' + data.issues[i].fields.subtasks[j].key + '</a>';
                                     //         document.getElementById("subTaskStatus1")!.innerHTML = data.issues[i].fields.subtasks[j].fields.status.name;
                                     //         this.callSBAPI1(this.sbServer + '/estimation/ado/issue/' + data.issues[i].fields.subtasks[j].key, 'subTaskInfo');
                                     //         //document.getElementById("subtaskassignee").innerHTML = data.issues[i].fields.subtasks[j].fields.assignee.name;
                                     //     }
                                     // }
             
                                 
         
                             } else if (context == 'issueInfo') {
                                 this.adoWorkitemID = (document.getElementById("adoWorkitemID") as HTMLSelectElement).options[(document.getElementById("adoWorkitemID") as HTMLSelectElement).selectedIndex].value;
                                     workIteminfo = await fetch(this.sbServer+'/estimation/ado/'+this.adoProjectName+"/"+this.adoWorkitemID).then(jsoni=>{return jsoni.json()})
         
                                     
                                         document.getElementById("snowRef1")!.innerHTML=(workIteminfo.fields["Custom.ServiceNowCRnumber"]? workIteminfo.fields["Custom.ServiceNowCRnumber"]:"");
                                     
                                     var adoLink = "";
                                     //console.log("issueinfo")
             
                                     document.getElementById("ado_issue_details_summary")!.innerHTML = '<a target="_blank" href="' + this.adoServer + '/' + this.adoProjectName + '/_workItems/edit/' + workIteminfo.id + '">' + workIteminfo.fields["System.Title"]+ '</a>';
                                     document.getElementById("issueStatus1")!.innerHTML = workIteminfo.fields["System.State"];
                                     if (workIteminfo.fields["System.AssignedTo"] != undefined) {
                                        //console.log(workIteminfo.fields["System.AssignedTo"].displayName+" is the best");
                                         this.WorkItem_assignee = workIteminfo.fields["System.AssignedTo"].displayName;
                                     } else {
                                         this.WorkItem_assignee = 'unAssigned';
                                     }
                                 
                                 document.getElementById("adoSubTasks")!.innerHTML = "";
                                 var count=0;
                                 var origTime = 0;
                                 for (var rel in data.relations) {
                                    //console.log("Subtask Name: "+data.relations[rel].attributes.name);
                                     if(data.relations[rel].attributes.name == "Child"){
                                     var subTask = document.createElement('option');
                                     //console.log((data.relations[rel].url).split("/")[(data.relations[rel].url).split("/").length - 1]);console.log("REL: "+rel)

                                     subTask.value = (data.relations[rel].url).split("/")[(data.relations[rel].url).split("/").length - 1];
                                     var thisSubtask = await fetch(this.sbServer + '/estimation/ado/'+this.adoProjectName+"/"+ subTask.value).then(data =>{ return data.json()});
                                     //console.log("STask: "+JSON.stringify(thisSubtask));
                                     subTask.innerHTML = thisSubtask.fields["System.Title"]; 
                                     //console.log(thisSubtask.fields["Microsoft.VSTS.Scheduling.CompletedWork"]);
                                     if(thisSubtask.fields["Microsoft.VSTS.Scheduling.CompletedWork"]) origTime+=thisSubtask.fields["Microsoft.VSTS.Scheduling.CompletedWork"] ;
                                     document.getElementById("adoSubTasks")!.appendChild(subTask);
                                     if (count == 0) {
                                        
                                         document.getElementById("subTaskID1")!.innerHTML = (subTask.value)? '<a target ="_blank" href="' + this.adoServer + '/' + this.adoProjectName + '/_workitems/edit/' + subTask.value + '">' +subTask.value+ '</a>':"";
                                         document.getElementById("subTaskStatus1")!.innerHTML = thisSubtask.fields["System.State"];
                                         this.callSBAPI1(this.adoComp.getADOWorkItem(this.adoProjectName, subTask.value), 'subTaskInfo');
                                         //document.getElementById("subtaskassignee").innerHTML = data.fields.subtasks[i].fields.assignee.name;
                                     }
                                     count++;
                                     //console.log("origTime: "+origTime)
                                    }
                                 }
                                 if (origTime != 0 || origTime!=undefined) {
                                    //console.log("origTime11: "+origTime)
                                    
                                     let timeSec = origTime*3600;
                                     let timeMin = (timeSec / 60) % 60;
                                     timeMin = Math.floor(timeMin);
                                     let timeHr = (timeSec / 3600) % 8;
                                     timeHr = Math.floor(timeHr);
                                     let timeDay = (timeSec / (3600 * 8)) % 5;
                                     timeDay = Math.floor(timeDay);
                                     let timeWeek = timeSec / (3600 * 8 * 5);
                                     timeWeek = Math.floor(timeWeek);
                                     let estimateValue = '';
                                     if (timeWeek > 0) {
                                         estimateValue += timeWeek + 'w '
                                     }
                                     if (timeDay > 0) {
                                         estimateValue += timeDay + 'd '
                                     }
                                     if (timeHr > 0) {
                                         estimateValue += timeHr + 'h '
                                     }
                                     if (timeMin > 0) {
                                         estimateValue += timeMin + 'm '
                                     }
                 
                                     document.getElementById("totalEffort1")!.innerHTML = estimateValue;
                                 } else {
                                     document.getElementById("totalEffort1")!.innerHTML = '0m';
                                 }
                             } else if (context == 'subTaskInfo') {
                                
                                 document.getElementById("subTaskID1")!.innerHTML = data.id ? '<a target ="_blank" href="' + this.adoServer + '/' + this.adoProjectName + '/_workitems/edit/' + data.id + '">' + data.id + '</a>':"";
                                 this.adoSubtaskId = data.id;
                                 document.getElementById("subTaskStatus1")!.innerHTML = data.fields["System.State"] ? data.fields["System.State"]: "";
                                 if (data.fields["System.AssignedTo"] != undefined) {
                                     this.taskWorkItem_assignee = data.fields["System.AssignedTo"].displayName;
                                 } else {
                                     this.taskWorkItem_assignee = "unAssigned";
                                 }
                                 try{
                                    //console.log("Data Fields: "+data.fields["Microsoft.VSTS.Scheduling.CompletedWork"])
                                    if (data.fields["Microsoft.VSTS.Scheduling.CompletedWork"] != undefined) {

                                         let timeSec = data.fields["Microsoft.VSTS.Scheduling.CompletedWork"]*3600
                                         let timeMin = (timeSec / 60) % 60;
                                         timeMin = Math.floor(timeMin);
                                         let timeHr = (timeSec / 3600) % 8;
                                         timeHr = Math.floor(timeHr);
                                         let timeDay = (timeSec / (3600 * 8)) % 5;
                                         timeDay = Math.floor(timeDay);
                                         let timeWeek = timeSec / (3600 * 8 * 5);
                                         timeWeek = Math.floor(timeWeek);
                                         let estimateValue = '';
                                         if (timeWeek > 0) {
                                             estimateValue += timeWeek + 'w '
                                         }
                                         if (timeDay > 0) {
                                             estimateValue += timeDay + 'd '
                                         }
                                         if (timeHr > 0) {
                                             estimateValue += timeHr + 'h '
                                         }
                                         if (timeMin > 0) {
                                             estimateValue += timeMin + 'm '
                                         }
                                     document.getElementById("subTaskEffort1")!.innerHTML = estimateValue;
                                    //var n =1/0
                                    }else{
                                        //console.log("Else")
                                        document.getElementById("subTaskEffort1")!.innerHTML = "0m";
                                        
                                    }
                                    
                                 } catch {
                                     document.getElementById("subTaskEffort1")!.innerHTML = "0m";
                                 }
                             }
                         }
                 
                     });
                 }
             
                    
                    
                     loadADOProjectInfo() {
                        this.callSBAPI1(this.adoComp.getADOProjectDetails(), 'projectName');
                        this.loadWorkitemInfo();
                    
                    }
                    
                     loadWorkitemInfo() {
                        document.getElementById("subTaskID1")!.innerHTML="";
                        document.getElementById("subTaskStatus1")!.innerHTML="";
                         var body={
                             "WorkItemType":this.adoWorkItemCategory,
                             "State":(document.getElementById("lb_issueStatus1")! as HTMLSelectElement).options[(document.getElementById("lb_issueStatus1")! as HTMLSelectElement).selectedIndex].innerHTML,
                             "TeamProject":this.adoProjectName
                         }
                         var headers={
                             headers: {
                                 "Content-Type": "application/json",
                                 "Accept":"application/json"
                             },
                             "method":"POST",
                             "body":JSON.stringify(body)
                         }
                        this.status = (document.getElementById("lb_issueStatus1") as HTMLSelectElement).options[(document.getElementById("lb_issueStatus1") as HTMLSelectElement).selectedIndex].innerHTML;
                        //document.getElementById("lb_issueStatus1")!.innerHTML =this.status;
                        //console.log("Status change: "+this.status);
                        this.callSBAPI1(this.adoComp.getADOWorkItems(body,this.adoProjectName), 'issues',headers);

                        //this.loadIssues1();
                    }
                    
                    
                    
                     pjtName1() {
                        document.getElementById("lb_pnameado")!.innerHTML = this.adoProjectName;
                    }
                    
                     categoryName1() {
                        document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                    }
                    
                     loadIssueTypes1(){
                        this.adoProjectName = (document.getElementById("adoProjectName") as HTMLSelectElement).options[(document.getElementById("adoProjectName") as HTMLSelectElement).selectedIndex].innerHTML;
                        //console.log("Load Issue Type PJTName: "+this.adoProjectName)
                        document.getElementById("subTaskID1")!.innerHTML="";
                        document.getElementById("subTaskStatus1")!.innerHTML="";
                        document.getElementById("lb_pnameado")!.innerHTML = this.adoProjectName;
                        this.callSBAPI1(this.adoComp.getADOIssueTypes(this.adoProjectName), 'category');
                    }
                    
                     loadIssues1() {
                        document.getElementById("subTaskID1")!.innerHTML="";
                        document.getElementById("subTaskStatus1")!.innerHTML="";
                         ////console.log("LOL")
                        this.adoProjectName = (document.getElementById("adoProjectName") as HTMLSelectElement).options[(document.getElementById("adoProjectName")as HTMLSelectElement).selectedIndex].innerHTML;
                        //console.log("Issue project names: "+this.adoProjectName)
                        this.adoWorkItemCategory = (document.getElementById("adoWorkItemCategory")as HTMLSelectElement).options[(document.getElementById("adoWorkItemCategory")as HTMLSelectElement).selectedIndex].innerHTML;
                        //this.adoWorkitemID = (document.getElementById("adoWorkitemID")as HTMLSelectElement).options[(document.getElementById("adoWorkitemID")as HTMLSelectElement).selectedIndex].innerHTML;
                        document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                        //this.callSBAPI1(this.sbServer + '/estimation/ado/project/issues?jql=project%20%3D%20"' + this.adoProjectName + '"%20AND%20type%20%3D%20"' + this.adoWorkItemCategory + '"AND%20status%20%3D%20"' + document.getElementById("lb_statusado")!.innerHTML + '"%20ORDER%20BY%20created%20DESC', 'issues');
                        
                     document.getElementById("lb_catnameado")!.innerHTML = this.adoWorkItemCategory;
                     
                     //console.log("Change: "+this.sbServer+"/estimation/ado/"+this.adoProjectName+"/"+this.adoWorkItemCategory+"/status")
                     this.callSBAPI1(this.adoComp.getADOIssueTypeStatus(this.adoProjectName,this.adoWorkItemCategory), 'states');
                     }
                    
                     loadIssueInfo1() {
                        document.getElementById("subTaskID1")!.innerHTML="";
                        document.getElementById("subTaskStatus1")!.innerHTML="";
                        this.adoProjectName = (document.getElementById("adoProjectName") as HTMLSelectElement).options[(document.getElementById("adoProjectName") as HTMLSelectElement).selectedIndex].innerHTML;
                       this.adoWorkItemCategory = (document.getElementById("adoWorkItemCategory")as HTMLSelectElement).options[(document.getElementById("adoWorkItemCategory") as HTMLSelectElement).selectedIndex].value;
                        this.adoWorkitemID = (document.getElementById("adoWorkitemID")as HTMLSelectElement).options[(document.getElementById("adoWorkitemID") as HTMLSelectElement).selectedIndex].value;
                        this.callSBAPI1(this.adoComp.getADOWorkItem(this.adoProjectName,this.adoWorkitemID), 'issueInfo');
                    }
                    
                     loadSubTaskInfo1() {
                        document.getElementById("subTaskID1")!.innerHTML="";
                        document.getElementById("subTaskStatus1")!.innerHTML="";
                        this.adoProjectName = (document.getElementById("adoProjectName") as HTMLSelectElement).options[(document.getElementById("adoProjectName") as HTMLSelectElement).selectedIndex].innerHTML;
                        this.adoWorkItemCategory = (document.getElementById("adoWorkItemCategory") as HTMLSelectElement).options[(document.getElementById("adoWorkItemCategory") as HTMLSelectElement).selectedIndex].value;
                        this.adoWorkitemID = (document.getElementById("adoWorkitemID") as HTMLSelectElement).options[(document.getElementById("adoWorkitemID") as HTMLSelectElement).selectedIndex].value;
                        this.adoSubtaskId = (document.getElementById("adoSubTasks") as HTMLSelectElement).options[(document.getElementById("adoSubTasks") as HTMLSelectElement).selectedIndex].value;
                        this.callSBAPI1(this.adoComp.getADOWorkItem(this.adoProjectName, this.adoSubtaskId), 'subTaskInfo');
                    }
                    
                     async loadAssignee1(){
                         var respStatus;
                        await fetch(this.sbServer + '/estimation/ado/users')
                            .then(response => {
                                respStatus = response.status;
                                return response.json();
                            }).then(data => {
                            document.getElementById("assigneeNameado")!.innerHTML = "";
                            //console.log("Assignee Data: "+JSON.stringify(data));
                            for (var i in data.value) {
                                    //console.log("I: "+data.value[i].displayName)
                                
                                    var assigneeInfo = document.createElement('option');
                                    assigneeInfo.value = data.value[i].originId;
                                    assigneeInfo.title = data.value[i].displayName;
                                    assigneeInfo!.innerHTML = data.value[i].displayName;
                                    document.getElementById("assigneeNameado")!.appendChild(assigneeInfo);
                                    if(Number(i)==0) this.WorkItem_assignee = assigneeInfo.innerHTML;
                                
                            }
                        });
                    }
                    
                     taskLoadAssignee1() {
                     var respStatus;
                        fetch(this.sbServer + '/estimation/ado/users')
                            .then(response => {
                                respStatus = response.status;
                                return response.json();
                            }).then(data => {
                            document.getElementById("taskassigneeName")!.innerHTML = "";
                            for (var i in data.value) {
                                
                                    var assigneeInfo = document.createElement('option');
                                    assigneeInfo.value = data.value[i].originId;
                                    assigneeInfo.title = data.value[i].displayName;
                                    assigneeInfo!.innerHTML = data.value[i].displayName;
                                    document.getElementById("taskassigneeName")!.appendChild(assigneeInfo);
                                    if(Number(i)==0) this.taskWorkItem_assignee = assigneeInfo.innerHTML;
                                
                            }
                        });
                    }
                    
                     changeAssignee1() {
                        var accountId = (document.getElementById("assigneeNameado")as HTMLSelectElement).options[(document.getElementById("assigneeNameado") as HTMLSelectElement).selectedIndex].title;
                        var payload ={
                            fieldName: "user",
                            value:accountId

                        }
                        this.adoComp.updateADOWorkItem(payload, this.adoProjectName, this.adoWorkitemID).subscribe(response => {
                            this.loadIssueInfo1();
                            alert("User Assigned");
                        })
                    }
                    
                     taskChangeAssignee1() {
                        var accountId = (document.getElementById("taskassigneeName") as HTMLSelectElement).options[(document.getElementById("taskassigneeName") as HTMLSelectElement).selectedIndex].title;
                        var payload ={
                            fieldName: "user",
                            value:accountId

                        }
                        this.adoComp.updateADOWorkItem(payload, this.adoProjectName, this.adoSubtaskId).subscribe(response => {
                            this.loadIssueInfo1();
                            alert("User Assigned");
                        })
                    }
                    
                     createSubTask1(taskType:any) {
                        let descr = prompt("Provide Task Description");
                        var payload ={
                            subtasktype:taskType,
                            description:descr
                        }
                        this.adoComp.createADOSubWorkItem(payload,this.adoProjectName,this.adoWorkitemID).subscribe(res => {
                                this.loadIssueInfo1();
                                alert("subtask Created");
                            }
                        );
                        
                    }
                    
                     deleteSubTask1() {
                        this.adoComp.deleteSubTasks(this.adoProjectName,this.adoSubtaskId).subscribe(res => {
                                this.loadIssueInfo1();
                                alert("subtask deleted");
                            }
                        );
                    
                    }            






         




 
           @ViewChild('contentToExport') contentToExport!: ElementRef;

           // Method to export to PDF
        //    exportToPDF(): void {
        //      const pdf = new jsPDF();
         
        //      // Get the HTML content to export
        //      const content = this.contentToExport.nativeElement;
         
        //      // Use html2canvas to capture the content as an image
        //      html2canvas(content).then((canvas) => {
        //        // Convert the canvas to a data URL
        //        const imgData = canvas.toDataURL('image/png');
         
        //        // Add the image data to the PDF
        //        pdf.addImage(imgData, 'PNG', 0, 0, pdf.internal.pageSize.getWidth(), pdf.internal.pageSize.getHeight());
         
        //        // Save the PDF
        //        pdf.save('exported_document.pdf');
        //      });
        //    }


        exportToPDF(): void {
            const pdf = new jsPDF();
            const content = this.contentToExport.nativeElement;
        
            // Convert HTML to PDF
            pdf.html(content, {
              callback: () => {
                // Save the PDF
                pdf.save('exported_document.pdf');
              }
            });
        }




        // @ViewChild('contentToExport') contentToExport!: ElementRef;

        downloadPDF() {
            const doc = new jsPDF('p', 'pt', 'a4');
            const content = this.contentToExport.nativeElement;

            html2canvas(content).then((canvas) => {
            const imgWidth = 500; // Adjust as needed
            const imgHeight = (canvas.height * imgWidth) / canvas.width;

            const contentDataURL = canvas.toDataURL('image/png');

            doc.addImage(contentDataURL, 'PNG', 0, 0, imgWidth, imgHeight);
            doc.save('Grooming_document.pdf');
            });
        }


       

      
}