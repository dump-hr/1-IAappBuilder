using System.Data.Entity;
using AirCloud.Data.Model;

namespace AirCloud.Data.Configuration
{
    public class DatabaseConfiguration
    {
        public string                                   ConnectionString     { get; set; }
        public IDatabaseInitializer<AirCloudContext>    DatabaseInitializer  { get; set; }
    }
}