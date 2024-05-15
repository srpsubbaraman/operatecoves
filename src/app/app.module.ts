import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterModule, Routes } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './Header/header.component';
import { FooterComponent } from './Footer/footer.component';
import { CreateQuoteComponent } from './create-quote/create-quote.component';
import { HomeComponent } from './home/home.component';
import { NgbCarouselConfig, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FaqComponent } from './FAQ/faq.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GetQuoteComponent } from './get-quote/get-quote.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EstimationPortalComponent } from "./estimation-portal/estimation-portal.component";
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AbapComponent } from './abap/abap.component';
import { PipoComponent } from './pipo/pipo.component';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MyquoteComponent } from './myquote/myquote.component';
import { OurLeadersComponent } from './our-leaders/our-leaders.component';
import { LocTeamComponent } from './loc-team/loc-team.component';
import { HydTeamComponent } from './hyd-team/hyd-team.component'; 
import { CBETeamComponent } from './cbe-team/cbe-team.component';
import { BangTeamComponent } from './bang-team/bang-team.component';
import { CommonModule } from '@angular/common';
import { GroomingportalComponent } from './groomingportal/groomingportal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MUMTeamComponent } from './mum-team/mum-team.component';
import { ChenTeamComponent } from './chen-team/chen-team.component';
import { MycartComponent } from './mycart/mycart.component';
import { SettingsComponent } from './settings/settings.component';
import { ContactusComponent } from './contactus/contactus.component';
import { MemoriesComponent } from './memories/memories.component';
import { LoginComponent } from './login/login.component';
import { TeamService } from './team-profile.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClientQualificationComponent } from './client-qualification/client-qualification.component';
import { DialogContentComponent } from './dialog-content/dialog-content.component';
import { BhuTeamComponent } from './bhu-team/bhu-team.component';
import { PuneTeamComponent } from './pune-team/pune-team.component';
import { DelTeamComponent } from './del-team/del-team.component';
import { KolTeamComponent } from './kol-team/kol-team.component';
import { AhmTeamComponent } from './ahm-team/ahm-team.component';
import { OperateSyncComponent } from './operate-sync/operate-sync.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import { OperatesyncToolsComponent } from './operatesync-tools/operatesync-tools.component';
import { ThaneTeamComponent } from './thane-team/thane-team.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIconModule } from '@angular/material/icon';
import { OverviewComponent } from './overview/overview.component';
import { AllTeamComponent } from './all-team/all-team.component';
import { VisionComponent } from './vision/vision.component';



// const appRoute: Routes = [
//     { path: '', redirectTo: 'Login', pathMatch: 'full' },
//   //   { path: '', redirectTo: 'HomeComponent', pathMatch: 'full' },
//     { path: 'Home', component: HomeComponent },
//     { path: 'CreateQuoteComponent', component: CreateQuoteComponent },
//     { path: 'FAQ', component: FaqComponent },
//     { path: 'GetQuoteComponent', component: GetQuoteComponent },
//     { path: 'EstimationPortal', component: EstimationPortalComponent},
//     { path: 'DashboardComponent', component: DashboardComponent},
//     { path: 'AbapComponent', component: AbapComponent},
//     { path: 'PipoComponent', component: PipoComponent},
//     { path: 'MyquoteComponent', component: MyquoteComponent},
//     { path: 'ClientQualificationComponent', component: ClientQualificationComponent},
//     { path: 'Groomingportal', component: GroomingportalComponent},
//     { path: 'TeamProfile', component: LocTeamComponent},
//     { path: 'Coimbatore', component: CBETeamComponent},
//     { path: 'Chennai', component: ChenTeamComponent},
//     { path: 'Bangalore', component: BangTeamComponent},
//     { path: 'Hydrabad', component: HydTeamComponent},
//     { path: 'Mumbai', component: MUMTeamComponent},
//     { path: 'OurLeadersComponent', component: OurLeadersComponent},
//     { path: 'Mycart', component: MycartComponent},
//     { path: 'Settings', component: SettingsComponent},
//     { path: 'About', component: ContactusComponent},
//     { path: 'MemoriesComponent', component: MemoriesComponent},
//     { path: 'Login', component: LoginComponent},
//     { path: 'OperateSync', component: OperateSyncComponent }
//     // { path: 'RegisterComponent', component: RegisterComponent}
  
  
  
  
  
    
  
