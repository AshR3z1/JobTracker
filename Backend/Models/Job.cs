using System.ComponentModel.DataAnnotations;

namespace Backend.Models
{
    public class Job
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string CompanyName { get; set; }

        [Required]
        public string Position { get; set; }

        public string Description { get; set; }

        public JobStatus Status { get; set; } = JobStatus.Pending;

        public string JobLink { get; set; }

        public DateTime AppliedDate { get; set; } = DateTime.Now;

        public string UserId { get; set; }
    }

    public enum JobStatus
    {
        Pending,
        Interviewing,
        Rejected,
        Accepted
    }
}