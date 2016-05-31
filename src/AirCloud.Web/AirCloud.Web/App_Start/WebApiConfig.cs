using System.Linq;
using System.Web.Http;
using Microsoft.Owin.Cors;
using Newtonsoft.Json.Converters;
using Newtonsoft.Json.Serialization;
using Owin;

namespace AirCloud.Web
{
    public static class WebApiConfig
    {
        public static void UseConfiguredWebApi(this IAppBuilder app, HttpConfiguration httpConfiguration)
        {
            httpConfiguration.MapHttpAttributeRoutes();

            var xmlFormatterMediaType = httpConfiguration.Formatters.XmlFormatter.SupportedMediaTypes.FirstOrDefault(mediaType => mediaType.MediaType == "application/xml");
            httpConfiguration.Formatters.XmlFormatter.SupportedMediaTypes.Remove(xmlFormatterMediaType);
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            httpConfiguration.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new StringEnumConverter());
            httpConfiguration.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            GlobalConfiguration.Configuration.Formatters.XmlFormatter.SupportedMediaTypes.Remove(xmlFormatterMediaType);
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.SerializerSettings.Converters.Add(new StringEnumConverter());
            GlobalConfiguration.Configuration.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            app.UseCors(CorsOptions.AllowAll);
            app.UseWebApi(httpConfiguration);
        }
    }
}
