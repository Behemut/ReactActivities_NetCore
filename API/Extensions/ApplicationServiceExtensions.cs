using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Persistence;
using System.Reflection;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();


            //var connection = "Server=172.16.153.121\\DEVOPS;Database=dbActivities;User Id=kepleitez;Password=Pochit@2023;TrustServerCertificate=True;MultipleActiveResultSets=True;";

            var connection = "Server=KELVIS\\DEVOPS;Database=dbActivities;User Id=devops;Password=Behemut1406;TrustServerCertificate=True;MultipleActiveResultSets=True;";

            services.AddDbContext<DataContext>(options => options.UseSqlServer(connection));
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    //allow cors origins any origin
                    policy
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()
                    .WithOrigins("http://localhost:3000");

                });
            });

            services.AddMediatR(typeof(ListActivity.Handler).Assembly);
           // services.AddMediatR(typeof(CreateActivity.Handler).Assembly);

            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            //Fluent Validation
            services.AddFluentValidationAutoValidation();
            //Get data from Security Claims
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccesor, UserAccessor>();

            services.AddScoped<IPhotoAccesor, PhotoAccesor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));

            services.AddSignalR();

            return services;
        }
    }
}
