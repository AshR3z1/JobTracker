using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface IJobService
    {
        Task<Job> AddJobAsync(JobCreateDto jobDto, string userId);
        Task<IEnumerable<Job>> GetUserJobsAsync(string userId);
        Task<bool> UpdateJobStatusAsync(int jobId, string status, string userId);
        Task<bool> DeleteJobAsync(int jobId, string userId);
    }
}