using System.Configuration;
using System.Data.Entity;
using System.Web.Http;
using AirCloud.Data;
using AirCloud.Data.Configuration;
using AirCloud.Data.Model;
using Dump.Auth.Data;
using Dump.Auth.Domain.Commands;
using Dump.Auth.Domain.Services;
using Dump.Auth.Integration.Configuration;
using Dump.Auth.ResourceOwner;
using Dump.Auth.Server;
using Dump.Auth.Server.Stores;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.DataHandler.Encoder;
using Owin;

[assembly: OwinStartup(typeof(AirCloud.Web.Startup))]

namespace AirCloud.Web
{
    public class Startup
    {
        private void ConfigureAuth(IAppBuilder app)
        {
            var databaseInitializer =
            ConfigurationManager.AppSettings["EnviromentName"] == "Localhost"
                ? (IDatabaseInitializer<AuthDbContext>)new DevelopmentDatabaseInitializer()
                : (IDatabaseInitializer<AuthDbContext>)new ProductionDatabaseInitializer();

            var connectionString =
                ConfigurationManager.AppSettings["EnviromentName"] == "Localhost"
                    ? ConfigurationManager.AppSettings["AirCloudLocalDb"]
                    : ConfigurationManager.AppSettings["AirCloudProductionDb"];
            var databaseConfiguration = new DatabaseConfiguration()
            {
                ConnectionString = connectionString,
                DatabaseInitializer = databaseInitializer
            };

            // configurePersistentStore
            var authContextConfiguration = new Configurations.AuthContextConfiguration(
                connectionString: connectionString,
                databaseInitializer: databaseInitializer
            );

            // configureAuthServer
            var authServerOptions = new Configurations.AuthServerOptions(
                authServerConfiguration: new AuthServerConfiguration
                {
                    IssuerUrl = "dumpAuthServer"
                },
                userCommand: new UserCommand(new AuthDbContext(authContextConfiguration), new PasswordService()));


            var dbContext = new AuthDbContext(authContextConfiguration);
            var userCommand = new UserCommand(dbContext, new PasswordService());

            app.UseCors(CorsOptions.AllowAll);
            app.UseDumpAuthServer(authServerOptions);

            // create default audience
            var audience = AudiencesStore.Instance.AddAudience("AirCloudAudience", "4fe205ad1b524c2a9cbd4a9d33add4f2");

            // use resource owner with created default audience, authServer issuerUrl and secret symmetric key for validation
            app.UseDumpResourceOwner(new ResourceOwnerOptions()
            {
                Audiences = new[] { new AudienceOptions() { ClientKey = audience.ClientId, Name = audience.Name, SecretKey = TextEncodings.Base64Url.Decode(audience.SecretAsBase64) } }, //create audience validation configuration
                IssuerName = "dumpAuthServer",
                SecretKey = TextEncodings.Base64Url.Decode(audience.SecretAsBase64)
            });
        }
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
            HttpConfiguration httpConfiguration = new HttpConfiguration();
            app.UseConfiguredWebApi(httpConfiguration: httpConfiguration);
            app.UseAutofacForWebApi(httpConfiguration: httpConfiguration);
            app.UseAutomapper();
        }
    }
}