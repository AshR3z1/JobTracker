using System.Security.Claims;
using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [Authorize]
    [ApiController]
    [Route("api/[controller]")]
    public class JobsController : ControllerBase
    {
        private readonly IJobService _jobService;

        public JobsController(IJobService jobService)
        {
            _jobService = jobService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateJob([FromBody] JobCreateDto jobDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var result = await _jobService.AddJobAsync(jobDto, userId);

            return Ok(result);
        }

        [HttpGet]
        public async Task<IActionResult> GetMyJobs()
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier)
                        ?? User.FindFirstValue("sub");

            var jobs = await _jobService.GetUserJobsAsync(userId);

            return Ok(jobs);
        }

        [HttpPut("status")]
        public async Task<IActionResult> UpdateStatus([FromBody] JobUpdateDto updateDto)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            var success = await _jobService.UpdateJobStatusAsync(updateDto.Id, updateDto.Status, userId!);

            if (success) return Ok();
            return BadRequest("Could not update status");
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteJob(int id)
        {
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            if (string.IsNullOrEmpty(userId)) return Unauthorized();

            var success = await _jobService.DeleteJobAsync(id, userId);

            if (success) return Ok();
            return BadRequest("Could not delete the job.");
        }
    }
}