using System;
using System.Data.Entity;
using System.Linq;
using Dump.Auth.Data;

namespace AirCloud.Data
{
    using Model;
    using Seed;
    public class ProductionDatabaseInitializer : CreateDatabaseIfNotExists<AuthDbContext>
    {
        public override void InitializeDatabase(AuthDbContext context)
        {
            context.Database.CreateIfNotExists();
            base.InitializeDatabase(context);
        }
    }
}