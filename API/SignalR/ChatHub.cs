using MediatR;
using Microsoft.AspNetCore.SignalR;
using Application.Comments;
using System.Threading.Tasks;

namespace API.SignalR
{
    public class ChatHub : Hub
    {
        private readonly IMediator _mediator;

        public ChatHub(IMediator mediator)
        {
            _mediator = mediator;
        }

        public async Task SendComment(CreateComment.Command command)
        {
            var comment = await _mediator.Send(command);
            await Clients.Group(command.ActivityId.ToString()).SendAsync("ReceiveComment", comment.Value); 
        }

        public override async Task OnConnectedAsync()
        {
            var httpContext = Context.GetHttpContext();
            //this is the endpoint for the Hub
            var activityId = httpContext.Request.Query["activityId"];
            await Groups.AddToGroupAsync(Context.ConnectionId, activityId);
            var result = await _mediator.Send(new ListComments.Query { ActivityId = Guid.Parse(activityId)});
            await Clients.Caller.SendAsync("LoadComments", result.Value);          
        }   
    }
}
