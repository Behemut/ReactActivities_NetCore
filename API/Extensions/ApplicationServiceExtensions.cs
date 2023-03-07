using MediatR;
using Persistence;
using Domain;
using Application;
using Microsoft.EntityFrameworkCore;
using Application.Activities;
using Application.Core;
using FluentValidation.AspNetCore;
using FluentValidation;

namespace API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(this IServiceCollection services,
            IConfiguration config)
        {
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();
            
            var connection = "Server=KELVIS\\DEVOPS;Database=dbActivities;User Id=devops;Password=Windows2020;TrustServerCertificate=True;MultipleActiveResultSets=True;";

            services.AddDbContext<DataContext>(options => options.UseSqlServer(connection));

            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    //allow cors origins any origin
                    policy.AllowAnyHeader().AllowAnyMethod().WithOrigins("*");
                });
            });
           
            services.AddMediatR(typeof(ListActivity.Handler).Assembly);
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            //Fluent Validation
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<CreateActivity>();

            return services;
        }
    }
}
