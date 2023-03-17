using Application.Core;
using Application.Interfaces;
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
            private readonly IUserAccesor _userAccessor;
            // private readonly ILogger<List> _logger;
            public Handler(DataContext context, IMapper mapper, IUserAccesor userAccessor)
            {
                _userAccessor = userAccessor;
                _mapper = mapper;
                _context = context;
            }

            public async Task<ResultApi<List<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = await _context.Activities           
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .ToListAsync(cancellationToken);
                return ResultApi<List<ActivityDto>>.Success(activities);
            }
        }
    }
}
