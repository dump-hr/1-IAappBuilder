using System;
using System.Linq;
using AirCloud.Data.Model;

namespace AirCloud.Data.Seed
{
    public static class Seeder
    {
        public static void SeedIfNeeded(AirCloudContext context)
        {
            if (!Triggered)
            {
                foreach (var reading in context.Readings)
                {
                    context.Readings.Remove(reading);
                }

                var readingsFactory = new ReadingsFactory();
                Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now).ToArray(), _ => context.Readings.Add(_));
                Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-1)).ToArray(), _ => context.Readings.Add(_));
                Array.ForEach(readingsFactory.GetRandomReadings(DateTime.Now.AddDays(-2)).ToArray(), _ => context.Readings.Add(_));
                context.SaveChanges();

                Triggered = true;
            }
        }

        public static bool Triggered = false;
    }
}