// my.component.ts

import { Component } from '@angular/core';
import { MyService } from './my.service';
@Component({
  selector: 'app-my-component',
  templateUrl: './my.component.html',
  styleUrls: ['./my.component.css'],
})
export class MyComponent {
  constructor(private myService: MyService) {}

  // Use the service methods as needed
  someMethod() {
    this.myService.myMethod();
  }
}
