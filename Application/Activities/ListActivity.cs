using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class ListActivity
    {
        public class Query : IRequest<ResultApi<List<ActivityDto>>> { }

        public class Handler : IRequestHandler<Query, ResultApi<List<ActivityDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            // private readonly ILogger<List> _logger;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
                // _logger = logger;
            }

            public async Task<ResultApi<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities
                    //.Include(a => a.Attendees)
                    //.ThenInclude(u => u.AppUser)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);
                //var activitiesToReturn = _mapper.Map<List<ActivityDto>>(activities);

                return ResultApi<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
