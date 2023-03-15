using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class DeletePhoto
    {
        public class Command : IRequest<ResultApi<Unit>>
        {
            public string Id { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultApi<Unit>>
        {
            private readonly DataContext _dataContext;
            private readonly IPhotoAccesor _photoAccesor;
            private readonly IUserAccesor _userAccesor;
            public Handler(DataContext dataContext, IPhotoAccesor photoAccesor, IUserAccesor userAccesor)
            {
                _dataContext = dataContext;
                _photoAccesor = photoAccesor;
                _userAccesor = userAccesor;
            }

            public async  Task<ResultApi<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _dataContext.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());
                if (user == null) return null;

                var photo = user.Photos.FirstOrDefault(x => x.Id == request.Id);
                if (photo == null) return null;

                if (photo.IsMain) return ResultApi<Unit>.Failure("You cannot delete your main photo");

                var result = await _photoAccesor.DeletePhoto(photo.Id);
                if (result == null) return ResultApi<Unit>.Failure("Problem deleting photo from Cloudinary");

                user.Photos.Remove(photo);
                var success = await _dataContext.SaveChangesAsync() > 0;

                if (success) return ResultApi<Unit>.Success(Unit.Value);

                return ResultApi<Unit>.Failure("Problem deleting photo from API");      
            }
        }
    }
}
