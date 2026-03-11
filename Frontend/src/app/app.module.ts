import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors, withFetch} from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { JobAddComponent } from './job-add/job-add.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,    
    RegisterComponent, 
    DashboardComponent,
    JobAddComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(
      withFetch(),
      withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }