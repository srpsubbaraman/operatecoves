import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component,Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-jira-service',
  standalone: true,
  imports: [],
  templateUrl: './jira-service.component.html',
  styleUrl: './jira-service.component.css'
})
export class JiraServiceComponent {
  baseUrl:string = "http://localhost:8080/estimation"
  constructor(private http: HttpClient) {}
 
  getJiraProjectDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/projectInfo`);
  }

  getAllIssueStatus(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/status`);
  }
 
  getJiraUserDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/users`);
  }
 
  updateIssueUser(issueId: string, accountId: string): Observable<any> {
    return this.http.put(`${this.baseUrl}/jira/${issueId}/user/${accountId}`, {});
  }
 
  getJiraIssueTypes(projectID: string): Observable<Object> {
    return this.http.get(`${this.baseUrl}/jira/project/${projectID}/issueTypes`);
  }
 
  getAllIssues(projectID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/${projectID}/issues`);
  }
 
  getSpecificIssues(regex: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/project/issues?jql=${regex}`);
  }
 
  getJiraIssueDetails(issueID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/jira/issue/${issueID}`);
  }
 
  createJiraSubTask(createSubTask: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/jira/issue/subtask`, createSubTask, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'  // to access the complete HTTP response, including headers and status.
    });
  }
 
  postComment(comment: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/jira/issue/comment`, comment, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
 
  updateEstimation(issueDetails: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/jira/issue/timetracking`, issueDetails, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      observe: 'response'
    });
  }
 
  deleteSubTask(issueID: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/jira/issue/subtask/${issueID}`);
  }


}
