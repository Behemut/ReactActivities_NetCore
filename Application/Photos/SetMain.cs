using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class SetMain
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultApi<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IUserAccesor _userAccesor;
            public Handler(DataContext dataContext, IUserAccesor userAccesor)
            {
                _dataContext = dataContext;
                _userAccesor = userAccesor;
            }

            public async Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());
                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null) return null;

                var currentMain = user.Photos.FirstOrDefault(x => x.IsMain);
                if (currentMain != null) currentMain.IsMain = false;
              
                photo.IsMain = true;

                var success = await _dataContext.SaveChangesAsync() > 0;
                if (success) return ResultApi<Unit>.Success(Unit.Value);

                return ResultApi<Unit>.Failure("Problem setting main photo");
            }
        }
    }
}
