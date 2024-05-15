// estimation-portal.module.ts (or app.module.ts, if not using a separate module)
import { MatTabsModule } from '@angular/material/tabs';
import { EstimationPortalComponent } from './estimation-portal.component';
import { NgModule } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { Router, Routes } from '@angular/router';


@NgModule({
  declarations: [
    // ... other components
  ],
  imports: [
    MatTabsModule,
    // ... other modules
  ],
})
export class EstimationPortalModule {

 }
