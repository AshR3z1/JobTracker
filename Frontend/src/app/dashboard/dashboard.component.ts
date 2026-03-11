import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{
  jobs: any[] = [];

  statuses = ['Pending', 'Interviewing', 'Rejected', 'Accepted'];

  constructor(
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)){
      this.loadJobs();
    }
    
  }

  getStat(status: string): number {
  const statCount = this.jobs.filter(j => this.standardizeStatus(j.status) === this.standardizeStatus(status)).length;
  console.log(`Calculating stats for ${status}: ${statCount}`);
  return statCount;
}

  loadJobs() {
    this.http.get<any[]>('http://localhost:5000/api/jobs').subscribe({
      next: (data) => {
        this.jobs = data.map(j => ({ ...j, status: this.standardizeStatus(j.status) }));
        console.log('Jobs loaded', this.jobs);
      },
      error: (err) => console.error(err)
    });
  }

  standardizeStatus(status: any): string {
    if (typeof status === 'string') {
      return status.charAt(0).toUpperCase() + status.slice(1);
    }
    return status;
  }

  updateStatus(jobId: number, newStatus: string) {
  this.http.put(`http://localhost:5000/api/jobs/status`, { id: jobId, status: newStatus })
    .subscribe({
      next: () => {
        const index = this.jobs.findIndex(j => j.id === jobId);
        if (index !== -1) {
          this.jobs[index].status = this.standardizeStatus(newStatus); 
        }
        console.log(`Updated job ${jobId} to ${newStatus} locally.`);
      },
      error: (err) => {
        alert('Failed to update status on server.');
        console.error(err);
      }
    });
  }
}