//   ];




const appRoute: Routes = [
    { path: '', redirectTo: 'Login', pathMatch: 'full' },
    { path: 'Home', component: HomeComponent },
    { path: 'CreateQuoteComponent', component: CreateQuoteComponent },
    { path: 'FAQ', component: FaqComponent },
    { path: 'GetQuoteComponent', component: GetQuoteComponent },
    { path: 'EstimationPortal', component: EstimationPortalComponent },
    { path: 'DashboardComponent', component: DashboardComponent },
    { path: 'AbapComponent', component: AbapComponent },
    { path: 'PipoComponent', component: PipoComponent },
    { path: 'Myquote', component: MyquoteComponent },
    { path: 'ClientQualificationComponent', component: ClientQualificationComponent },
    { path: 'Groomingportal', component: GroomingportalComponent },
    { path: 'TeamProfile', component: LocTeamComponent },
    { path: 'Coimbatore', component: CBETeamComponent },
    { path: 'Chennai', component: ChenTeamComponent },
    { path: 'Bangalore', component: BangTeamComponent },
    { path: 'Hydrabad', component: HydTeamComponent },
    { path: 'Mumbai', component: MUMTeamComponent },
    { path: 'OurLeadersComponent', component: OurLeadersComponent },
    { path: 'Mycart', component: MycartComponent },
    { path: 'Settings', component: SettingsComponent },
    { path: 'About', component: ContactusComponent },
    { path: 'MemoriesComponent', component: MemoriesComponent },
    { path: 'Login', component: LoginComponent },
    { path: 'OperateSync', component: OperateSyncComponent },
    { path: 'Bhubaneshwar', component: BhuTeamComponent },
    { path: 'Ahmedabad', component: AhmTeamComponent },
    { path: 'Kolkata', component: KolTeamComponent },
    { path: 'Delhi', component: DelTeamComponent },
    { path: 'Pune', component: PuneTeamComponent },
    { path: 'Thane', component: ThaneTeamComponent },
    { path: 'All', component: AllTeamComponent},
    { path: 'OperatesyncTools', component: OperatesyncToolsComponent},
    { path: 'Overview', component: OverviewComponent},
    { path: 'Vision', component: VisionComponent, data: { scrollPositionRestoration: 'enabled' } },

  ];
  

@NgModule({
    declarations: [
        AppComponent,
        HeaderComponent,
        FooterComponent,
        GetQuoteComponent,
        DashboardComponent,
        AbapComponent,
        EstimationPortalComponent,
        CreateQuoteComponent,
        HomeComponent,
        FaqComponent,
        PipoComponent,
        MyquoteComponent,
        ClientQualificationComponent,
        OurLeadersComponent,
        MUMTeamComponent,
        LocTeamComponent,
        CBETeamComponent,
        BangTeamComponent,
        ChenTeamComponent,
        HydTeamComponent,
        BhuTeamComponent,
        PuneTeamComponent,
        DelTeamComponent,
        AhmTeamComponent,
        KolTeamComponent,
        ThaneTeamComponent,
        MycartComponent,
        GroomingportalComponent,
        SettingsComponent,
        ContactusComponent,
        MemoriesComponent,
        LoginComponent,
        DialogContentComponent,
        OperateSyncComponent,
        OperatesyncToolsComponent,
        OverviewComponent,
        AllTeamComponent,
        VisionComponent

    ],
    providers: [
        provideClientHydration(),
        provideAnimationsAsync(),
        [TeamService],
        MycartComponent,
        EstimationPortalComponent,
        NgbCarouselConfig,
        


    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    imports: [
        BrowserModule,
        MatTooltipModule,
        AppRoutingModule,
        MatTabsModule,
        MatFormFieldModule,
        MatSelectModule,
        MatSidenavModule,
        BrowserAnimationsModule,
        NgbModule,
        MatListModule,
        RouterModule.forRoot(appRoute, { useHash: true }),
        RouterModule.forRoot(appRoute, { scrollPositionRestoration: 'disabled' }),
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatSlideToggleModule,
        HttpClientModule,
        SlickCarouselModule,
        MatButtonModule,
        MatMenuModule,
        MatStepperModule,
        MatIconModule,
        

        
    ],
    exports: [RouterModule]
})
export class AppModule {}