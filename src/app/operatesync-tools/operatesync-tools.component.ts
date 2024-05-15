import { Component, OnInit } from '@angular/core';
import { trigger, state, style, transition, animate } from '@angular/animations';
// import { LoadingService } from '../loader.service';

@Component({
  selector: 'app-operatesync-tools',
  templateUrl: './operatesync-tools.component.html',
  styleUrl: './operatesync-tools.component.css',
  animations: [
    trigger('fadeInOut', [
      state('void', style({
        opacity: 0
      })),
      transition('void <=> *', animate(500))
    ])
  ]
})
export class OperatesyncToolsComponent  implements OnInit {
  loading: boolean = true; // Initially set to true to show loader

  // constructor(private loadingService: LoadingService) { }

  ngOnInit(): void {
    
    setTimeout(() => {
      
      this.loading = false; // Set loading to false to hide the loader
    }, 2000);
  }
  activeCategory: string = 'service-management';

  setActiveCategory(category: string) {
    this.activeCategory = category;
  }
}