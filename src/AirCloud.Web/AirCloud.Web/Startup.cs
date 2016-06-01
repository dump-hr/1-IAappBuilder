using System.Web.Http;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Owin;

[assembly: OwinStartup(typeof(AirCloud.Web.Startup))]

namespace AirCloud.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            HttpConfiguration httpConfiguration = new HttpConfiguration();
            app.UseCors(CorsOptions.AllowAll);
            app.UseConfiguredWebApi(httpConfiguration: httpConfiguration);
            app.UseAutofacForWebApi(httpConfiguration: httpConfiguration);
            app.UseAutomapper();
        }
    }
}