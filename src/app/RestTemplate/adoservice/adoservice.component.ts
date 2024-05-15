import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component,Injectable } from '@angular/core';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-adoservice',
  standalone: true,
  imports: [],
  templateUrl: './adoservice.component.html',
  styleUrl: './adoservice.component.css'
})
export class ADOServiceComponent {
  private baseUrl = 'http://localhost:8080/estimation';
  estimation: any;  //type
  constructor(private http:HttpClient){}

  getADOProjectDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ado/projectInfo`);
  }
 
  getADOIssueTypes(projectID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ado/${projectID}/issueTypes`);
  }
 
  getADOIssueTypeStatus(projectID: string, issueType: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ado/${projectID}/${issueType}/status`);
  }
 
  getADOWorkItems(addlFilters: any, projectID: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/ado/${projectID}`, addlFilters);
  }
 
  getADOWorkItem(projectID: string, issueID: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ado/${projectID}/${issueID}`);
  }
 
  createADOSubWorkItem(payloadInfo: any, projectID: string, issueID: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/ado/${projectID}/${issueID}/subtask`, payloadInfo, {
      headers,
      observe: 'response',
    });
  }
 
  updateADOWorkItem(payloadInfo: any, projectID: string, issueID: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.put(`${this.baseUrl}/ado/${projectID}/${issueID}`, payloadInfo, {
      headers,
      observe: 'response',
    });
  }
 
  deleteSubTasks(payloadInfo: any[], projectID: string): Observable<HttpResponse<Object>> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.delete(`${this.baseUrl}/ado/${projectID}/workItem`, {
      headers,
      body: { id: payloadInfo }, // Wrap the payloadInfo in an object
      observe: 'response',
    });
  }
 
  getADOUserDetails(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ado/users`);
  }
}



