using Backend.DTOs;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthControllers : ControllerBase
    {
        private readonly UserManager<IdentityUser> _userManager;

        public AuthControllers(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }
        
        

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            return Ok("Login endpoint hit!");
        }
    }
}