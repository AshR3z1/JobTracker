using Backend.Data;
using Backend.DTOs;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Services
{
    public class JobService : IJobService
    {
        private readonly ApplicationDbContext _context;

        public JobService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Job> AddJobAsync(JobCreateDto jobDto, string userId)
        {
            var job = new Job
            {
                CompanyName = jobDto.CompanyName,
                Position = jobDto.Position,
                Description = jobDto.Description,
                JobLink = jobDto.JobLink,
                UserId = userId,
                AppliedDate = DateTime.Now,
                Status = JobStatus.Pending
            };

            _context.Jobs.Add(job);
            await _context.SaveChangesAsync();
            return job;
        }

        public async Task<IEnumerable<Job>> GetUserJobsAsync(string userId)
        {
            return await _context.Jobs
                .Where(j => j.UserId == userId)
                .ToListAsync();
        }
    }
}