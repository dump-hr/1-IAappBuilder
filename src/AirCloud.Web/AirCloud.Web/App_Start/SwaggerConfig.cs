using System.Linq;
using System.Web.Http;
using WebActivatorEx;
using AirCloud.Web;
using Swashbuckle.Application;

[assembly: PreApplicationStartMethod(typeof(SwaggerConfig), "UseSwagger")]

namespace AirCloud.Web
{
    public class SwaggerConfig
    {
        public static void UseSwagger()
        {
            GlobalConfiguration.Configuration 
                .EnableSwagger(docsConfig =>
                    {
                        docsConfig.SingleApiVersion("v1", "AirCloud.Web");
                        docsConfig.ResolveConflictingActions(_ => _.First());
                        docsConfig.DescribeAllEnumsAsStrings(true);
                        docsConfig.PrettyPrint();
                        docsConfig.UseFullTypeNameInSchemaIds();
                    })
                .EnableSwaggerUi();
        }
    }
}
