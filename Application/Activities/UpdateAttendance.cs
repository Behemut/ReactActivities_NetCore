using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class UpdateAttendance
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public Guid Id { get; set; }
        }
        public class Handler : IRequestHandler<Command, ResultApi<Unit>>
        {
            private readonly DataContext _context;
            private readonly IUserAccesor _userAccesor;
            public Handler(DataContext context, IUserAccesor userAccesor)
            {
                _context = context;
                _userAccesor = userAccesor;
            }

            public async Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities
                    .Include(x => x.Attendees)
                    .ThenInclude(x => x.AppUser)
                    .SingleOrDefaultAsync(x => x.Id == request.Id);

                if (activity == null) return null;

                var user = await _context.Users
                    .SingleOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());

                if (user == null) return null;

                var hostUsername = activity.Attendees.FirstOrDefault(x => x.IsHost)?.AppUser?.UserName;

                var attendance = activity.Attendees.FirstOrDefault(x => x.AppUser.UserName == user.UserName);

                if (attendance != null && hostUsername == user.UserName)
                    activity.IsCancelled = !activity.IsCancelled;

                if (attendance != null && hostUsername != user.UserName)
                    activity.Attendees.Remove(attendance);

                if (attendance == null)
                {
                    attendance = new ActivityAttendee
                    {
                        AppUser = user,
                        Activity = activity,
                        IsHost = false
                    };
                    activity.Attendees.Add(attendance);
                }

                var result = await _context.SaveChangesAsync() > 0;

                return result ? ResultApi<Unit>.Success(Unit.Value) : ResultApi<Unit>.Failure("Problem updating attendance");
            }



        }
    }
}
