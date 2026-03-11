import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-job-add',
  standalone: false,
  templateUrl: './job-add.component.html',
  styleUrl: './job-add.component.scss'
})
export class JobAddComponent implements OnInit {
  jobForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.jobForm = this.fb.group({
      companyName: ['', Validators.required],
      position: ['', Validators.required],
      description: [''],
      jobLink: ['']
    });
  }

  onSubmit() {
    if (this.jobForm.valid) {
      this.http.post('http://localhost:5000/api/jobs', this.jobForm.value)
        .subscribe({
          next: (res) => {
            alert('Job Added!');
            this.jobForm.reset();
          },
          error: (err) => console.error(err)
        });
    }
  }
}
