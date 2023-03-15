using Application.Core;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class Details
    {
        public class Query : IRequest<ResultApi<Profile>>
        {
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Query,ResultApi<Profile>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<ResultApi<Profile>> Handle(Query request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                         .ProjectTo<Profile>(_mapper.ConfigurationProvider)
                         .SingleOrDefaultAsync(x => x.Username == request.Username);
                if (user == null) return null;
                return ResultApi<Profile>.Success(user);
            }
        }
    }
}
