using Backend.DTOs;
using Backend.Models;

namespace Backend.Services
{
    public interface IJobService
    {
        Task<Job> AddJobAsync(JobCreateDto jobDto, string userId);
        Task<IEnumerable<Job>> GetUserJobsAsync(string userId);
    }
}