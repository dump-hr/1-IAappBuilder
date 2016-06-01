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
            base.InitializeDatabase(context);
        }
        protected override void Seed(AirCloudContext context)
        {
            readingsFactory = new ReadingsFactory();
            
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now).ToArray(), _ => context.Readings.Add(_));
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-1)).ToArray(), _ => context.Readings.Add(_));
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-2)).ToArray(), _ => context.Readings.Add(_));

            context.SaveChanges();
        }
        private ReadingsFactory readingsFactory;
    }
}