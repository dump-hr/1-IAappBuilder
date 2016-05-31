using System;
using System.Data.Entity;
using System.Linq;

namespace AirCloud.Data
{
    using Model;
    using Seed;
    public class DevelopmentDatabaseInitializer : DropCreateDatabaseAlways<AirCloudContext>
    {
        public override void InitializeDatabase(AirCloudContext context)
        {
            context.Database.CreateIfNotExists();
            context.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, $"ALTER DATABASE {context.Database.Connection.Database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE");
            readingsFactory = new ReadingsFactory();
            base.InitializeDatabase(context);
        }
        protected override void Seed(AirCloudContext context) => Array.ForEach(readingsFactory.GetRandomReadings().ToArray(), _ => context.Readings.Add(_));
        private ReadingsFactory readingsFactory;
    }
}