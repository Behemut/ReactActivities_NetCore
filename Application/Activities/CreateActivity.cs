using Application.Core;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Activities
{
    public class CreateActivity
    {
        public class Command : IRequest<ResultApi<Unit>> { 
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
            public Handler(DataContext context)
            {
                _context = context;
            }

            public async Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                _context.Activities.Add(request.Activity);
                var result = await _context.SaveChangesAsync() >  0;

                if (!result)
                    return ResultApi<Unit>.Failure("Failed to create activity");
                else
                    return ResultApi<Unit>.Success(Unit.Value);

            }          
        }
    }
}
