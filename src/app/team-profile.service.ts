import { Injectable, OnInit } from '@angular/core';
import { Observable, map, of } from 'rxjs';
import { TeamMember } from './models/team-member';
import { HttpClient } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class TeamService implements OnInit {
 //this is the manual data 
    // getTeamData(): Observable<TeamMember[]> {
    //   const teamData: TeamMember[] = [
    //     { name: 'Subbaraman, Sundararamaprasad', position: 'Associate Director', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Chennai', projects: [  'OperateSync','Operate', 'OperateEdge' ],email:'ssubbaraman@deloitte.com'}, //Need to Update
    //     { name: 'Ranganath, Prashanth', position: 'Manager', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Bengaluru',projects: [ 'OperateSync','Operate', 'OperateEdge'  ],email:'pranganath@deloitte.com'}, //Need to Update
    //     { name: 'Nagarajan, Vaidheeswaran', position: 'Consultant', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Hyderabad', projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'vanagarajan@deloitte.com'},  //Need to Update
    //     { name: 'Phadnis, Aryamaan', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS', 'SAP BTP', 'SAP UI5','Springboot'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Mumbai', projects: [ 'Operate Assets And Innovation' ],email:'arphadnis@deloitte.com'},
    //     { name: 'Raul, Aniket', position: 'Associate Analyst', skills: [ 'Angular', 'HTML', 'CSS', 'Javascript', 'SAP MM (Basics)'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Mumbai', projects: [ 'Operate Assets And Innovation' ],email:'araul@deloitte.com'},
    //     { name: 'A, Vishal', position: 'Associate Analyst', skills: ['SAP ABAP', 'SAP iRPA', 'SAP MM (Basics)', 'SAP CPI', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate Assets And Innovation' ],email:'visha@deloitte.com'},
    //     { name: 'N, Sarran', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'sarn@deloitte.com'},
    //     { name: 'M, Megha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge'],email:'meghm@deloitte.com'},
    //     { name: 'Birwadkar, Esha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai', projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'ebirwadkar@deloitte.com'},
    //     { name: 'D, Mahisha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Coimbatore'  , projects: [ 'OperateSync','Operate', 'OperateEdge'],email:'mahd@deloitte.com'},
    //     { name: 'V, Lakshana', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'lav@deloitte.com'},
    //     { name: 'K, Subhash', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'subak@deloitte.com'},
    //     { name: 'CV, Manimithra', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'mcv@deloitte.com'},
    //     { name: 'Mathew, Dinu', position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'VKL' ],email:'dinmathew@deloitte.com'},
    //     { name: 'Redij, Varsha', position: 'Senior Consultant', skills: ['SAP MM', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'VKL' ],email:'vredij@deloitte.com'},
    //     { name: 'Lele, Bharat', position: 'Manager', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'VKL' ],email:'blele@deloitte.com'},
    //     { name: 'Bafna, Dharamraj', position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'SKPL' ],email:'dhbafna@deloitte.com'},
    //     { name: 'Ghonmode, Pratik', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Pratik Ghonmode.png', location: 'Hyderabad' , projects: [ 'Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)'],email:'prghonmode@deloitte.com'},
    //     { name: 'Sharma, Durgaprasad', position: 'Senior Consultant', skills: ['SAP ABAP', 'PMO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Mankind', 'Tabreed' ],email:'dursharma@deloitte.com'},
    //     { name: 'Gore, Reshma', position: 'Consultant', skills: ['SAP MM'], profilePicture: 'assets/images/Team_Profile/Reshma Gore.png', location: 'Thane CEC' , projects: [ 'Mankind', 'VKL', 'c', 'V-Guard' ],email:'regore@deloitte.com'},
    //     { name: 'Udawant, Pallavi', position: 'Senior Consultant', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Pallavi Udawant.png', location: 'Pune' , projects: [ 'Mankind', 'VKL' ],email:'pudawant@deloitte.com'},
    //     { name: 'Singh, Pranav', position: 'Analyst', skills: ['SAP ABAP'],profilePicture: 'assets/images/Team_Profile/Pranav Singh.png', location: 'Delhi' , projects: ['Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)' ],email:'psingh24@deloitte.com'},
    //     { name: 'Dinesh, Sreya', position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Sreya Dinesh.png', location: 'Coimbatore' , projects: [ 'Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)'],email:'srdinesh@deloitte.com'},
    //     { name: 'Khairnar, Sagar', position: 'Analyst', skills: ['SAP PP','SAP WM/EWM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Alembic','Sovereign Pharma' ],email:'skhairnar@deloitte.com'},
    //     { name: 'Choudhary, Ashish', position: 'Consultant', skills: ['SAP Basis','SAP HANA' ], profilePicture: 'assets/images/Team_Profile/Ashish Choudhary.png', location: 'Thane' , projects: [ 'V-Guard','Operate (GOLIL, GOMEL, GAP)', 'Nesco', 'Manildra' ],email:'aschaudhari@deloitte.com'},
    //     { name: 'Khairnar, Jayesh', position: 'Analyst', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Jayesh Khairnar.png', location: 'Thane' , projects: [ 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)', 'Nesco' ],email:'jkhairnar@deloitte.com'},
    //     { name: 'M, Ragul Sangeeth', position: 'Associate Analyst', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Ragul Sangeeth M.png', location: 'Coimbatore' , projects: [ 'VKL','Alembic','Tabreed' ],email:'ragm@deloitte.com'},
    //     { name: 'Tiwari, Anuranjani', position: 'Senior Consultant', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Anuranjani Tiwari.png', location: 'Thane' , projects: [ 'V-Guard', 'Nesco', 'Operate (GOLIL, GOMEL, GAP)', 'SBI' ],email:'anutiwari@deloitte.com'},
    //     { name: 'Sugandhi, Gaurang', position: 'Analyst', skills: ['SAP MM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)', 'Nesco' ],email:'gsugandhi@deloitte.com'},
    //     { name: 'Shukla, Jay', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Jay Shukla.png', location: 'Thane' , projects: [ 'Tabreed', 'VKL' ],email:'jshukla@deloitte.com'},
    //     { name: 'Aikara, Vipin', position: 'Consultant', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Vipin Aikara.png', location: 'Bengaluru' , projects: [ 'Tabreed', 'VKL', 'V-Guard' ],email:'viaikara@deloitte.com'},
    //     { name: 'Kulkarni, Shubham', position: 'Consultant', skills: ['SAP EPPM','SAP PS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Tabreed','V-Guard', 'Nesco', 'JK Paper', 'Privi' ],email:'shubkulkarni@deloitte.com'},
    //     { name: 'M, Kiran Kumar', position: 'Analyst', skills: ['SAP Ariba'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hydrabad' , projects: [ 'Operate'],email:'kirm@deloitte.com'},
    //     { name: 'Achari, Vinod', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'VACHARI@DELOITTE.COM'},
    //     { name: 'Adduri, Chiranjeevi', position: 'Senior Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate'],email:'cadduri@deloitte.com'},
    //     { name: 'Agarwal, Sanjay', position: 'Manager', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'sanjagarwal@deloitte.com'},
    //     { name: 'Ahmed, Ezass', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ezahmed@deloitte.com'},
    // { name: 'Ahmed, Jaffar', position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'jafahmed@deloitte.com'},
    // { name: 'Amara, Jyothy', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Jyothy  Amara.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'jjyothyamara@deloitte.com'},
    // { name: 'Anand, Vishal', position: 'Consultant', skills: ['SAP FIORI/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'visanand@deloitte.com'},
    // { name: 'B R, Pradeep Kumar', position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ppradeepkumarbr@deloitte.com'},
    // { name: 'Babu, Poornima', position: 'Associate Analyst', skills: ['SAP SAC' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'pbabu@deloitte.com'},
    // { name: 'Bajaninti, Thejkumar', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'tbajaninti@deloitte.com'},
    // { name: 'Balaji, Srivarshini', position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'srivbalaji@deloitte.com'},
    // { name: 'Baliga, Rajesh', position: 'Partner', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rajeshbaliga@deloitte.com'},
    // { name: 'Ballari, Sushmita', position: 'Analyst', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'sballari@deloitte.com'},
    // { name: 'Benade, Rakshita', position: ' Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rbenade@deloitte.com'},
    // { name: 'Bendre, Pinac', position: 'Associate Director', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'pbendre@deloitte.com'},
    // { name: 'Bendre, Tejal', position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tbendre@deloitte.com'},
    // { name: 'Bhagwat, Pratik', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'prabhagwat@deloitte.com'},
    // { name: 'Bhalekar, Niharika', position: 'Manager', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nbhalekar@deloitte.com'},
    // { name: 'Bhandari, Tushar', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'tubhandari@deloitte.com'},
    // { name: 'Borade, Nikhil', position: 'Analyst', skills: ['SAP MM','SAP MM ECC',' SAP SD'], profilePicture: 'assets/images/Team_Profile/Nikhil Borade.png', location: 'Thane' , projects: [ 'Dadachanji Group (KLS,KPPL,SPPL)','STG','GRIDCO' ],email:'nborade@deloitte.com'},
    // { name: 'Bose, Soumo', position: 'Manager', skills: ['SAP EAM/PM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sbose2@deloitte.com'},
    // { name: 'Chak, Nikita', position: 'Consultant', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'nchak@deloitte.com'},
    // { name: 'Challa, Mahesh', position: 'Senior Consultant', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'machalla@deloitte.com'},
    // { name: 'Chandrasekar, Mano Prabu', position: 'Associate Analyst', skills: ['SAP ABAP','SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'mchandrasekar@deloitte.com'},
    // { name: 'Chaudhari, Shantanu', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'shanchaudhari@deloitte.com'},
    // { name: 'Chaudhari, Yogesh', position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Yogesh Chaudhari.png', location: 'Pune' , projects: [ 'Operate' ],email:'ychaudhari@deloitte.com'},
    // { name: 'Chauhan, Rahul', position: 'Manager', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'rahuchauhan@deloitte.com'},
    // { name: 'Chavan, Mayuresh', position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'maychavan@deloitte.com'},
    // { name: 'Chavan, Viraj', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'virchavan@deloitte.com'},
    // { name: 'D, Ramesh', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rd1@deloitte.com'},
    // { name: 'Dash, Manasa', position: 'Consultant', skills: ['SAP  GTS' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'manadash@deloitte.com'},
    // { name: 'Dhanakoti, Manikandan', position: 'Associate Director', skills: ['SAP BW HANA'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'mdhanakoti@deloitte.com'},
    // { name: 'Dhole, Shrikant', position: 'Consultant', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sdhole@deloitte.com'},
    // { name: 'Dhumal, Sagar', position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sagdhumal@deloitte.com'},
    // { name: 'Dongare, Rohit', position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Rohit Dongare.png', location: 'Pune' , projects: [ 'STG','KLS', 'KPPL', 'SPPL', 'GRIDCO' ],email:'rdongare@deloitte.com'},
    // { name: 'Doss, Mahimai', position: 'Associate Director', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'madoss@deloitte.com'},
    // { name: 'Dwivedi, Anant',position: 'Consultant', skills: ['SAP CO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'andwivedi@deloitte.com'},
    // { name: 'G, Karthik', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'kag@deloitte.com'},
    // { name: 'Gadigi, Veerendra', position: 'Director', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'vgadigi@deloitte.com'},
    // { name: 'Ganu, Bhushan',position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'bganu@deloitte.com'},
    // { name: 'Garg, Falguni', position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'fgarg@deloitte.com'},
    // { name: 'Gentela, Bharath', position: 'Director', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'bhgentela@deloitte.com'},
    // { name: 'Gopalakrishnan, Kavitha', position: 'Associate Analyst', skills: ['SAP SAC' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'kagopalakrishnan@deloitte.com'},
    // { name: 'G, Bhavani',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'bhavg@deloitte.com'},
    // { name: 'Govindbaksh, Ramu', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'rgovindbaksh@deloitte.com'},
    // { name: 'Gupta, Arun', position: 'Manager', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'arungu@deloitte.com'},
    // { name: 'Harshavardhan, Karra', position: 'Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'karharshavardhan@deloitte.com'},
    // { name: 'Hingave, Subodh',position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Subodh Hingave.png', location: 'Pune' , projects: [ 'Operate' ],email:'shingave@deloitte.com'},
    // { name: 'Ikram, Syed',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'syikram@deloitte.com'},
    // { name: 'Jain, Abhishek',position: 'Manager', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ajain25@deloitte.com'},
    // { name: 'Jaiswal, Amol',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'amojaiswal@deloitte.com'},
    // { name: 'Jaitiya, Sudesh',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sjaitiya@deloitte.com'},
    // { name: 'Jenifer Amalraj, Rebecca',position: ' Consultant', skills: ['SAP SD',' DMS','GTS' ], profilePicture: 'assets/images/Team_Profile/Rebecca Jenifer.png', location: 'Chennai' , projects: [ 'STG','Privi' ],email:'rjeniferamalraj@deloitte.com'},
    // { name: 'Jujhavarapu, Ananda Kumar',position: 'Senior Analyst', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ajujhavarapu@deloitte.com'},
    // { name: 'K H, Rassmi',position: 'Associate Analyst', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Neom' ],email:'rkh1@deloitte.com'},
    // { name: 'K N, Chaithra',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ckn@deloitte.com'},
    // { name: 'K, Ramakanth',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/amakanth Kalal.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ramk@deloitte.com'},
    // { name: 'Kadam, Nikhil',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nkadam@deloitte.com'},
    // { name: 'Kaitikwar, Sanket',position: 'Senior Analyst', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'skaitikwar@deloitte.com'},
    // { name: 'Kamble, Jidnyasu',position: 'Manager', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'jikamble@deloitte.com'},
    // { name: 'Kareru, Manjunath',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'mkareru@deloitte.com'},
    // { name: 'Kaware, Swapnil',position: 'Analyst', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'skaware@deloitte.com'},
    // { name: 'Khose, Nitin',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'nkhose@deloitte.com'},
    // { name: 'Koppaka, Durga Rohit Ramkumar',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/DurgaRohit, Koppaka.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'dkoppaka@deloitte.com'},
    // { name: 'Kshatriya, Ashish',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'akshatriya@deloitte.com'},
    // { name: 'Kulkarni, Kaivalya',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kaikulkarni@deloitte.com'},
    // { name: 'Kulkarni, Priyank',position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'priykulkarni@deloitte.com'},
    // { name: 'Kulkarni, Vedant',position: 'Senior Associate', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'vedakulkarni@deloitte.com'},
    // { name: 'Kumaar, Manoj',position: 'Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'mkumaar@deloitte.com'},
    // { name: 'Kumar, Dipak',position: 'Associate Director', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'dipakumar@deloitte.com'},
    // { name: 'Kumar, Rahul',position: 'Consultant', skills: ['SAP Fiori/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rkumar42@deloitte.com'},
    // { name: 'Kumari, Anjali',position: 'Analyst', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'ankumari@deloitte.com'},
    // { name: 'Kunale, Kaushik',position: 'Analyst', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kkunale@deloitte.com'},
    // { name: 'Lokhande, Dhanesh',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'dhlokhande@deloitte.com'},
    // { name: 'Londhe, Leena',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'llondhe@deloitte.com'},
    // { name: 'M, Boobalan',position: 'Analyst', skills: ['SAP CPI','SAP PI/PO' ], profilePicture: 'assets/images/Team_Profile/Boobalan M.png', location: 'Coimbatore', projects: [ 'AMS-STG (Staffit Allocation - Dec 2024)', 'ODP-Shell (Mulsoft To CPI Migration  - Firm Contribution)', 'ODP-Gold Medal (Shadow - Firm Contribution)' ], email:'boom1@deloitte.com'},
    // { name: 'M, Gomathi',position: 'Associate Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'gomm@deloitte.com'},
    // { name: 'Mahalingam, Sneha',position: 'Associate Analyst', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'snmahalingam@deloitte.com'},
    // { name: 'Mane, Suraj',position: 'Analyst', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Neom' ],email:'sumane@deloitte.com'},
    // { name: 'Manoharan, Rubika',position: 'Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'rumanoharan@deloitte.com'},
    // { name: 'Mansukh, Rakesh',position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rmansukh@deloitte.com'},
    // { name: 'Manthu, Vishnuvardhan Reddy',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'vmanthu@deloitte.com'},
    // { name: 'Masal, Shreya',position: 'Analyst', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Neom' ],email:'smasal@deloitte.com'},
    // { name: 'Mehta, Moxa',position: 'Consultant', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'momehta@deloitte.com'},
    // { name: 'Mohammad, Fazullah',position: 'Associate Director', skills: ['SAP SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'fazmohammad@deloitte.com'},
    // { name: 'Naseer, Mohammed',position: 'Senior Consultant', skills: ['Mulesoft' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'mnaseer@deloitte.com'},
    // { name: 'Mohapatra, Saumendra',position: 'Associate Director', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'saumohapatra@deloitte.com'},
    // { name: 'Mukherjee, Souparno',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'soupmukherjee@deloitte.com'},
    // { name: 'Mule, Srihari',position: 'Associate Director', skills: ['SDM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'smule@deloitte.com'},
    // { name: 'Naraharisetti, Srilatha',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'srilathan@deloitte.com'},
    // { name: 'Narasimhappa, Pramodh',position: 'Manager', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'pnarasimhappa@deloitte.com'},
    // { name: 'Noor, Shaik',position: 'Senior Consultant', skills: ['SAP CO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'shanoor@deloitte.com'},
    // { name: 'Pachpande, Sheetal',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'spachpande@deloitte.com'},
    // { name: 'Palani, Srinath',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'spalani@deloitte.com'},
    // { name: 'Pandey, Kamlesh',position: 'Manager', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'kamlespandey@deloitte.com'},
    // { name: 'Patil, Sanjay',position: 'Senior Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sanjpatil@deloitte.com'},
    // { name: 'Pawar, Rahul',position: 'Manager', skills: ['SAP Solman' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rahpawar@deloitte.com'},
    // { name: 'Pethe, Nilesh',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'npethe@deloitte.com'},
    // { name: 'Phadtare, Tanmay',position: 'Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tphadtare@deloitte.com'},
    // { name: 'Phalebhai, Tejas',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tphalebhai@deloitte.com'},
    // { name: 'Pichamani, Pavithra',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'ppichamani@deloitte.com'},
    // { name: 'Poddar, Pooja',position: 'Senior Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'popoddar@deloitte.com'},
    // { name: 'Prabhu, Ganesh',position: 'Director', skills: ['SAP'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'gprabhu@deloitte.com'},
    // { name: 'Prakash, Pallavi',position: 'Associate Director', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'palprakash@deloitte.com'},
    // { name: 'R, Haritha',position: 'Associate Analyst', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'harir@deloitte.com'},
    // { name: 'Punjabi, Roshni',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ropunjabi@deloitte.com'},
    // { name: 'R, Lavanya',position: 'Consultant', skills: ['SAP PMO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'lr22@deloitte.com'},
    // { name: 'R, Padhmasri',position: 'Associate Analyst', skills: ['SAP BTP','SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore ' , projects: [ 'Neom' ],email:'padr@deloitte.com'},
    // { name: 'Rai, Vimal',position: 'Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'vimalrai@deloitte.com'},
    // { name: 'Rajeshirke, Nitin',position: 'Consultant', skills: ['SAP Fiori/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nrajeshirke@deloitte.com'},
    // { name: 'Ramesh, Deepaananya',position: 'Associate Analyst', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Deepaananya Ramesh.png', location: 'Coimbatore ' , projects: [ 'Operate' ],email:'deramesh@deloitte.com'},
    // { name: 'Ranapurwala, Mustafa',position: 'Consultant', skills: ['SAP EPPM/PS' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Ahmedabad' , projects: [ 'Operate' ],email:'mranapurwala@deloitte.com'},
    // { name: 'Rane, Smita',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'smrane@deloitte.com'},
    // { name: 'Ranjan Ray, Soumya',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'sranjanray@deloitte.com'},
    // { name: 'Rao, Nitish',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nitrao@deloitte.com'},
    // { name: 'Reddy, Cheppala',position: 'Consultant', skills:['SAP FSCM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'chepreddy@deloitte.com'},
    // { name:'Nedium, Lokanadha',position: 'Senior Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png',   location: 'Bengaluru' , projects: [ 'Operate' ],email:'lnedium@deloitte.com'}, 
    // { name: 'RS, Dwarakesh',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'dwrs@deloitte.com'},
    // { name: 'S, Deepakkumar',position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'VKL','Alembic' ],email:'deepas@deloitte.com'},
    // { name: 'Sah, Rahul',position: 'Consultant', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rasah@deloitte.com'},
    // { name: 'Sahoo, Baidyanath',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'basahoo@deloitte.com'},
    // { name: 'Sarkar, Abhishek',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Abhishek Sarkar.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'abhisheksarkar@deloitte.com'},
    // { name: 'Sarvankar, Mahesh',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'msarvankar@deloitte.com'},
    // { name: 'Satyanarayana, Deepak',position: 'Associate Director', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'dsatyanarayana@deloitte.com'},
    // { name: 'Sawant, Sanika',position: 'Analyst', skills: ['Serialization' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sanisawant@deloitte.com'},
    // { name: 'Sawant, Amey',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'amesawant@deloitte.com'},
    // { name: 'Sawant, Sayali',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ssawant@deloitte.com'},
    // { name: 'Sawant, Swapna',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'swsawant@deloitte.com'},
    // { name: 'Saxena, Sujay',position: 'Associate Director', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'sujasaxena@deloitte.com'},
    // { name: 'Sekhar Deo, Priyanka',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Priyanka Sekhar Deo.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'psekhardeo@deloitte.com'},
    // { name: 'Selvaraj, Chandraleka',position: 'Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'cselvaraj@deloitte.com'},
    // { name: 'Shaik, Saleem Javed',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'saleshaik@deloitte.com'},
    // { name: 'Sharma, Abhishek',position: 'Senior Consultant', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'abhissharma@deloitte.com'},
    // { name: 'Sharma, Akshay',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'akshaysharma4@deloitte.com'},
    // { name: 'Sharma, Roshan',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'roshasharma@deloitte.com'},
    // { name: 'Sharma, Prachi',position: 'Associate Analyst', skills: ['TBD' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Mankind' ],email:'psharma33@deloitte.com'},
    // { name: 'Shetty, Jaya',position: 'Senior Consultant', skills: ['CSV' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'jashetty@deloitte.com'},
    // { name: 'Shukla, Prakhar',position: 'Senior Consultant', skills: ['SAP EAM','SAP PM' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'prashukla@deloitte.com'},
    // { name: 'Singh, Avinash',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'avinassingh@deloitte.com'},
    // { name: 'Singh, Shivraj',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'shivrasingh@deloitte.com'},
    // { name: 'Singh, Vinish',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'vinissingh@deloitte.com'},
    // { name: 'Sivasubramaniam, Ruban Prasanth',position: 'Manager', skills: ['SAP PI/PO' ], profilePicture: 'assets/images/Profile black.png', location: 'Coimbatore CEC' , projects: [ 'Operate' ],email:'rsivasubramaniam@deloitte.com'},
    // { name: 'Srivastva, Nil Kamal',position: 'Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'nsrivastva@deloitte.com'},
    // { name: 'Suryawanshi, Kedar',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kesuryawanshi@deloitte.com'},
    // { name: 'Swain, Ratiranjan',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'ratswain@deloitte.com'},
    // { name: 'T M, Chetan',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ctm1@deloitte.com'},
    // { name: 'Taneja, Yash',position: 'Associate Analyst', skills: ['TBD' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'ytaneja@deloitte.com'},
    // { name: 'Thakur, Shikha',position: 'Senior Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'shikthakur@deloitte.com'},
    // { name: 'Tirumalasetti, Ravi Teja',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'rtirumalasetti@deloitte.com'},
    // { name: 'Tumuluri, Tejaswi',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ttumuluri@deloitte.com'},
    // { name: 'Umtol, Yogesh',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'yumtol@deloitte.com'},
    // { name: 'V, Mounika',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'mouv@deloitte.com'},
    // { name: 'V, Sarita',position: 'Senior Consultant', skills: ['PMO' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sariv@deloitte.com'},
    // { name: 'V, Sathish',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sathv@deloitte.com'},
    // { name: 'Vaidya, Parag',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'pavaidya@deloitte.com'},
    // { name: 'Vanamala, Nikhil Dev',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'nvanamala@deloitte.com'},
    // { name: 'Verma, Yash',position: 'Senior Consultant', skills: ['SAP PI/PO' ], profilePicture: 'assets/images/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'yverma@deloitte.com'},
    // { name: 'Varma, Yogesh',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'yovarma@deloitte.com'},
    // { name: 'Vijayanandh, Sethana',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sevijayanandh@deloitte.com'},
    // { name: 'Wakde, Suprit',position: 'Manager', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'swakde@deloitte.com'},
    // { name: 'Mudiam, Anusha',position: 'Consultant', skills: ['SAP PP','SAP QM'], profilePicture: 'assets/images/Anusha Mudiam.png', location: 'Hyderabad' , projects: [ 'STG' ],email:'amudiam@deloitte.com'},
    // { name: 'Polishetti, Yeshwanth Kumar',position: 'Consultant', skills: ['SAP MM','SAP EWM' ], profilePicture: 'assets/images/Yeshwanth Polishetti.png', location: 'Hyderabad' , projects: [ 'STG' ],email:'ypolishetti@deloitte.com'},
    // { name: 'Relekar, Shubham',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Shubham Relekar.png', location: 'Pune' , projects: [ 'STG' ],email:'srelekar@deloitte.com'},
    // { name: 'Banala, Hemanth Ram Kumar',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Hemanth Banala.png', location: 'Bengaluru' , projects: [ 'STG' ],email:'hbanala@deloitte.com'},
    // { name: 'Lotlikar, Gautam',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Gautam Lotlikar.png', location: 'Thane' , projects: [ 'Dadachanji Groups'],email:'galotlikar@deloitte.com'},
    // { name: 'Mudholkar, Rajendrakumar', position: 'Senior Consultant', skills: ['SAP PP','SAP QM' ], profilePicture: 'assets/images/Team_Profile/Rajendrakumar Mudholkar.png', location: 'Pune' , projects: [ 'Tabreed', 'Privi', 'Gridco', 'Alembic', 'Nesco' ],email:'rmudholkar@deloitte.com'},
    // { name: 'Pampana, Rajesh', position: 'Consultant', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Rajesh Pampana.png', location: 'Hyderabad' , projects: [ 'Tabreed' ],email:'rpampana@deloitte.com'},
    // { name: 'Lakkanna, Krishna', position: 'Manager', skills: ['SDM', 'UX', 'Fiori'], profilePicture: 'assets/images/Team_Profile/Krishna Lakkanna.png', location: 'Bengaluru' , projects: [ 'V-Guard', 'Nesco', 'SBI MF', 'ABB' ],email:'klakkanna@deloitte.com'},
    // { name: 'M, Sowmiya Harshini', position: 'Associate Analyst', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Sowmiya Harshini M.png', location: 'Coimbatore' , projects: [ 'Dadachanji Groups', 'Privi' ],email:'sowm@deloitte.com'},
    // { name: 'Kulshrestha, Anjali', position: 'Analyst', skills: ['SAP ABAP','Python', 'JavaScript', 'Postgres SQL','Node Js'], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Mankind Pharma' ],email:'ankulshrestha@deloitte.com'},
    // ];
    //   return of(teamData);
    // }
 



//     private data =[
//       { name: 'Subbaraman, Sundararamaprasad', position: 'Associate Director', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Chennai', projects: [  'OperateSync','Operate', 'OperateEdge' ],email:'ssubbaraman@deloitte.com'}, 
//       { name: 'Ranganath, Prashanth', position: 'Manager', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Bengaluru',projects: [ 'OperateSync','Operate', 'OperateEdge'  ],email:'pranganath@deloitte.com'}, 
//       { name: 'Nagarajan, Vaidheeswaran', position: 'Consultant', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Hyderabad', projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'vanagarajan@deloitte.com'},  
//       { name: 'Phadnis, Aryamaan', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS', 'SAP BTP', 'SAP UI5','Springboot'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Mumbai', projects: [ 'Operate Assets And Innovation' ],email:'arphadnis@deloitte.com'},
//       { name: 'Raul, Aniket', position: 'Associate Analyst', skills: [ 'Angular', 'HTML', 'CSS', 'Javascript', 'SAP MM (Basics)'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Mumbai', projects: [ 'Operate Assets And Innovation' ],email:'araul@deloitte.com'},
//       { name: 'A, Vishal', position: 'Associate Analyst', skills: ['SAP ABAP', 'SAP iRPA', 'SAP MM (Basics)', 'SAP CPI', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate Assets And Innovation' ],email:'visha@deloitte.com'},
//       { name: 'N, Sarran', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'sarn@deloitte.com'},
//       { name: 'M, Megha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge'],email:'meghm@deloitte.com'},
//       { name: 'Birwadkar, Esha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai', projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'ebirwadkar@deloitte.com'},
//       { name: 'D, Mahisha', position: 'Associate Analyst', skills: ['Javascript', 'Angular', 'HTML', 'CSS'], profilePicture: 'assets/images/Team_Profile/Profile black.png',location: 'Coimbatore'  , projects: [ 'OperateSync','Operate', 'OperateEdge'],email:'mahd@deloitte.com'},
//       { name: 'V, Lakshana', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'lav@deloitte.com'},
//       { name: 'K, Subhash', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'subak@deloitte.com'},
//       { name: 'CV, Manimithra', position: 'Associate Analyst', skills: ['SAP BTP', 'HTML', 'CSS', 'Javascript', 'Jira E2E', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'OperateSync','Operate', 'OperateEdge' ],email:'mcv@deloitte.com'},
//       { name: 'Mathew, Dinu', position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'VKL' ],email:'dinmathew@deloitte.com'},
//       { name: 'Redij, Varsha', position: 'Senior Consultant', skills: ['SAP MM', ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'VKL' ],email:'vredij@deloitte.com'},
//       { name: 'Lele, Bharat', position: 'Manager', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'VKL' ],email:'blele@deloitte.com'},
//       { name: 'Bafna, Dharamraj', position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'SKPL' ],email:'dhbafna@deloitte.com'},
//       { name: 'Ghonmode, Pratik', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Pratik Ghonmode.png', location: 'Hyderabad' , projects: [ 'Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)'],email:'prghonmode@deloitte.com'},
//       { name: 'Sharma, Durgaprasad', position: 'Senior Consultant', skills: ['SAP ABAP', 'PMO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Mankind', 'Tabreed' ],email:'dursharma@deloitte.com'},
//       { name: 'Gore, Reshma', position: 'Consultant', skills: ['SAP MM'], profilePicture: 'assets/images/Team_Profile/Reshma Gore.png', location: 'Thane CEC' , projects: [ 'Mankind', 'VKL', 'Nesco', 'V-Guard' ],email:'regore@deloitte.com'},
//       { name: 'Udawant, Pallavi', position: 'Senior Consultant', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Pallavi Udawant.png', location: 'Pune' , projects: [ 'Mankind', 'VKL' ],email:'pudawant@deloitte.com'},
//       { name: 'Singh, Pranav', position: 'Analyst', skills: ['SAP ABAP'],profilePicture: 'assets/images/Team_Profile/Pranav Singh.png', location: 'Delhi' , projects: ['Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)' ],email:'psingh24@deloitte.com'},
//       { name: 'Dinesh, Sreya', position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Sreya Dinesh.png', location: 'Coimbatore' , projects: [ 'Nesco', 'SBI MF', 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)'],email:'srdinesh@deloitte.com'},
//       { name: 'Khairnar, Sagar', position: 'Analyst', skills: ['SAP PP','SAP WM/EWM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Alembic','Sovereign Pharma' ],email:'skhairnar@deloitte.com'},
//       { name: 'Choudhary, Ashish', position: 'Consultant', skills: ['SAP Basis','SAP HANA' ], profilePicture: 'assets/images/Team_Profile/Ashish Choudhary.png', location: 'Thane' , projects: [ 'V-Guard','Operate (GOLIL, GOMEL, GAP)', 'Nesco', 'Manildra' ],email:'aschaudhari@deloitte.com'},
//       { name: 'Khairnar, Jayesh', position: 'Analyst', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Jayesh Khairnar.png', location: 'Thane' , projects: [ 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)', 'Nesco' ],email:'jkhairnar@deloitte.com'},
//       { name: 'M, Ragul Sangeeth', position: 'Associate Analyst', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Ragul Sangeeth M.png', location: 'Coimbatore' , projects: [ 'VKL','Alembic','Tabreed' ],email:'ragm@deloitte.com'},
//       { name: 'Tiwari, Anuranjani', position: 'Senior Consultant', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Anuranjani Tiwari.png', location: 'Thane' , projects: [ 'V-Guard', 'Nesco', 'Operate (GOLIL, GOMEL, GAP)', 'SBI' ],email:'anutiwari@deloitte.com'},
//       { name: 'Sugandhi, Gaurang', position: 'Analyst', skills: ['SAP MM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'V-Guard', 'Operate (GOLIL, GOMEL, GAP)', 'Nesco' ],email:'gsugandhi@deloitte.com'},
//       { name: 'Shukla, Jay', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Jay Shukla.png', location: 'Thane' , projects: [ 'Tabreed', 'VKL' ],email:'jshukla@deloitte.com'},
//       { name: 'Aikara, Vipin', position: 'Consultant', skills: ['SAP SD'], profilePicture: 'assets/images/Team_Profile/Vipin Aikara.png', location: 'Bengaluru' , projects: [ 'Tabreed', 'VKL', 'V-Guard' ],email:'viaikara@deloitte.com'},
//       { name: 'Kulkarni, Shubham', position: 'Consultant', skills: ['SAP EPPM','SAP PS'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Tabreed','V-Guard', 'Nesco', 'JK Paper', 'Privi' ],email:'shubkulkarni@deloitte.com'},
//       { name: 'M, Kiran Kumar', position: 'Analyst', skills: ['SAP Ariba'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hydrabad' , projects: [ 'Operate'],email:'kirm@deloitte.com'},
//       { name: 'Achari, Vinod', position: 'Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'VACHARI@DELOITTE.COM'},
//       { name: 'Adduri, Chiranjeevi', position: 'Senior Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate'],email:'cadduri@deloitte.com'},
//       { name: 'Agarwal, Sanjay', position: 'Manager', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'sanjagarwal@deloitte.com'},
//       { name: 'Ahmed, Ezass', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ezahmed@deloitte.com'},
// { name: 'Ahmed, Jaffar', position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'jafahmed@deloitte.com'},
// { name: 'Amara, Jyothy', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Jyothy  Amara.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'jjyothyamara@deloitte.com'},
// { name: 'Anand, Vishal', position: 'Consultant', skills: ['SAP FIORI/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'visanand@deloitte.com'},
// { name: 'B R, Pradeep Kumar', position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ppradeepkumarbr@deloitte.com'},
// { name: 'Babu, Poornima', position: 'Associate Analyst', skills: ['SAP SAC' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'pbabu@deloitte.com'},
// { name: 'Bajaninti, Thejkumar', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'tbajaninti@deloitte.com'},
// { name: 'Balaji, Srivarshini', position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'srivbalaji@deloitte.com'},
// { name: 'Baliga, Rajesh', position: 'Partner', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rajeshbaliga@deloitte.com'},
// { name: 'Ballari, Sushmita', position: 'Analyst', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'sballari@deloitte.com'},
// { name: 'Benade, Rakshita', position: ' Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rbenade@deloitte.com'},
// { name: 'Bendre, Pinac', position: 'Associate Director', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'pbendre@deloitte.com'},

// { name: 'Bendre, Tejal', position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tbendre@deloitte.com'},
// { name: 'Bhagwat, Pratik', position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'prabhagwat@deloitte.com'},
// { name: 'Bhalekar, Niharika', position: 'Manager', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nbhalekar@deloitte.com'},
// { name: 'Bhandari, Tushar', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'tubhandari@deloitte.com'},
// { name: 'Borade, Nikhil', position: 'Analyst', skills: ['SAP MM','SAP MM ECC',' SAP SD'], profilePicture: 'assets/images/Team_Profile/Nikhil Borade.png', location: 'Thane' , projects: [ 'Dadachanji Group (KLS,KPPL,SPPL)','STG','GRIDCO' ],email:'nborade@deloitte.com'},
// { name: 'Bose, Soumo', position: 'Manager', skills: ['SAP EAM/PM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sbose2@deloitte.com'},
// { name: 'Chak, Nikita', position: 'Consultant', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'nchak@deloitte.com'},
// { name: 'Challa, Mahesh', position: 'Senior Consultant', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'machalla@deloitte.com'},
// { name: 'Chandrasekar, Mano Prabu', position: 'Associate Analyst', skills: ['SAP ABAP','SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'mchandrasekar@deloitte.com'},

// { name: 'Chaudhari, Shantanu', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'shanchaudhari@deloitte.com'},
// { name: 'Chaudhari, Yogesh', position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Yogesh Chaudhari.png', location: 'Pune' , projects: [ 'Operate' ],email:'ychaudhari@deloitte.com'},
// { name: 'Chauhan, Rahul', position: 'Manager', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'rahuchauhan@deloitte.com'},
// { name: 'Chavan, Mayuresh', position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'maychavan@deloitte.com'},
// { name: 'Chavan, Viraj', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'virchavan@deloitte.com'},
// { name: 'D, Ramesh', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rd1@deloitte.com'},
// { name: 'Dash, Manasa', position: 'Consultant', skills: ['SAP  GTS' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'manadash@deloitte.com'},
// { name: 'Dhanakoti, Manikandan', position: 'Associate Director', skills: ['SAP BW HANA'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'mdhanakoti@deloitte.com'},

// { name: 'Dhole, Shrikant', position: 'Consultant', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sdhole@deloitte.com'},
// { name: 'Dhumal, Sagar', position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sagdhumal@deloitte.com'},
// { name: 'Dongare, Rohit', position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Rohit Dongare.png', location: 'Pune' , projects: [ 'STG','KLS', 'KPPL', 'SPPL', 'GRIDCO' ],email:'rdongare@deloitte.com'},
// { name: 'Doss, Mahimai', position: 'Associate Director', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'madoss@deloitte.com'},
// { name: 'Dwivedi, Anant',position: 'Consultant', skills: ['SAP CO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'andwivedi@deloitte.com'},
// { name: 'G, Karthik', position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'kag@deloitte.com'},
// { name: 'Gadigi, Veerendra', position: 'Director', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'vgadigi@deloitte.com'},
// { name: 'Ganu, Bhushan',position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'bganu@deloitte.com'},
// { name: 'Garg, Falguni', position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'fgarg@deloitte.com'},
// { name: 'Gentela, Bharath', position: 'Director', skills: ['SAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'bhgentela@deloitte.com'},
// { name: 'Gopalakrishnan, Kavitha', position: 'Associate Analyst', skills: ['SAP SAC' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'kagopalakrishnan@deloitte.com'},
// { name: 'G, Bhavani',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'bhavg@deloitte.com'},
// { name: 'Govindbaksh, Ramu', position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'rgovindbaksh@deloitte.com'},
// { name: 'Gupta, Arun', position: 'Manager', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'arungu@deloitte.com'},
// { name: 'Harshavardhan, Karra', position: 'Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'karharshavardhan@deloitte.com'},
// { name: 'Hingave, Subodh',position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Subodh Hingave.png', location: 'Pune' , projects: [ 'Operate' ],email:'shingave@deloitte.com'},
// { name: 'Ikram, Syed',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'syikram@deloitte.com'},
// { name: 'Jain, Abhishek',position: 'Manager', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ajain25@deloitte.com'},
// { name: 'Jaiswal, Amol',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'amojaiswal@deloitte.com'},
// { name: 'Jaitiya, Sudesh',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sjaitiya@deloitte.com'},
// { name: 'Jenifer Amalraj, Rebecca',position: ' Consultant', skills: ['SAP SD',' DMS','GTS' ], profilePicture: 'assets/images/Team_Profile/Rebecca Jenifer.png', location: 'Chennai' , projects: [ 'STG','Privi' ],email:'rjeniferamalraj@deloitte.com'},
// { name: 'Jujhavarapu, Ananda Kumar',position: 'Senior Analyst', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ajujhavarapu@deloitte.com'},
// { name: 'K H, Rassmi',position: 'Associate Analyst', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Neom' ],email:'rkh1@deloitte.com'},
// { name: 'K N, Chaithra',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ckn@deloitte.com'},
// { name: 'K, Ramakanth',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/amakanth Kalal.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ramk@deloitte.com'},
// { name: 'Kadam, Nikhil',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nkadam@deloitte.com'},
// { name: 'Kaitikwar, Sanket',position: 'Senior Analyst', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'skaitikwar@deloitte.com'},
// { name: 'Kamble, Jidnyasu',position: 'Manager', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'jikamble@deloitte.com'},
// { name: 'Kareru, Manjunath',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'mkareru@deloitte.com'},

// { name: 'Kaware, Swapnil',position: 'Analyst', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'skaware@deloitte.com'},
// { name: 'Khose, Nitin',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'nkhose@deloitte.com'},
// { name: 'Koppaka, Durga Rohit Ramkumar',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/DurgaRohit, Koppaka.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'dkoppaka@deloitte.com'},
// { name: 'Kshatriya, Ashish',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'akshatriya@deloitte.com'},
// { name: 'Kulkarni, Kaivalya',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kaikulkarni@deloitte.com'},

// { name: 'Kulkarni, Priyank',position: 'Senior Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'priykulkarni@deloitte.com'},
// { name: 'Kulkarni, Vedant',position: 'Senior Associate', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'vedakulkarni@deloitte.com'},
// { name: 'Kumaar, Manoj',position: 'Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'mkumaar@deloitte.com'},
// { name: 'Kumar, Dipak',position: 'Associate Director', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'dipakumar@deloitte.com'},
// { name: 'Kumar, Rahul',position: 'Consultant', skills: ['SAP Fiori/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rkumar42@deloitte.com'},
// { name: 'Kumari, Anjali',position: 'Analyst', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'ankumari@deloitte.com'},
// { name: 'Kunale, Kaushik',position: 'Analyst', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kkunale@deloitte.com'},
// { name: 'Lokhande, Dhanesh',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'dhlokhande@deloitte.com'},
// { name: 'Londhe, Leena',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'llondhe@deloitte.com'},
// { name: 'M, Boobalan',position: 'Analyst', skills: ['SAP CPI','SAP PI/PO' ], profilePicture: 'assets/images/Team_Profile/Boobalan M.png', location: 'Coimbatore', projects: [ 'AMS-STG (Staffit Allocation - Dec 2024)', 'ODP-Shell (Mulsoft To CPI Migration  - Firm Contribution)', 'ODP-Gold Medal (Shadow - Firm Contribution)' ], email:'boom1@deloitte.com'},
// { name: 'M, Gomathi',position: 'Associate Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'gomm@deloitte.com'},
// { name: 'Mahalingam, Sneha',position: 'Associate Analyst', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'snmahalingam@deloitte.com'},
// { name: 'Mane, Suraj',position: 'Analyst', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Neom' ],email:'sumane@deloitte.com'},
// { name: 'Manoharan, Rubika',position: 'Analyst', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'rumanoharan@deloitte.com'},
// { name: 'Mansukh, Rakesh',position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rmansukh@deloitte.com'},
// { name: 'Manthu, Vishnuvardhan Reddy',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'vmanthu@deloitte.com'},
// { name: 'Masal, Shreya',position: 'Analyst', skills: ['SAP BW HANA' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Neom' ],email:'smasal@deloitte.com'},
// { name: 'Mehta, Moxa',position: 'Consultant', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'momehta@deloitte.com'},
// { name: 'Mohammad, Fazullah',position: 'Associate Director', skills: ['SAP SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'fazmohammad@deloitte.com'},
// { name: 'Naseer, Mohammed',position: 'Senior Consultant', skills: ['Mulesoft' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'mnaseer@deloitte.com'},
// { name: 'Mohapatra, Saumendra',position: 'Associate Director', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'saumohapatra@deloitte.com'},
// { name: 'Mukherjee, Souparno',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'soupmukherjee@deloitte.com'},
// { name: 'Mule, Srihari',position: 'Associate Director', skills: ['SDM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'smule@deloitte.com'},
// { name: 'Naraharisetti, Srilatha',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'srilathan@deloitte.com'},
// { name: 'Narasimhappa, Pramodh',position: 'Manager', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'pnarasimhappa@deloitte.com'},

// { name: 'Noor, Shaik',position: 'Senior Consultant', skills: ['SAP CO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'shanoor@deloitte.com'},
// { name: 'Pachpande, Sheetal',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'spachpande@deloitte.com'},
// { name: 'Palani, Srinath',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'spalani@deloitte.com'},
// { name: 'Pandey, Kamlesh',position: 'Manager', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'kamlespandey@deloitte.com'},
// { name: 'Patil, Sanjay',position: 'Senior Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'sanjpatil@deloitte.com'},
// { name: 'Pawar, Rahul',position: 'Manager', skills: ['SAP Solman' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'rahpawar@deloitte.com'},
// { name: 'Pethe, Nilesh',position: 'Consultant', skills: ['SAP PP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'npethe@deloitte.com'},
// { name: 'Phadtare, Tanmay',position: 'Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tphadtare@deloitte.com'},
// { name: 'Phalebhai, Tejas',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'tphalebhai@deloitte.com'},
// { name: 'Pichamani, Pavithra',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'ppichamani@deloitte.com'},
// { name: 'Poddar, Pooja',position: 'Senior Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'popoddar@deloitte.com'},
// { name: 'Prabhu, Ganesh',position: 'Director', skills: ['SAP'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'gprabhu@deloitte.com'},
// { name: 'Prakash, Pallavi',position: 'Associate Director', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'palprakash@deloitte.com'},
// { name: 'R, Haritha',position: 'Associate Analyst', skills: ['SAP BTP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Neom' ],email:'harir@deloitte.com'},
// { name: 'Punjabi, Roshni',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ropunjabi@deloitte.com'},
// { name: 'R, Lavanya',position: 'Consultant', skills: ['SAP PMO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'lr22@deloitte.com'},
// { name: 'R, Padhmasri',position: 'Associate Analyst', skills: ['SAP BTP','SAP SD' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore ' , projects: [ 'Neom' ],email:'padr@deloitte.com'},
// { name: 'Rai, Vimal',position: 'Consultant', skills: ['SAP TM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'vimalrai@deloitte.com'},
// { name: 'Rajeshirke, Nitin',position: 'Consultant', skills: ['SAP Fiori/UI5' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nrajeshirke@deloitte.com'},
// { name: 'Ramesh, Deepaananya',position: 'Associate Analyst', skills: ['SAP CPI' ], profilePicture: 'assets/images/Team_Profile/Deepaananya Ramesh.png', location: 'Coimbatore ' , projects: [ 'Operate' ],email:'deramesh@deloitte.com'},
// { name: 'Ranapurwala, Mustafa',position: 'Consultant', skills: ['SAP EPPM/PS' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Ahmedabad' , projects: [ 'Operate' ],email:'mranapurwala@deloitte.com'},
// { name: 'Rane, Smita',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'smrane@deloitte.com'},
// { name: 'Ranjan Ray, Soumya',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'sranjanray@deloitte.com'},
// { name: 'Rao, Nitish',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'nitrao@deloitte.com'},
// // { name: 'Ravindran, Praveen',position: 'Senior Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:''},
// { name: 'Reddy, Cheppala',position: 'Consultant', skills:['SAP FSCM'], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'chepreddy@deloitte.com'},
// { name:'Nedium, Lokanadha',position: 'Senior Consultant', skills: ['SAP FICO'], profilePicture: 'assets/images/Team_Profile/Profile black.png',   location: 'Bengaluru' , projects: [ 'Operate' ],email:'lnedium@deloitte.com'}, 
// { name: 'RS, Dwarakesh',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'dwrs@deloitte.com'},
// { name: 'S, Deepakkumar',position: 'Associate Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'VKL','Alembic' ],email:'deepas@deloitte.com'},
// { name: 'Sah, Rahul',position: 'Consultant', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'rasah@deloitte.com'},
// { name: 'Sahoo, Baidyanath',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'basahoo@deloitte.com'},
// { name: 'Sarkar, Abhishek',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Team_Profile/Abhishek Sarkar.png', location: 'Kolkata' , projects: [ 'Operate' ],email:'abhisheksarkar@deloitte.com'},
// { name: 'Sarvankar, Mahesh',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'msarvankar@deloitte.com'},
// { name: 'Satyanarayana, Deepak',position: 'Associate Director', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'dsatyanarayana@deloitte.com'},
// { name: 'Sawant, Sanika',position: 'Analyst', skills: ['Serialization' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'sanisawant@deloitte.com'},
// { name: 'Sawant, Amey',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'amesawant@deloitte.com'},
// { name: 'Sawant, Sayali',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'ssawant@deloitte.com'},
// { name: 'Sawant, Swapna',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'swsawant@deloitte.com'},
// { name: 'Saxena, Sujay',position: 'Associate Director', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'sujasaxena@deloitte.com'},
// { name: 'Sekhar Deo, Priyanka',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Priyanka Sekhar Deo.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'psekhardeo@deloitte.com'},
// { name: 'Selvaraj, Chandraleka',position: 'Analyst', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Coimbatore' , projects: [ 'Operate' ],email:'cselvaraj@deloitte.com'},
// { name: 'Shaik, Saleem Javed',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'saleshaik@deloitte.com'},
// { name: 'Sharma, Abhishek',position: 'Senior Consultant', skills: ['Presales' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'abhissharma@deloitte.com'},
// { name: 'Sharma, Akshay',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Team_Profile/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'akshaysharma4@deloitte.com'},
// { name: 'Sharma, Roshan',position: 'Consultant', skills: ['SAP FICO' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'roshasharma@deloitte.com'},
// { name: 'Sharma, Prachi',position: 'Associate Analyst', skills: ['TBD' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Mankind' ],email:'psharma33@deloitte.com'},
// { name: 'Shetty, Jaya',position: 'Senior Consultant', skills: ['CSV' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'jashetty@deloitte.com'},
// { name: 'Shukla, Prakhar',position: 'Senior Consultant', skills: ['SAP EAM','SAP PM' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'prashukla@deloitte.com'},
// { name: 'Singh, Avinash',position: 'Consultant', skills: ['SAP SD' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'avinassingh@deloitte.com'},
// { name: 'Singh, Shivraj',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'shivrasingh@deloitte.com'},
// { name: 'Singh, Vinish',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'vinissingh@deloitte.com'},
// { name: 'Sivasubramaniam, Ruban Prasanth',position: 'Manager', skills: ['SAP PI/PO' ], profilePicture: 'assets/images/Profile black.png', location: 'Coimbatore CEC' , projects: [ 'Operate' ],email:'rsivasubramaniam@deloitte.com'},
// { name: 'Srivastva, Nil Kamal',position: 'Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'nsrivastva@deloitte.com'},
// { name: 'Suryawanshi, Kedar',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Pune' , projects: [ 'Operate' ],email:'kesuryawanshi@deloitte.com'},
// { name: 'Swain, Ratiranjan',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Bhubaneshwar' , projects: [ 'Operate' ],email:'ratswain@deloitte.com'},
// { name: 'T M, Chetan',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'ctm1@deloitte.com'},
// { name: 'Taneja, Yash',position: 'Associate Analyst', skills: ['TBD' ], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Operate' ],email:'ytaneja@deloitte.com'},
// { name: 'Thakur, Shikha',position: 'Senior Consultant', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'shikthakur@deloitte.com'},
// { name: 'Tirumalasetti, Ravi Teja',position: 'Senior Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'rtirumalasetti@deloitte.com'},
// { name: 'Tumuluri, Tejaswi',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'ttumuluri@deloitte.com'},
// { name: 'Umtol, Yogesh',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'yumtol@deloitte.com'},
// { name: 'V, Mounika',position: 'Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Profile black.png', location: 'Hyderabad' , projects: [ 'Operate' ],email:'mouv@deloitte.com'},
// { name: 'V, Sarita',position: 'Senior Consultant', skills: ['PMO' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sariv@deloitte.com'},
// { name: 'V, Sathish',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sathv@deloitte.com'},
// { name: 'Vaidya, Parag',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Profile black.png', location: 'Thane' , projects: [ 'Operate' ],email:'pavaidya@deloitte.com'},
// { name: 'Vanamala, Nikhil Dev',position: 'Consultant', skills: ['SAP MM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'nvanamala@deloitte.com'},
// { name: 'Verma, Yash',position: 'Senior Consultant', skills: ['SAP PI/PO' ], profilePicture: 'assets/images/Profile black.png', location: 'Chennai' , projects: [ 'Operate' ],email:'yverma@deloitte.com'},
// { name: 'Varma, Yogesh',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'yovarma@deloitte.com'},
// { name: 'Vijayanandh, Sethana',position: 'Manager', skills: ['SDM' ], profilePicture: 'assets/images/Profile black.png', location: 'Bengaluru' , projects: [ 'Operate' ],email:'sevijayanandh@deloitte.com'},
// { name: 'Wakde, Suprit',position: 'Manager', skills: ['SAP Ariba' ], profilePicture: 'assets/images/Profile black.png', location: 'Mumbai' , projects: [ 'Operate' ],email:'swakde@deloitte.com'},

// { name: 'Mudiam, Anusha',position: 'Consultant', skills: ['SAP PP','SAP QM'], profilePicture: 'assets/images/Anusha Mudiam.png', location: 'Hyderabad' , projects: [ 'STG' ],email:'amudiam@deloitte.com'},
// { name: 'Polishetti, Yeshwanth Kumar',position: 'Consultant', skills: ['SAP MM','SAP EWM' ], profilePicture: 'assets/images/Yeshwanth Polishetti.png', location: 'Hyderabad' , projects: [ 'STG' ],email:'ypolishetti@deloitte.com'},
// { name: 'Relekar, Shubham',position: 'Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Shubham Relekar.png', location: 'Pune' , projects: [ 'STG' ],email:'srelekar@deloitte.com'},
// { name: 'Banala, Hemanth Ram Kumar',position: 'Senior Consultant', skills: ['SAP Basis' ], profilePicture: 'assets/images/Hemanth Banala.png', location: 'Bengaluru' , projects: [ 'STG' ],email:'hbanala@deloitte.com'},
// { name: 'Lotlikar, Gautam',position: 'Senior Consultant', skills: ['SAP ABAP' ], profilePicture: 'assets/images/Gautam Lotlikar.png', location: 'Thane' , projects: [ 'Dadachanji Groups'],email:'galotlikar@deloitte.com'},
// { name: 'Mudholkar, Rajendrakumar', position: 'Senior Consultant', skills: ['SAP PP','SAP QM' ], profilePicture: 'assets/images/Team_Profile/Rajendrakumar Mudholkar.png', location: 'Pune' , projects: [ 'Tabreed', 'Privi', 'Gridco', 'Alembic', 'Nesco' ],email:'rmudholkar@deloitte.com'},
// { name: 'Pampana, Rajesh', position: 'Consultant', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Rajesh Pampana.png', location: 'Hyderabad' , projects: [ 'Tabreed' ],email:'rpampana@deloitte.com'},
// { name: 'Lakkanna, Krishna', position: 'Manager', skills: ['SDM', 'UX', 'Fiori'], profilePicture: 'assets/images/Team_Profile/Krishna Lakkanna.png', location: 'Bengaluru' , projects: [ 'V-Guard', 'Nesco', 'SBI MF', 'ABB' ],email:'klakkanna@deloitte.com'},
// { name: 'M, Sowmiya Harshini', position: 'Associate Analyst', skills: ['SAP ABAP'], profilePicture: 'assets/images/Team_Profile/Sowmiya Harshini M.png', location: 'Coimbatore' , projects: [ 'Dadachanji Groups', 'Privi' ],email:'sowm@deloitte.com'},
// { name: 'Kulshrestha, Anjali', position: 'Analyst', skills: ['SAP ABAP','Python', 'JavaScript', 'Postgres SQL','Node Js'], profilePicture: 'assets/images/Profile black.png', location: 'Delhi' , projects: [ 'Mankind Pharma' ],email:'ankulshrestha@deloitte.com'},
// ]




constructor(private http:HttpClient ){}



  async ngOnInit(): Promise<void> {
   await  this.getTeamData();
  }

  
private apiUrl = 'http://localhost:8080/estimation/teamprofile'; 
private teamMembers: TeamMember[] = [];
private x: TeamMember[] = [];

// getTeamData(): Observable<TeamMember[]> {
//   return this.http.get<any[]>(this.apiUrl).pipe(
//     map(data => {
//       this.teamMembers = this.convertToMemberDetails(data);
//       return this.teamMembers;
//     })
//   );
// }




  
async getTeamData(): Promise<any> {
  //await fetch(this.apiUrl)
   this.x = await fetch(this.apiUrl).then(async data => {
    return await data.json()
  }).then(async response=> {
    this.teamMembers = this.convertToMemberDetails(response);
    // console.log((this.teamMembers))
    return this.teamMembers;

  })

  return this.x;
  // .then(data =>{
  //   console.log('thanos' + JSON.stringify(data.json()))
  //   return data.json()
  // }).then(data => {
  //    this.teamMembers = this.convertToMemberDetails(data);
  //    return this.teamMembers;

  // })
}




private convertToMemberDetails(data: any[]): TeamMember[] {
  return data.map(item => ({
    email: item.email,
    name: item.name,
    position: item.position,
    location: item.location,
    profilePicture: item.profilePicture,
    skills: item.skill.map((skill: { skill: string; }) => skill.skill),
    projects: item.project.map((project: { project: string; }) => project.project)
  }));
}

getStoredTeamData(): TeamMember[] {
  return this.x;
}

 
}










