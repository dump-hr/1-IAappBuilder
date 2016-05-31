using System.Data.Entity;
using AirCloud.Data.Model;

namespace AirCloud.Data
{
    public class DevelopmentDatabaseInitializer : DropCreateDatabaseAlways<AirCloudContext>
    {
        public override void InitializeDatabase(AirCloudContext context)
        {

            context.Database.CreateIfNotExists();
            // Prevents “Cannot drop database because it is currently in use” error.
            context.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, $"ALTER DATABASE {context.Database.Connection.Database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE");
            base.InitializeDatabase(context);
        }
        protected override void Seed(AirCloudContext context)
        {
            // no seeding this is hackathonnnnnn!
        }
    }
}