using System.Web.Http;
using Microsoft.Owin;
using Owin;

[assembly: OwinStartup(typeof(AirCloud.Web.Startup))]

namespace AirCloud.Web
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            app.UseAutofacForWebApi(httpConfiguration: GlobalConfiguration.Configuration);      
        }
    }
}