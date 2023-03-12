using Application.Core;
using Application.Interfaces;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public Activity Activity { get; set; }
        }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Activity).SetValidator(new ValidateActivity());

            }
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
                var user = await _context.Users.FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());
                var attendee = new ActivityAttendee
                {
                    AppUser = user,
                    Activity = request.Activity,
                    IsHost = true
                };
                request.Activity.Attendees.Add(attendee);
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return ResultApi<Unit>.Failure("Failed to create activity");
                else
                    return ResultApi<Unit>.Success(Unit.Value);

            }
        }
    }
}