//Member details in the postman//ee

[
  {
      "email": "arphadnis@deloitte.com",
      "name": "Phadnis, Aryamaan",
      "position": "Associate Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Aryamaan Phadnis.png",
      "skills": [
          "SAP BTP",
          "Springboot",
          "Angular",
          "Javascript"
      ],
      "projects": [
          "Operate Assets And Innovation"
      ]
  },
  {
      "email": "vanagarajan@deloitte.com",
      "name": "Nagarajan, Vaidheeswaran",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Vaidheeswaran Nagarajan.png",
      "skills": [
          "ServiceNow",
          "Azure DevOps",
          "SAP",
          "JIRA (Agile, Scrum, Kanban)"
      ],
      "projects": [
          "OperateSync"
      ]
  },
  {
      "email": "ebirwadkar@deloitte.com",
      "name": "Birwadkar, Esha",
      "position": "Associate Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Esha Birwadkar.png",
      "skills": [
          "AWS Cloud",
          "Javascript",
          "CSS",
          "Springboot"
      ],
      "projects": [
          "Operate Assets And Innovation"
      ]
  },
  {
      "email": "nborade@deloitte.com",
      "name": "Borade, Nikhil",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Nikhil Borade.png",
      "skills": [
          "SAP MM",
          " SAP SD",
          "SAP MM ECC"
      ],
      "projects": [
          "STG",
          "Dadachanji Groups",
          "Gridco"
      ]
  },
  {
      "email": "akshaysharma4@deloitte.com",
      "name": "Sharma, Akshay",
      "position": "Senior Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "roshasharma@deloitte.com",
      "name": "Sharma, Roshan",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "psharma33@deloitte.com",
      "name": "Sharma, Prachi",
      "position": "Associate Analyst",
      "location": "Delhi",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "TBD"
      ],
      "projects": [
          "Mankind"
      ]
  },
  {
      "email": "jashetty@deloitte.com",
      "name": "Shetty, Jaya",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "CSV"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "prashukla@deloitte.com",
      "name": "Shukla, Prakhar",
      "position": "Senior Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP EAM",
          "SAP PM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "avinassingh@deloitte.com",
      "name": "Singh, Avinash",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "shivrasingh@deloitte.com",
      "name": "Singh, Shivraj",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "vinissingh@deloitte.com",
      "name": "Singh, Vinish",
      "position": "Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rsivasubramaniam@deloitte.com",
      "name": "Sivasubramaniam, Ruban Prasanth",
      "position": "Manager",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP PI/PO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nsrivastva@deloitte.com",
      "name": "Srivastva, Nil Kamal",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kesuryawanshi@deloitte.com",
      "name": "Suryawanshi, Kedar",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ratswain@deloitte.com",
      "name": "Swain, Ratiranjan",
      "position": "Senior Consultant",
      "location": "Bhubaneshwar",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ctm1@deloitte.com",
      "name": "T M, Chetan",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ytaneja@deloitte.com",
      "name": "Taneja, Yash",
      "position": "Associate Analyst",
      "location": "Delhi",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "TBD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "shikthakur@deloitte.com",
      "name": "Thakur, Shikha",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rtirumalasetti@deloitte.com",
      "name": "Tirumalasetti, Ravi Teja",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ttumuluri@deloitte.com",
      "name": "Tumuluri, Tejaswi",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "yumtol@deloitte.com",
      "name": "Umtol, Yogesh",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mouv@deloitte.com",
      "name": "V, Mounika",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sariv@deloitte.com",
      "name": "V, Sarita",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "PMO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sathv@deloitte.com",
      "name": "V, Sathish",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "pavaidya@deloitte.com",
      "name": "Vaidya, Parag",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nvanamala@deloitte.com",
      "name": "Vanamala, Nikhil Dev",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "yverma@deloitte.com",
      "name": "Verma, Yash",
      "position": "Senior Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP PI/PO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "yovarma@deloitte.com",
      "name": "Varma, Yogesh",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sevijayanandh@deloitte.com",
      "name": "Vijayanandh, Sethana",
      "position": "Manager",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "swakde@deloitte.com",
      "name": "Wakde, Suprit",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "amudiam@deloitte.com",
      "name": "Mudiam, Anusha",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Anusha Mudiam.png",
      "skills": [
          "SAP PP",
          "SAP QM"
      ],
      "projects": [
          "STG"
      ]
  },
  {
      "email": "ypolishetti@deloitte.com",
      "name": "Polishetti, Yeshwanth Kumar",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Yeshwanth Polishetti.png",
      "skills": [
          "SAP EWM",
          "SAP MM"
      ],
      "projects": [
          "STG"
      ]
  },
  {
      "email": "srelekar@deloitte.com",
      "name": "Relekar, Shubham",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Shubham Relekar.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "STG"
      ]
  },
  {
      "email": "hbanala@deloitte.com",
      "name": "Banala, Hemanth Ram Kumar",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Hemanth Banala.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "STG"
      ]
  },
  {
      "email": "galotlikar@deloitte.com",
      "name": "Lotlikar, Gautam",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Gautam Lotlikar.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Dadachanji Groups"
      ]
  },
  {
      "email": "rmudholkar@deloitte.com",
      "name": "Mudholkar, Rajendrakumar",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Rajendrakumar Mudholkar.png",
      "skills": [
          "SAP QM",
          "SAP PP"
      ],
      "projects": [
          "Tabreed",
          "Nesco",
          "Privi",
          "Alembic",
          "Gridco"
      ]
  },
  {
      "email": "rpampana@deloitte.com",
      "name": "Pampana, Rajesh",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Rajesh Pampana.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Tabreed"
      ]
  },
  {
      "email": "klakkanna@deloitte.com",
      "name": "Lakkanna, Krishna",
      "position": "Manager",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Krishna Lakkanna.png",
      "skills": [
          "SDM",
          "UX",
          "Fiori"
      ],
      "projects": [
          "V-Guard",
          "ABB",
          "Nesco",
          "SBI MF"
      ]
  },
  {
      "email": "sowm@deloitte.com",
      "name": "M, Sowmiya Harshini",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Sowmiya Harshini M.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Dadachanji Groups",
          "Privi"
      ]
  },
  {
      "email": "ankulshrestha@deloitte.com",
      "name": "Kulshrestha, Anjali",
      "position": "Analyst",
      "location": "Delhi",
      "profilePicture": "assets/images/Profile black.png",
      "skills": [
          "Python",
          "SAP ABAP",
          "Postgres SQL",
          "Node Js",
          "JavaScript"
      ],
      "projects": [
          "Mankind Pharma"
      ]
  },
  {
      "email": "ssubbaraman@deloitte.com",
      "name": "Subbaraman, Sundararamaprasad",
      "position": "Associate Director",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Sundar Subbaraman.png",
      "skills": [
          "SAP CPI"
      ],
      "projects": [
          "Operate Assets And Innovation",
          "Operate",
          "OperateSync"
      ]
  },
  {
      "email": "pranganath@deloitte.com",
      "name": "Ranganath, Prashanth",
      "position": "Manager",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Javascript",
          "HTML",
          "CSS",
          "Angular"
      ],
      "projects": [
          "OperateSync",
          "Operate",
          "OperateEdge"
      ]
  },
  {
      "email": "araul@deloitte.com",
      "name": "Raul, Aniket",
      "position": "Associate Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Aniket Raul.png",
      "skills": [
          "Angular",
          "Javascript",
          "SAP MM (Basics)",
          "CSS",
          "HTML"
      ],
      "projects": [
          "Operate Assets And Innovation"
      ]
  },
  {
      "email": "visha@deloitte.com",
      "name": "A, Vishal",
      "position": "Associate Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "CSS",
          "SAP iRPA",
          "SAP MM (Basics)",
          "SAP CPI",
          "HTML",
          "SAP ABAP"
      ],
      "projects": [
          "Operate Assets And Innovation"
      ]
  },
  {
      "email": "sarn@deloitte.com",
      "name": "N, Sarran",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "HTML",
          "CSS",
          "Angular",
          "Javascript"
      ],
      "projects": [
          "Operate",
          "OperateEdge",
          "OperateSync"
      ]
  },
  {
      "email": "meghm@deloitte.com",
      "name": "M, Megha",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Javascript",
          "HTML",
          "CSS",
          "Angular"
      ],
      "projects": [
          "Operate",
          "OperateEdge",
          "OperateSync"
      ]
  },
  {
      "email": "mahd@deloitte.com",
      "name": "D, Mahisha",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Javascript",
          "HTML",
          "CSS",
          "Angular"
      ],
      "projects": [
          "Operate",
          "OperateEdge",
          "OperateSync"
      ]
  },
  {
      "email": "lav@deloitte.com",
      "name": "V, Lakshana",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "HTML",
          "SAP BTP",
          "CSS",
          "Javascript",
          "Jira E2E"
      ],
      "projects": [
          "Operate",
          "OperateEdge",
          "OperateSync"
      ]
  },
  {
      "email": "subak@deloitte.com",
      "name": "K, Subhash",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Javascript",
          "Jira E2E",
          "SAP BTP",
          "CSS",
          "HTML"
      ],
      "projects": [
          "OperateEdge",
          "Operate",
          "OperateSync"
      ]
  },
  {
      "email": "mcv@deloitte.com",
      "name": "CV, Manimithra",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Javascript",
          "Jira E2E",
          "CSS",
          "HTML",
          "SAP BTP"
      ],
      "projects": [
          "OperateEdge",
          "OperateSync",
          "Operate"
      ]
  },
  {
      "email": "dinmathew@deloitte.com",
      "name": "Mathew, Dinu",
      "position": "Senior Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "VKL"
      ]
  },
  {
      "email": "vredij@deloitte.com",
      "name": "Redij, Varsha",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "VKL"
      ]
  },
  {
      "email": "blele@deloitte.com",
      "name": "Lele, Bharat",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "VKL"
      ]
  },
  {
      "email": "dhbafna@deloitte.com",
      "name": "Bafna, Dharamraj",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "SKPL"
      ]
  },
  {
      "email": "prghonmode@deloitte.com",
      "name": "Ghonmode, Pratik",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Pratik Ghonmode.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "SBI MF",
          "Operate (GOLIL, GOMEL, GAP)",
          "V-Guard",
          "Nesco"
      ]
  },
  {
      "email": "dursharma@deloitte.com",
      "name": "Sharma, Durgaprasad",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP",
          "PMO"
      ],
      "projects": [
          "Mankind",
          "Tabreed"
      ]
  },
  {
      "email": "regore@deloitte.com",
      "name": "Gore, Reshma",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Reshma Gore.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Nesco",
          "V-Guard",
          "VKL",
          "Mankind"
      ]
  },
  {
      "email": "pudawant@deloitte.com",
      "name": "Udawant, Pallavi",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Pallavi Udawant.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "VKL",
          "Mankind"
      ]
  },
  {
      "email": "psingh24@deloitte.com",
      "name": "Singh, Pranav",
      "position": "Analyst",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Pranav Singh.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "V-Guard",
          "Nesco",
          "Operate (GOLIL, GOMEL, GAP)",
          "SBI MF"
      ]
  },
  {
      "email": "srdinesh@deloitte.com",
      "name": "Dinesh, Sreya",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Sreya Dinesh.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Nesco",
          "V-Guard",
          "SBI MF",
          "Operate (GOLIL, GOMEL, GAP)"
      ]
  },
  {
      "email": "skhairnar@deloitte.com",
      "name": "Khairnar, Sagar",
      "position": "Analyst",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PP",
          "SAP WM/EWM"
      ],
      "projects": [
          "Sovereign Pharma",
          "Alembic"
      ]
  },
  {
      "email": "aschaudhari@deloitte.com",
      "name": "Choudhary, Ashish",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Ashish Choudhary.png",
      "skills": [
          "SAP HANA",
          "SAP Basis"
      ],
      "projects": [
          "Operate (GOLIL, GOMEL, GAP)",
          "Nesco",
          "Manildra",
          "V-Guard"
      ]
  },
  {
      "email": "jkhairnar@deloitte.com",
      "name": "Khairnar, Jayesh",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Jayesh Khairnar.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Nesco",
          "Operate (GOLIL, GOMEL, GAP)",
          "V-Guard"
      ]
  },
  {
      "email": "ragm@deloitte.com",
      "name": "M, Ragul Sangeeth",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Ragul Sangeeth M.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "VKL",
          "Alembic",
          "Tabreed"
      ]
  },
  {
      "email": "anutiwari@deloitte.com",
      "name": "Tiwari, Anuranjani",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Anuranjani Tiwari.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "V-Guard",
          "Nesco",
          "SBI",
          "Operate (GOLIL, GOMEL, GAP)"
      ]
  },
  {
      "email": "gsugandhi@deloitte.com",
      "name": "Sugandhi, Gaurang",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Nesco",
          "Operate (GOLIL, GOMEL, GAP)",
          "V-Guard"
      ]
  },
  {
      "email": "jshukla@deloitte.com",
      "name": "Shukla, Jay",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Jay Shukla.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "VKL",
          "Tabreed"
      ]
  },
  {
      "email": "viaikara@deloitte.com",
      "name": "Aikara, Vipin",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Vipin Aikara.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Tabreed",
          "VKL",
          "V-Guard"
      ]
  },
  {
      "email": "shubkulkarni@deloitte.com",
      "name": "Kulkarni, Shubham",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PS",
          "SAP EPPM"
      ],
      "projects": [
          "Privi",
          "Tabreed",
          "V-Guard",
          "JK Paper",
          "Nesco"
      ]
  },
  {
      "email": "kirm@deloitte.com",
      "name": "M, Kiran Kumar",
      "position": "Analyst",
      "location": "Hydrabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "VACHARI@DELOITTE.COM",
      "name": "Achari, Vinod",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "cadduri@deloitte.com",
      "name": "Adduri, Chiranjeevi",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sanjagarwal@deloitte.com",
      "name": "Agarwal, Sanjay",
      "position": "Manager",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Presales"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ezahmed@deloitte.com",
      "name": "Ahmed, Ezass",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "jafahmed@deloitte.com",
      "name": "Ahmed, Jaffar",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "jjyothyamara@deloitte.com",
      "name": "Amara, Jyothy",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Jyothy  Amara.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "visanand@deloitte.com",
      "name": "Anand, Vishal",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FIORI/UI5"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ppradeepkumarbr@deloitte.com",
      "name": "B R, Pradeep Kumar",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "pbabu@deloitte.com",
      "name": "Babu, Poornima",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SAC"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "tbajaninti@deloitte.com",
      "name": "Bajaninti, Thejkumar",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "srivbalaji@deloitte.com",
      "name": "Balaji, Srivarshini",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rajeshbaliga@deloitte.com",
      "name": "Baliga, Rajesh",
      "position": "Partner",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sballari@deloitte.com",
      "name": "Ballari, Sushmita",
      "position": "Analyst",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rbenade@deloitte.com",
      "name": "Benade, Rakshita",
      "position": " Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "pbendre@deloitte.com",
      "name": "Bendre, Pinac",
      "position": "Associate Director",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "tbendre@deloitte.com",
      "name": "Bendre, Tejal",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "prabhagwat@deloitte.com",
      "name": "Bhagwat, Pratik",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nbhalekar@deloitte.com",
      "name": "Bhalekar, Niharika",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "tubhandari@deloitte.com",
      "name": "Bhandari, Tushar",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sbose2@deloitte.com",
      "name": "Bose, Soumo",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP EAM/PM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nchak@deloitte.com",
      "name": "Chak, Nikita",
      "position": "Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BW HANA"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "machalla@deloitte.com",
      "name": "Challa, Mahesh",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP CPI"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mchandrasekar@deloitte.com",
      "name": "Chandrasekar, Mano Prabu",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP",
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "shanchaudhari@deloitte.com",
      "name": "Chaudhari, Shantanu",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ychaudhari@deloitte.com",
      "name": "Chaudhari, Yogesh",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Yogesh Chaudhari.png",
      "skills": [
          "SAP PP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rahuchauhan@deloitte.com",
      "name": "Chauhan, Rahul",
      "position": "Manager",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BTP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "maychavan@deloitte.com",
      "name": "Chavan, Mayuresh",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "virchavan@deloitte.com",
      "name": "Chavan, Viraj",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rd1@deloitte.com",
      "name": "D, Ramesh",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "manadash@deloitte.com",
      "name": "Dash, Manasa",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP  GTS"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mdhanakoti@deloitte.com",
      "name": "Dhanakoti, Manikandan",
      "position": "Associate Director",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BW HANA"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sdhole@deloitte.com",
      "name": "Dhole, Shrikant",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sagdhumal@deloitte.com",
      "name": "Dhumal, Sagar",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rdongare@deloitte.com",
      "name": "Dongare, Rohit",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Rohit Dongare.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Gridco",
          "STG",
          "Dadachanji Groups"
      ]
  },
  {
      "email": "madoss@deloitte.com",
      "name": "Doss, Mahimai",
      "position": "Associate Director",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "andwivedi@deloitte.com",
      "name": "Dwivedi, Anant",
      "position": "Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP CO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kag@deloitte.com",
      "name": "G, Karthik",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "vgadigi@deloitte.com",
      "name": "Gadigi, Veerendra",
      "position": "Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "bganu@deloitte.com",
      "name": "Ganu, Bhushan",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "fgarg@deloitte.com",
      "name": "Garg, Falguni",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "bhgentela@deloitte.com",
      "name": "Gentela, Bharath",
      "position": "Director",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kagopalakrishnan@deloitte.com",
      "name": "Gopalakrishnan, Kavitha",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SAC"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "bhavg@deloitte.com",
      "name": "G, Bhavani",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rgovindbaksh@deloitte.com",
      "name": "Govindbaksh, Ramu",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "arungu@deloitte.com",
      "name": "Gupta, Arun",
      "position": "Manager",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "karharshavardhan@deloitte.com",
      "name": "Harshavardhan, Karra",
      "position": "Analyst",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "shingave@deloitte.com",
      "name": "Hingave, Subodh",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Subodh Hingave.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "syikram@deloitte.com",
      "name": "Ikram, Syed",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ajain25@deloitte.com",
      "name": "Jain, Abhishek",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "amojaiswal@deloitte.com",
      "name": "Jaiswal, Amol",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sjaitiya@deloitte.com",
      "name": "Jaitiya, Sudesh",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rjeniferamalraj@deloitte.com",
      "name": "Jenifer Amalraj, Rebecca",
      "position": " Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Rebecca Jenifer.png",
      "skills": [
          " DMS",
          "SAP SD",
          "GTS"
      ],
      "projects": [
          "Privi",
          "STG"
      ]
  },
  {
      "email": "ajujhavarapu@deloitte.com",
      "name": "Jujhavarapu, Ananda Kumar",
      "position": "Senior Analyst",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rkh1@deloitte.com",
      "name": "K H, Rassmi",
      "position": "Associate Analyst",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BTP"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "ckn@deloitte.com",
      "name": "K N, Chaithra",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ramk@deloitte.com",
      "name": "K, Ramakanth",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/amakanth Kalal.png",
      "skills": [
          "SAP PP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nkadam@deloitte.com",
      "name": "Kadam, Nikhil",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "skaitikwar@deloitte.com",
      "name": "Kaitikwar, Sanket",
      "position": "Senior Analyst",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "jikamble@deloitte.com",
      "name": "Kamble, Jidnyasu",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mkareru@deloitte.com",
      "name": "Kareru, Manjunath",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "skaware@deloitte.com",
      "name": "Kaware, Swapnil",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nkhose@deloitte.com",
      "name": "Khose, Nitin",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "dkoppaka@deloitte.com",
      "name": "Koppaka, Durga Rohit Ramkumar",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/DurgaRohit Koppaka.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "akshatriya@deloitte.com",
      "name": "Kshatriya, Ashish",
      "position": "Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kaikulkarni@deloitte.com",
      "name": "Kulkarni, Kaivalya",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "priykulkarni@deloitte.com",
      "name": "Kulkarni, Priyank",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "vedakulkarni@deloitte.com",
      "name": "Kulkarni, Vedant",
      "position": "Senior Associate",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mkumaar@deloitte.com",
      "name": "Kumaar, Manoj",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP TM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "dipakumar@deloitte.com",
      "name": "Kumar, Dipak",
      "position": "Associate Director",
      "location": "Kolkata",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rkumar42@deloitte.com",
      "name": "Kumar, Rahul",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Fiori/UI5"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ankumari@deloitte.com",
      "name": "Kumari, Anjali",
      "position": "Analyst",
      "location": "Kolkata",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP TM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kkunale@deloitte.com",
      "name": "Kunale, Kaushik",
      "position": "Analyst",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BW HANA"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "dhlokhande@deloitte.com",
      "name": "Lokhande, Dhanesh",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "llondhe@deloitte.com",
      "name": "Londhe, Leena",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "boom1@deloitte.com",
      "name": "M, Boobalan",
      "position": "Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Boobalan M.png",
      "skills": [
          "SAP CPI",
          "SAP PI/PO"
      ],
      "projects": [
          "AMS-STG (Staffit Allocation - Dec 2024)",
          "ODP-Shell (Mulsoft To CPI Migration  - Firm Contribution)",
          "ODP-Gold Medal (Shadow - Firm Contribution)"
      ]
  },
  {
      "email": "gomm@deloitte.com",
      "name": "M, Gomathi",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "snmahalingam@deloitte.com",
      "name": "Mahalingam, Sneha",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP CPI"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "sumane@deloitte.com",
      "name": "Mane, Suraj",
      "position": "Analyst",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Ariba"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "rumanoharan@deloitte.com",
      "name": "Manoharan, Rubika",
      "position": "Analyst",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rmansukh@deloitte.com",
      "name": "Mansukh, Rakesh",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "vmanthu@deloitte.com",
      "name": "Manthu, Vishnuvardhan Reddy",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "smasal@deloitte.com",
      "name": "Masal, Shreya",
      "position": "Analyst",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BW HANA"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "momehta@deloitte.com",
      "name": "Mehta, Moxa",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP CPI"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "fazmohammad@deloitte.com",
      "name": "Mohammad, Fazullah",
      "position": "Associate Director",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mnaseer@deloitte.com",
      "name": "Naseer, Mohammed",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Mulesoft"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "saumohapatra@deloitte.com",
      "name": "Mohapatra, Saumendra",
      "position": "Associate Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "soupmukherjee@deloitte.com",
      "name": "Mukherjee, Souparno",
      "position": "Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "smule@deloitte.com",
      "name": "Mule, Srihari",
      "position": "Associate Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "srilathan@deloitte.com",
      "name": "Naraharisetti, Srilatha",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "pnarasimhappa@deloitte.com",
      "name": "Narasimhappa, Pramodh",
      "position": "Manager",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "shanoor@deloitte.com",
      "name": "Noor, Shaik",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP CO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "spachpande@deloitte.com",
      "name": "Pachpande, Sheetal",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "spalani@deloitte.com",
      "name": "Palani, Srinath",
      "position": "Senior Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "kamlespandey@deloitte.com",
      "name": "Pandey, Kamlesh",
      "position": "Manager",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sanjpatil@deloitte.com",
      "name": "Patil, Sanjay",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "rahpawar@deloitte.com",
      "name": "Pawar, Rahul",
      "position": "Manager",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Solman"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "npethe@deloitte.com",
      "name": "Pethe, Nilesh",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "tphadtare@deloitte.com",
      "name": "Phadtare, Tanmay",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "tphalebhai@deloitte.com",
      "name": "Phalebhai, Tejas",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ppichamani@deloitte.com",
      "name": "Pichamani, Pavithra",
      "position": "Senior Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "popoddar@deloitte.com",
      "name": "Poddar, Pooja",
      "position": "Senior Consultant",
      "location": "Pune",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP TM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "gprabhu@deloitte.com",
      "name": "Prabhu, Ganesh",
      "position": "Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "palprakash@deloitte.com",
      "name": "Prakash, Pallavi",
      "position": "Associate Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "harir@deloitte.com",
      "name": "R, Haritha",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP BTP"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "ropunjabi@deloitte.com",
      "name": "Punjabi, Roshni",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "lr22@deloitte.com",
      "name": "R, Lavanya",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP PMO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "padr@deloitte.com",
      "name": "R, Padhmasri",
      "position": "Associate Analyst",
      "location": "Coimbatore ",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP SD",
          "SAP BTP"
      ],
      "projects": [
          "Neom"
      ]
  },
  {
      "email": "vimalrai@deloitte.com",
      "name": "Rai, Vimal",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP TM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nrajeshirke@deloitte.com",
      "name": "Rajeshirke, Nitin",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Fiori/UI5"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "deramesh@deloitte.com",
      "name": "Ramesh, Deepaananya",
      "position": "Associate Analyst",
      "location": "Coimbatore ",
      "profilePicture": "assets/images/Team_Profile/Deepaananya Ramesh.png",
      "skills": [
          "SAP CPI"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "mranapurwala@deloitte.com",
      "name": "Ranapurwala, Mustafa",
      "position": "Consultant",
      "location": "Ahmedabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP EPPM/PS"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "smrane@deloitte.com",
      "name": "Rane, Smita",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sranjanray@deloitte.com",
      "name": "Ranjan Ray, Soumya",
      "position": "Consultant",
      "location": "Bhubaneshwar",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "nitrao@deloitte.com",
      "name": "Rao, Nitish",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "chepreddy@deloitte.com",
      "name": "Reddy, Cheppala",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FSCM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "lnedium@deloitte.com",
      "name": "Nedium, Lokanadha",
      "position": "Senior Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "dwrs@deloitte.com",
      "name": "RS, Dwarakesh",
      "position": "Senior Consultant",
      "location": "Chennai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "deepas@deloitte.com",
      "name": "S, Deepakkumar",
      "position": "Associate Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "VKL",
          "Alembic"
      ]
  },
  {
      "email": "rasah@deloitte.com",
      "name": "Sah, Rahul",
      "position": "Consultant",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Presales"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "basahoo@deloitte.com",
      "name": "Sahoo, Baidyanath",
      "position": "Consultant",
      "location": "Bhubaneshwar",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "abhisheksarkar@deloitte.com",
      "name": "Sarkar, Abhishek",
      "position": "Manager",
      "location": "Kolkata",
      "profilePicture": "assets/images/Team_Profile/Abhishek Sarkar.png",
      "skills": [
          "SDM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "msarvankar@deloitte.com",
      "name": "Sarvankar, Mahesh",
      "position": "Senior Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "dsatyanarayana@deloitte.com",
      "name": "Satyanarayana, Deepak",
      "position": "Associate Director",
      "location": "Bengaluru",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Presales"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sanisawant@deloitte.com",
      "name": "Sawant, Sanika",
      "position": "Analyst",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Serialization"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "amesawant@deloitte.com",
      "name": "Sawant, Amey",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "ssawant@deloitte.com",
      "name": "Sawant, Sayali",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP FICO"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "swsawant@deloitte.com",
      "name": "Sawant, Swapna",
      "position": "Consultant",
      "location": "Mumbai",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP MM"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "sujasaxena@deloitte.com",
      "name": "Saxena, Sujay",
      "position": "Associate Director",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Presales"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "psekhardeo@deloitte.com",
      "name": "Sekhar Deo, Priyanka",
      "position": "Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Priyanka Sekhar Deo.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "cselvaraj@deloitte.com",
      "name": "Selvaraj, Chandraleka",
      "position": "Analyst",
      "location": "Coimbatore",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP ABAP"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "saleshaik@deloitte.com",
      "name": "Shaik, Saleem Javed",
      "position": "Senior Consultant",
      "location": "Hyderabad",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "SAP Basis"
      ],
      "projects": [
          "Operate"
      ]
  },
  {
      "email": "abhissharma@deloitte.com",
      "name": "Sharma, Abhishek",
      "position": "Senior Consultant",
      "location": "Delhi",
      "profilePicture": "assets/images/Team_Profile/Profile black.png",
      "skills": [
          "Presales"
      ],
      "projects": [
          "Operate"
      ]
  }
]