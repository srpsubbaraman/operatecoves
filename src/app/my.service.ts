// my.service.ts

import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class MyService {
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  myMethod() {
    if (isPlatformBrowser(this.platformId)) {
      // Access the DOM here
      const body = document.querySelector('body');
      // ...
    }
  }
}
