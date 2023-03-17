using Application.Activities;
using Application.Core;
using Application.Interfaces;
using FluentValidation;
using FluentValidation.AspNetCore;
using Infrastructure.Photos;
using Infrastructure.Security;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            //var connection = "Server= ;Database=dbActivities;User Id=kepleitez;Password=Pochit@2023;TrustServerCertificate=True;MultipleActiveResultSets=True;";

            var connection = "Server=KELVIS\\DEVOPS;Database=dbActivities;User Id=devops;Password=Windows2020;TrustServerCertificate=True;MultipleActiveResultSets=True;";


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
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            //Fluent Validation
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<CreateActivity>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccesor, UserAccessor>();

            services.AddScoped<IPhotoAccesor, PhotoAccesor>();
            services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));


            services.AddSignalR();

            return services;
        }
    }
}
