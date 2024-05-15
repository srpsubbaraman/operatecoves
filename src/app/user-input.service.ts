// user-input.service.ts
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserInputService {
  private userInputData: any = {}; // Store user input data here

  constructor() { }

  // Method to set user input data
  setUserInputData(data: any) {
    this.userInputData = { ...this.userInputData, ...data };
  }

  // Method to get user input data
  getUserInputData() {
    return this.userInputData;
  }
}
