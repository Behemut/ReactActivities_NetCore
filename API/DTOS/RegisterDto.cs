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
        [RegularExpression("(?=.{6,})((?=.*[!@#$%^&*()\\-_=+{};:,<.>]){1})(?=.*\\d)((?=.*[a-z]){1})((?=.*[A-Z]){1})", ErrorMessage = "Password must contain at least 6 characters, one uppercase, one number and one special case character")]
        public string Password { get; set; }
    }
}
