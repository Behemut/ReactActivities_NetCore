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
        public class Query : IRequest<ResultApi<PagedList<ActivityDto>>> 
        {
            public PagingParams PagingParams { get; set; }

        }

        public class Handler : IRequestHandler<Query, ResultApi<PagedList<ActivityDto>>>
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

            public async Task<ResultApi<PagedList<ActivityDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activities = _context.Activities
                    .OrderByDescending(x => x.Date)
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                    .AsQueryable();


                return ResultApi<PagedList<ActivityDto>>.Success(
                        await PagedList<ActivityDto>.CreateAsync(activities, request.PagingParams.PageNumber, 
                                                                 request.PagingParams.PageSize)
                    );
            }
        }
    }
}
