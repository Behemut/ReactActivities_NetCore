using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class EditActivity
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
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _mapper = mapper;
                _context = context;
            }

            public async Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Activity.Id);

                if (activity == null)
                    ResultApi<Unit>.Failure("Could not find activity");

                _mapper.Map(request.Activity, activity);
                var result = await _context.SaveChangesAsync() > 0;

                if (result)
                    return ResultApi<Unit>.Success(Unit.Value);
                else
                    return ResultApi<Unit>.Failure("Failed to edit activity");

            }


        }
    }
}
