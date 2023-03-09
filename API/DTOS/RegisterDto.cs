using System.ComponentModel.DataAnnotations;

namespace API.DTOS
{
    public class RegisterDto
    {
        [Required]
        public string DisplayName { get; set; }
        [Required]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{6,15}$", ErrorMessage = "Password must have 1 Uppercase, 1 lowercase, 1 number, and at least 6 characters")]
        public string Password { get; set; }
    }
}
