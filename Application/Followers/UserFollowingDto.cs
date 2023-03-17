using Domain;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Application.Followers
{
    public class UserFollowingDto
    {
        public string ObserverId { get; set; }
        public string TargetId { get; set; }
    }
}
