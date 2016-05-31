using System.Web.Http;
using System.Web.Mvc;
using System.Web.Routing;

namespace AirCloud.Web
{
    public class RouteConfig
    {
        public static void RegisterRoutes(RouteCollection routes)
        {
            routes.IgnoreRoute("{resource}.axd/{*pathInfo}");
        
            routes.MapHttpRoute(
               name: "DefaultApi",
               routeTemplate: "api/{controller}/{id}",
               defaults: new { id = RouteParameter.Optional }
            );

            routes.MapRoute(
               name: "Default",
               url: "{*.}",
               defaults: new { controller = "Home", action = "Index"}
            );
        }
    }
}
