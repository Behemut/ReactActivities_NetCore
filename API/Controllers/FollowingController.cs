﻿using Application.Followers;
using Application.Profiles;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class FollowingController : BaseApiController
    {
        [HttpPost("{username}")]
        public async Task<ActionResult> Follow(string username)
        {
            return HandleResult(await Mediator.Send(new FollowToggle.Command { TargetUsername = username }));
        }


        [HttpGet("{username}")]
        public async Task<ActionResult<List<ProfileDto>>> GetFollowings(string username, string predicate)
        {
            return HandleResult(await Mediator.Send(new ListFollowers.Query { Username = username, Predicate = predicate }));
        }


        [HttpDelete("{username}")]
        public async Task<ActionResult> Unfollow(string username)
        {
            return Ok();
        }
    }
}