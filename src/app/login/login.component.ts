import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  // standalone: true,
  // imports: [],  
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  email:any = '';
  password:any = '';
  //formData: any = {}; 
  passwordStrength: string = '';
  passwordStrengthColorClass: string = '';

  constructor(private router: Router) {}

  async ngOnInit(){
    console.log("Login: "+localStorage.getItem('login_info'));
    console.log("In TTL? : "+ String((JSON.parse(localStorage.getItem('login_info')!).ttl) >=Date.now()));
    if(localStorage.getItem('login_info')!="{}" && JSON.parse(localStorage.getItem('login_info')!).ttl >=Date.now()){
      await this.router.navigate(['/Home']); 
      
    }
    else{
       localStorage.setItem('login_info',"{}") 
    }
    

  }
  async login() {
    this.email = ((document.getElementById("email")! as HTMLInputElement).value);
    this.password =  ((document.getElementById("password")as HTMLInputElement).value);
    //console.log("EMAIL: "+this.email+"\n"+this.password);
    let username ='';
    const email:any = this.email;
    const password:any = this.password; 
    console.log("EMAIL: "+email+"\n"+password);
  //   let match = await fetch("http://localhost:8080/estimation/login",{
  //     headers:{
  //       "Content-type":"application/json"
  //     },
  //     method:"POST",
  //     body:JSON.stringify({
  //       Email:email,
  //       Password:password
  //     })
  // }).then(response=>console.log((response.text()))).then((result) => {return result} )

  //   console.log("Match: "+match);

  const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");
myHeaders.append("Authorization", "Basic c3VuZGFyQGdtYWlsLmNvbTpzdW5kYXJAMTIz");

const raw = JSON.stringify({
  "Email": this.email,
  "Password": this.password
});

const requestOptions = {
  method: "POST",
  headers: myHeaders,
  body: raw,
};

let hello =(await fetch("http://localhost:8080/estimation/login", requestOptions)
  .then((response) => response.text())
  .then((result) => {return(result)})
  .catch((error) => console.error(error)));

  console.log("Hello"+(hello))
    if (hello!.split('-')[0] =="FOUND_MATCHED" ) {
      username = hello!.split('-')[1];
      console.log('Date: '+Date.now());
      localStorage.setItem('login_info',JSON.stringify({em:email,state:"logged",user:username,ttl: Date.now()+6000000}));
      // localStorage.setItem('Pass',password);
      console.log(localStorage.getItem('login_info'));
      console.log('Date: '+Date.now());
      // localStorage.setItem('State','logged');
      alert("Welcome, "+JSON.parse(localStorage.getItem('login_info')!).user)
      this.router.navigate(['/Home']); 

    } else {
      alert('Login failed. Please check your credentials.');
    }

    // this.formData.email = '';
    // this.formData.username = '';
    // this.formData.password = '';
  }

  checkPasswordStrength() {
    const password = this.password;

    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialCharacter = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(password);
    const hasLength = password.length >= 8;

    const isStrong = hasUppercase && hasLowercase && hasNumber && hasSpecialCharacter && hasLength;

    if (isStrong) {
      this.passwordStrength = 'Password Strength: Strong';
      this.passwordStrengthColorClass = 'text-green';
    } else {
      this.passwordStrength = 'Password Strength: Weak';
      this.passwordStrengthColorClass = 'text-red';
    }
  }
}