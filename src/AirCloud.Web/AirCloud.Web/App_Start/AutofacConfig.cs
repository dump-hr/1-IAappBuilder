using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Reflection;
using System.Web.Http;
using AirCloud.Data;
using AirCloud.Data.Configuration;
using AirCloud.Data.Model;
using AirCloud.Domain.Services;
using AirCloud.Web.Controllers;
using Autofac;
using Autofac.Core;
using Autofac.Integration.WebApi;
using Dump.Auth.Data;
using Dump.Auth.Integration.Configuration;
using Owin;

namespace AirCloud.Web
{
    public static class AutofacConfig
    {
        public static void UseAutofacForWebApi(this IAppBuilder app, HttpConfiguration httpConfiguration)
        {
            var builder = new ContainerBuilder();
            ConfigureAssemblyScanning(builder);
            ConfigureCustomDependecyMappings(builder);

            builder.RegisterApiControllers(Assembly.GetExecutingAssembly());
            builder.RegisterWebApiFilterProvider(httpConfiguration);

            var container = builder.Build();

            app.UseAutofacMiddleware(container);
            app.UseAutofacWebApi(configuration: httpConfiguration);

            httpConfiguration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
            GlobalConfiguration.Configuration.DependencyResolver = new AutofacWebApiDependencyResolver(container);
        }

        private static void ConfigureAssemblyScanning(ContainerBuilder builder)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies();

            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Repository"))
                .AsImplementedInterfaces()
                .InstancePerRequest();

            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Service"))
                .AsImplementedInterfaces()
                .InstancePerRequest();

            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Command"))
                .AsImplementedInterfaces()
                .InstancePerRequest();

            builder.RegisterAssemblyTypes(assemblies)
                .Where(t => t.Name.EndsWith("Factory"))
                .AsImplementedInterfaces()
                .InstancePerRequest();
        }

        private static void ConfigureCustomDependecyMappings(ContainerBuilder builder)
        {
            builder.RegisterType<ReadingsService>().As<IReadingsService>()
                .AsImplementedInterfaces()
                .InstancePerRequest();
            builder.RegisterType<UsersService>().As<IUsersService>()
               .AsImplementedInterfaces()
               .InstancePerRequest();

            var databaseInitializer =
          ConfigurationManager.AppSettings["EnviromentName"] == "Localhost"
              ? (IDatabaseInitializer<AuthDbContext>)new DevelopmentDatabaseInitializer()
              : (IDatabaseInitializer<AuthDbContext>)new ProductionDatabaseInitializer();

            var connectionString =
                ConfigurationManager.AppSettings["EnviromentName"] == "Localhost"
                    ? ConfigurationManager.AppSettings["AirCloudLocalDb"]
                    : ConfigurationManager.AppSettings["AirCloudProductionDb"];

            var authContextConfiguration = new Configurations.AuthContextConfiguration(
                connectionString: connectionString,
                databaseInitializer: databaseInitializer
            );

            builder.RegisterType<AirCloudContext>()
                .WithParameters(new List<Parameter> {
                    new NamedParameter("config", authContextConfiguration)
                }).As<IAirCloudContext>();

            builder.Register<AirCloudContext>((x) => new AirCloudContext(config: authContextConfiguration));
        }
    }
}