// toggle.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToggleService {
  private isToggleButtonCheckedSubject = new BehaviorSubject<boolean>(false);

  isToggleButtonChecked$: Observable<boolean> = this.isToggleButtonCheckedSubject.asObservable();

  setToggleButtonState(isChecked: boolean): void {
    this.isToggleButtonCheckedSubject.next(isChecked);
  }

  getToggleButtonState(): boolean {
    return this.isToggleButtonCheckedSubject.value;
  }
}
