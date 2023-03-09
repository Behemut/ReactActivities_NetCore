using Application.Activities;
using Domain;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class ActivitiesController : BaseApiController
    {
        //Get all activities
        [HttpGet]
        public async Task<ActionResult<List<Activity>>> GetActivities()
        {
            return HandleResult(await Mediator.Send(new ListActivity.Query()));
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
            return HandleResult(await Mediator.Send(new CreateActivity.Command { Activity = activity}));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> EditActivity(Guid id, Activity activity)
        {
            activity.Id = id;
            return HandleResult(await Mediator.Send(new EditActivity.Command { Activity = activity }));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteActivity(Guid id)
        {
            return HandleResult(await Mediator.Send(new DeleteActivity.Command { Id = id }));
        }
    }
}
