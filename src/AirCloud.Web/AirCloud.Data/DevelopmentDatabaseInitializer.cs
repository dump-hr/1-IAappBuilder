using System;
using System.Data.Entity;
using System.Linq;
using Dump.Auth.Data;

namespace AirCloud.Data
{
    using Model;
    using Seed;
    public class DevelopmentDatabaseInitializer : DropCreateDatabaseAlways<AuthDbContext>
    {
        public override void InitializeDatabase(AuthDbContext context)
        {
            context.Database.CreateIfNotExists();
            context.Database.ExecuteSqlCommand(TransactionalBehavior.DoNotEnsureTransaction, $"ALTER DATABASE {context.Database.Connection.Database} SET SINGLE_USER WITH ROLLBACK IMMEDIATE");
            base.InitializeDatabase(context);
        }
    }
}