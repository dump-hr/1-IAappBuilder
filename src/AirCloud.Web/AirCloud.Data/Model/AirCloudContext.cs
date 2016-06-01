using System.Data.Entity;
using AirCloud.Data.Configuration;

namespace AirCloud.Data.Model
{
    using ent = Entities;

    public interface IAirCloudContext
    {
        IDbSet<ent::Reading> Readings { get; set; }
        int SaveChanges();
    }
    public class AirCloudContext : DbContext, IAirCloudContext
    {
        public AirCloudContext(DatabaseConfiguration databaseConfiguration) : base(nameOrConnectionString: databaseConfiguration.ConnectionString)
        {
            Database.SetInitializer(strategy: databaseConfiguration.DatabaseInitializer);
        }
        public virtual IDbSet<ent::Reading> Readings { get; set; }
    }
}