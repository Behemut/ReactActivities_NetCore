using API.Services;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using Persistence;
using System.Text;

namespace API.Extensions
{
    public static class IdentityServerExtension
    {
        public static IServiceCollection AddIdentityServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;
                opt.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<DataContext>()
                .AddSignInManager<SignInManager<AppUser>>();

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"));
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                        .AddJwtBearer(options =>
                        {
                            options.SaveToken = true;
                            options.RequireHttpsMetadata = true;
                            options.TokenValidationParameters = new TokenValidationParameters()
                            {
                                ValidateIssuerSigningKey = true,
                                IssuerSigningKey = key,
                                ValidateIssuer = true,
                                ValidateAudience = true,
                                ClockSkew = TimeSpan.Zero,
                                ValidAudience = "*",
                                ValidIssuer ="*",
                                IssuerSigningKeys = new List<SecurityKey>
                                {
                                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes("super secret key"))
                                }
                            };
                        });

            services.AddScoped<TokenService>();
            return services;
        }     
    }
}
