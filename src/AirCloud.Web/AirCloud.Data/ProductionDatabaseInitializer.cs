using System;
using System.Data.Entity;
using System.Linq;

namespace AirCloud.Data
{
    using Model;
    using Seed;
    public class ProductionDatabaseInitializer : CreateDatabaseIfNotExists<AirCloudContext>
    {
        public override void InitializeDatabase(AirCloudContext context)
        {
            context.Database.CreateIfNotExists();
            readingsFactory = new ReadingsFactory();
            base.InitializeDatabase(context);
        }

        protected override void Seed(AirCloudContext context)
        {
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now).ToArray(), _ => context.Readings.Add(_));
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-1)).ToArray(), _ => context.Readings.Add(_));
            Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-2)).ToArray(), _ => context.Readings.Add(_));

            context.SaveChanges();
        }
        private ReadingsFactory readingsFactory;
    }
}