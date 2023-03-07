using Application.Core;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class ListActivity
    {
        public class Query : IRequest< ResultApi<List<Activity>>> { }

        public class Handler : IRequestHandler<Query,ResultApi<List<Activity>>>
        {
            private readonly DataContext _context;
           // private readonly ILogger<List> _logger;
            public Handler(DataContext context)
            {
                _context = context;
               
            }
            public async Task< ResultApi<List<Activity>>> Handle(Query request, CancellationToken cancellationToken)
            {
                //return await _context.Activities.ToListAsync();
                return ResultApi<List<Activity>>.Success(await _context.Activities.ToListAsync());
            }
        }
    }
}
