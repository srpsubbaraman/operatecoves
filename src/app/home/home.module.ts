// home.module.ts
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import {NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    NgbModule,
    NgbCarouselModule
  ]
})
export class HomeModule { 
   
}
