using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class DetailsActivity
    {
        public class Query : IRequest<ResultApi<ActivityDto>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Query, ResultApi<ActivityDto>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
                // _logger = logger;
            }

            public async Task<ResultApi<ActivityDto>> Handle(Query request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .ProjectTo<ActivityDto>(_mapper.ConfigurationProvider)
                    .FirstOrDefaultAsync(x => x.Id == request.Id);         

                return ResultApi<ActivityDto>.Success(activity);

            }
        }

    }
}
