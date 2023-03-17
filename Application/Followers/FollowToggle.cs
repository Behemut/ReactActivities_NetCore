using Application.Comments;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Followers
{
    public class FollowToggle
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public string TargetUsername { get; set; }      
        }

        public class Handler : IRequestHandler<Command, ResultApi<Unit>>
        {

            private readonly DataContext _context;
            private readonly IUserAccesor _userAccesor;
            private readonly IMapper _mapper;

            public Handler(DataContext context, IUserAccesor userAccesor, IMapper mapper)
            {
                _context = context;
                _userAccesor = userAccesor;
                _mapper = mapper;
            }

            public async Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var observer = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());

                var target = await _context.Users.FirstOrDefaultAsync(x => x.UserName == request.TargetUsername);

                if (target == null) return null;

                var following = await _context.UserFollowings.FindAsync(observer.Id, target.Id);

                if (following == null)
                {
                    following = new UserFollowing
                    {
                        Observer = observer,
                        Target = target
                    };
                    _context.UserFollowings.Add(following);             
                }
                else
                {
                    _context.UserFollowings.Remove(following);
                }

                var result = await _context.SaveChangesAsync() > 0;

                if (result) return ResultApi<Unit>.Success(Unit.Value);

                return ResultApi<Unit>.Failure("Failed to following user");
            }
        }





    }
}
