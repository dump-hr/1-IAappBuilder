using System;

namespace AirCloud.Domain.Entities
{
    public class User
    {
        public string   Password      { get; set; }
        public Guid     UserId              { get; set; }
        public string   UserName            { get; set; }
        public string   Email               { get; set; }
    }
}