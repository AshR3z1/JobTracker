using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Backend.DTOs
{
    public class JobCreateDto
    {
        public string CompanyName { get; set; }
        public string Position { get; set; }
        public string Description { get; set; }
        public string JobLink { get; set; }
    }
}