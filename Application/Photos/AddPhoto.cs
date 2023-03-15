using Application.Core;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Photos
{
    public class AddPhoto
    {
        public class Command : IRequest<ResultApi<Photo>>
        {
            public IFormFile File { get; set; }
        }

        public class Handler : IRequestHandler<Command, ResultApi<Photo>>
        {
            private readonly DataContext _context;
            private IPhotoAccesor _photoAccesor;
            private IUserAccesor _userAccesor;

            public Handler(DataContext context, IPhotoAccesor photoAccesor, IUserAccesor userAccesor)
            {
                _context = context;
                _photoAccesor = photoAccesor;
                _userAccesor = userAccesor;
            }

            public async Task<ResultApi<Photo>> Handle(Command request, CancellationToken cancellationToken)
            {
                var user = await _context.Users
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());

                if (user == null) return null;

                var photoUploadResult = await _photoAccesor.AddPhoto(request.File);
                var photo = new Photo
                {
                    Url = photoUploadResult.Url,
                    Id = photoUploadResult.PublicId
                };

                if (!user.Photos.Any(x => x.IsMain)) photo.IsMain = true;

                user.Photos.Add(photo);
                var result = await _context.SaveChangesAsync() > 0;

                if (result) return ResultApi<Photo>.Success(photo);

                return ResultApi<Photo>.Failure("Problem adding photo");
            }
        }
    }
}
