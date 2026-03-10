using Backend.DTOs;
using Backend.Services;
using Microsoft.AspNetCore.Mvc;

namespace Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase 
    {
        private readonly IAuthService _authService;

        public AuthController(IAuthService authService)
        {
            _authService = authService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterRequest request)
        {
            if (request == null) return BadRequest("data is null");

            var result = await _authService.RegisterAsync(request);

            if (result == "User Created")
            {
                return Ok(new {message = result});
            }

            return BadRequest(new {error = result});
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequest request)
        {
            var token = await _authService.LoginAsync(request);
            if (token != null) return Ok(new {token = token});
            return Unauthorized("Invalid Credentials");
        }
    }
}