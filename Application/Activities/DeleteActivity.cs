using Application.Core;
using MediatR;
using Persistence;

namespace Application.Activities
{
    public class DeleteActivity
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public Guid Id { get; set; }
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
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                    return null;

                _context.Remove(activity);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result)
                    return ResultApi<Unit>.Failure("Failes to delete activity");

                return ResultApi<Unit>.Success(Unit.Value);

            }


        }
    }
}
