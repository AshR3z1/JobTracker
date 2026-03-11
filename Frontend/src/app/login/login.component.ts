import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onLogin() {
    this.http.post('http://localhost:5000/api/auth/login', this.loginData)
      .subscribe({
        next: (response: any) => {
          localStorage.setItem('token', response.token);
          alert('Login Successful!');
        },
        error: (err) => {
          alert('Login Failed' + err.error);
        }
      })
  }
}
