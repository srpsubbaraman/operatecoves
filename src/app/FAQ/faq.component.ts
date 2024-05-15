import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

    constructor(private router: Router) {}
    loading: boolean = true; 
    async ngOnInit(){
        console.log("Login: "+localStorage.getItem('login_info'));
         
          if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
            //await this.router.navigate(['/OperateSync']);
            console.log("in there!")
           
          }
          else{
             localStorage.setItem('login_info',"{}");
             await this.router.navigate(['/Login']);
             
          }
          setTimeout(() => {
      
            this.loading = false; // Set loading to false to hide the loader
          }, 2000);
      }


  faqs = [{
      questions: 'What is the TechEstimaze Estimation Portal?',
      ans: 'The TechEstimaze Estimation Portal is a software tool designed to help accurately estimate the amount of time (in hours) required to complete different software development tasks. It categorizes tasks into complexity levels and provides a standardized framework for estimation.',
      showAnswer: false
    },
        // Add more FAQs if needed
   
 
      {
            questions: 'How does the portal categorize tasks?',
            ans: 'Tasks are categorized into four complexity levels: Very High, High, Medium, and Low. This classification helps provide a clear understanding of the effort required for each type of task.',
        },
        {
            questions: 'How does the portal measure effort?',
            ans: 'Effort is measured in hours. This allows for a granular view of the resource requirements for each task, ensuring accurate planning and allocation.',
        },
        {
            questions: 'Can I customize estimation templates for specific project types?',
            ans: 'Yes, the portal allows you to create and save custom estimation templates. This feature enables you to tailor estimations to specific project types or technologies.',
        },
        {
            questions: 'Is there a collaborative estimation feature?',
            ans: 'Yes, the portal supports collaborative estimations. Teams can work together to provide more accurate estimations by leveraging collective knowledge and expertise.',
        },
        {
            questions: 'Can I integrate the portal with other project management tools?',
            ans: 'Absolutely. The portal can be seamlessly integrated with popular project management tools like Jira, ADO, Trello, and others. This ensures smooth task assignment and tracking.',
        },
        {
            questions: 'How does the portal use historical data for estimations?',
            ans: 'The portal leverages historical data to refine estimations over time. By analyzing past project performance, the system becomes more accurate in predicting future effort requirements.',
        },
        {
            questions: 'Can I track actual vs. estimated efforts?',
            ans: 'Yes, the portal provides reporting and analytics features that allow you to track actual effort expended versus the initially estimated effort. This helps in identifying trends and improving future estimations.',
        },
        {
            questions: 'What benefits can we expect from using the Effort Estimation Portal?',
            ans: 'Using the portal will lead to improved project planning, enhanced resource allocation, reduced project risks, increased transparency, and continuous improvement in estimation practices.',
        },
        {
            questions: 'How can I get started with the Effort Estimation Portal?',
            ans: 'To get started, please reach out to the designated contact person for onboarding and training. They will guide you through the setup process and provide any necessary training or resources to ensure a smooth transition to using the portal.',
        },
        //////
        {
            questions: 'How does the portal handle changes in project scope or requirements?',
            ans: 'The portal allows for easy adjustment of estimations in response to changes in project scope or requirements. You can update the complexity level and effort estimates accordingly to reflect the new information.',
        },
        {
            questions: 'Can I use the portal for different types of development projects (e.g., SAP, Oracle, web, mobile, backend)?',
            ans: 'Yes, the portal is versatile and can be used for a wide range of development projects, including web, mobile, backend, and more. You can customize estimation templates to suit different project types.',
        },
        {
            questions: 'Is training provided for using the Effort Estimation Portal?',
            ans: 'Yes, training resources and support will be provided to ensure that all users are comfortable with the portal\'s features and functionalities. This may include tutorials, documentation, and live training sessions.',
        },
        {
            questions: 'How secure is the portal in terms of data privacy and confidentiality?',
            ans: 'The portal adheres to strict security measures to protect your data. It employs encryption protocols, access controls, and follows industry best practices to ensure the confidentiality and integrity of clients information.',
        },
        {
            questions: 'Can I export estimation data from the portal for reporting or analysis purposes?',
            ans: 'Yes, the portal offers export functionality, allowing you to extract estimation data for further reporting or analysis.',
        },
        {
            questions: 'What happens if I encounter technical issues or need support while using the portal?',
            ans: 'In case of technical issues or any need for support, you can reach out to our dedicated support team. They will be available to assist you and address any concerns promptly.',
        },
        {
            questions: 'Can I track the progress of tasks after they have been estimated?',
            ans: 'Yes, once tasks have been estimated, they can be tracked using the integrated project management tools. You\'ll be able to monitor progress, update estimates if necessary, and ensure tasks are on schedule.',
        },
        {
            questions: 'Is there a limit to the number of users who can access the portal?',
            ans: 'The portal can accommodate multiple users, and the access can be scaled according to your organizational needs. Additional user licenses can be arranged as required.',
        },
        {
            questions: 'How often should I review and update estimation templates?',
            ans: 'It\'s recommended to periodically review and update estimation templates to incorporate any changes in technology, processes, or best practices. This ensures that estimations remain accurate and reflective of current conditions.',
        },
        {
            questions: 'Can I receive notifications or alerts for critical project milestones or potential delays?',
            ans: 'No. The current version does not support this feature.',
        }
 
    ];
   // faq.component.ts
// toggleAnswer(index: number): void {
//   this.faqs[index].showAnswer = !this.faqs[index].showAnswer;
// }

toggleAnswer(index: number): void {
    // Close all other answers
    this.faqs.forEach((faq, i) => {
      if (i !== index) {
        faq.showAnswer = false;
      }
    });
  
    // Toggle the clicked answer
    this.faqs[index].showAnswer = !this.faqs[index].showAnswer;
  }
  

  }