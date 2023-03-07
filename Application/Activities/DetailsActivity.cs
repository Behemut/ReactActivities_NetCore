using Application.Core;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http.HttpResults;
using Persistence;

using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class DetailsActivity
    {
        public class Query : IRequest<ResultApi<Activity>> { 
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Query, ResultApi<Activity>>
        {
            private readonly DataContext _context;
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultApi<Activity>> Handle(Query request, CancellationToken cancellationToken)
            {
               var activity = await _context.Activities.FindAsync(request.Id);

                return ResultApi<Activity>.Success(activity);

            }
        }





    }
}
