using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
    public class UserProfileDto
    {
        public string? FullName { get; set; }
        public string? Email { get; set; }
        public string? Bio { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? Gender { get; set; }
        public string? ProfilePicturePath { get; set; }
        public string? ResumePath { get; set; }
    }
}