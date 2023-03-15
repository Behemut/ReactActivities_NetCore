﻿using Application.Photos;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        [HttpPost]
        public async Task<ActionResult> AddPhoto([FromForm] AddPhoto.Command command)
        {
            return HandleResult(await Mediator.Send(command));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeletePhoto(string id)
        {
            return HandleResult(await Mediator.Send(new DeletePhoto.Command { Id = id }));
        }

        [HttpPost("{id}/setMain")]
        public async Task<ActionResult> SetMain(string id)
        {
            return HandleResult(await Mediator.Send(new SetMain.Command { Id = id }));
        }

    }
}
