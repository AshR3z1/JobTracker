import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  registerData = {
    email: '',
    password: ''
  };

  constructor(private http: HttpClient) {}

  onRegister() {
    this.http.post('http://localhost:5000/api/auth/register', this.registerData)
      .subscribe({
        next: (res: any) => {
          console.log('Success', res);
          alert(res.message);
        },
        error: (err) => {
          console.error('Full Error Object:', err);

          const errorMsg = err.error?.error || 'Registration failed';
          alert('Error: ' + errorMsg)
        }
      });
  }
}
