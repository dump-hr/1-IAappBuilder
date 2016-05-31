using System.Data.Entity;
using Dump.Auth.Data;

namespace AirCloud.Data.Model
{
    using ent = Entities;

    public interface IAirCloudContext : IAuthDbContext
    {
        IDbSet<ent::Reading> Readings { get; set; }
        IDbSet<ent::User> UsersSet<TUser>();
    }
    public class AirCloudContext : AuthDbContext, IAirCloudContext
    {
        public AirCloudContext(IAuthContextConfig config) : base(config)
        {
            Database.SetInitializer(strategy: config.DatabaseInitializer);
        }

        public virtual IDbSet<ent::Reading> Readings { get; set; }
        public IDbSet<ent::User> UsersSet<TUser>()
        {
            return Set<ent::User>();
        }
    }
}