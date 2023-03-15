using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ProfileController : BaseApiController
    {
       [HttpGet("{username}")]
            public async Task<ActionResult> GetProfile(string username)
            {
                return HandleResult(await Mediator.Send(new Details.Query { Username = username }));
            }
    
            //[HttpPut]
            //public async Task<ActionResult<Unit>> Edit(Edit.Command command)
            //{
            //    return await Mediator.Send(command);
            //}
    
            //[HttpPost("{username}/follow")]
            //public async Task<ActionResult<Unit>> Follow(string username)
            //{
            //    return await Mediator.Send(new FollowToggle.Command { Username = username });
            //}
    
            //[HttpGet("{username}/activities")]
            //public async Task<ActionResult<List<UserActivityDto>>> GetUserActivities(string username, string predicate)
            //{
            //    return await Mediator.Send(new ListActivities.Query { Username = username, Predicate = predicate });
            //}
    }
}
