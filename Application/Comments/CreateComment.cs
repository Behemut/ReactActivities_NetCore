using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class CreateComment
    {
        public class Command : IRequest<ResultApi<CommentDto>>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
        }

        //VALIDATION TO AVOID EMPYT BODY CONTENT
        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x => x.Body).NotEmpty();
            }
        }

        public class Handler : IRequestHandler<Command, ResultApi<CommentDto>>
        {
            private readonly DataContext _context;
            private readonly IUserAccesor _userAccesor;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper, IUserAccesor userAccesor)
            {
                _context = context;
                _userAccesor = userAccesor;
                _mapper = mapper;
            }

            public DataContext Context { get; }
            public IMapper Mapper { get; }

            public async Task<ResultApi<CommentDto>> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null) return null;

                var user = await _context.Users
                    .Include(x => x.Photos)
                    .SingleOrDefaultAsync(x => x.UserName == _userAccesor.GetUsername());

                var comment = new Comment
                {
                    Author = user,
                    Activity = activity,
                    Body = request.Body
                };

                activity.Comments.Add(comment);
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return ResultApi<CommentDto>.Success(_mapper.Map<CommentDto>(comment));
                return ResultApi<CommentDto>.Failure("Problem adding comment");
            }
        }
    }
}
