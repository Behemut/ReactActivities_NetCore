using Application.Activities;
using Application.Core;
using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //Get all activities
        [HttpGet]
        // public async Task<ActionResult<List<Activity>>> GetActivities()
        public async Task<IActionResult> GetActivities([FromQuery]PagingParams pagingParams)
        {
            return HandlePageResult(await Mediator.Send(new ListActivity.Query{ PagingParams =  pagingParams }));
        }

        //Get specific activity
        [HttpGet("{id}")]
        public async Task<ActionResult> GetActivity(Guid id)
        {
            var result = await Mediator.Send(new DetailsActivity.Query { Id = id });
            return HandleResult(result);
        }

        //Create activity
        [HttpPost]
        public async Task<ActionResult> CreateActivity(Activity activity)
        {
            return HandleResult(await Mediator.Send(new CreateActivity.Command { Activity = activity }));
        }

        [Authorize(Policy = "IsActivityHost")]
        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }));
        }


        [Authorize(Policy = "IsActivityHost")]
        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }

        [HttpPost("{id}/attend")]
        public async Task<ActionResult> Attende(Guid id)
        {
            return HandleResult(await Mediator.Send(new UpdateAttendance.Command { Id = id }));
        }


    }
}
