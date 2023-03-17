using Application.Core;
using Application.Interfaces;
using Application.Profiles;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class ListFollowers
    {
        public class Query : IRequest<ResultApi<List<ProfileDto>>>
        {
            public string Username { get; set; }
            public string Predicate { get; set; }
        }

        public class Handler : IRequestHandler<Query, ResultApi<List<ProfileDto>>>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            private readonly IUserAccesor _userAccessor;
            public Handler(DataContext context, IMapper mapper, IUserAccesor userAccesor)
            {
                _context = context;
                _mapper = mapper;
                _userAccessor = userAccesor;
            }
            public async Task<ResultApi<List<ProfileDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var profiles = new List<ProfileDto>();

                switch (request.Predicate)
                {
                    case "followers":
                        profiles = await _context.UserFollowings.Where(x => x.Target.UserName == request.Username)
                                        .Select(u => u.Observer)
                                        .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                                        .ToListAsync(cancellationToken);
                        break;

                    case "following":
                        profiles = await _context.UserFollowings.Where(x => x.Observer.UserName == request.Username)
                                        .Select(u => u.Target)
                                        .ProjectTo<ProfileDto>(_mapper.ConfigurationProvider, new { currentUsername = _userAccessor.GetUsername() })
                                        .ToListAsync(cancellationToken);
                        break;
                }
                return ResultApi<List<ProfileDto>>.Success(profiles);
            }
        }
    }
}
