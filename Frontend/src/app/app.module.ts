import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from "./register/register.component";
import { JobAddComponent } from './job-add/job-add.component';
import { authInterceptor } from './auth.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    JobAddComponent 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    LoginComponent,    
    RegisterComponent,
    ReactiveFormsModule  
  ],
  providers: [
    provideClientHydration(withEventReplay()),
    provideHttpClient(withInterceptors([authInterceptor]))
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }