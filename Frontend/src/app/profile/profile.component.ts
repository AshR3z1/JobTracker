import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../profile.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{
  profile: any = {
    fullName: '',
    bio: '',
    dateOfBirth: '',
    gender: '',
    profilePicturePath: ''
  };

  imageTimestamp: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProfile();
  }

  loadProfile() {
    this.http.get('http://localhost:5000/api/profile').subscribe({
      next: (data: any) => {
        this.profile = data;
        if (this.profile.dateOfBirth) {
          this.profile.dateOfBirth = this.profile.dateOfBirth.split('T')[0];
        }
        this.imageTimestamp = '?t=' + new Date().getTime();
      },
      error: (err) => console.error(err)
    });
  }

  saveProfile() {
    this.http.put('http://localhost:5000/api/profile', this.profile).subscribe({
      next: () => alert('Profile updated successfully!'),
      error: (err) => alert('Failed to update profile')
    });
  }

  getFullImageUrl(path: string | null): string {
    if (!path) return 'assets/default-user.png'; 

    const baseUrl = 'http://localhost:5000';
    const cleanPath = path.startsWith('/') ? path : '/' + path;

    return `${baseUrl}${cleanPath}${this.imageTimestamp}`;
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.http.post('http://localhost:5000/api/profile/upload-picture', formData).subscribe({
        next: (res: any) => {
          this.profile.profilePicturePath = res.path + '?t=' + new Date().getTime();
          alert('Photo uploaded!');
        },
        error: (err) => alert('Upload failed')
      });
    }
  }

  

}
