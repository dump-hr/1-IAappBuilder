using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http;
using AirCloud.Web.Controllers;
using Autofac;
using Autofac.Integration.WebApi;
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
            builder.RegisterType<Test>().As<ITestService>().AsImplementedInterfaces().InstancePerRequest();
        }
    }
}