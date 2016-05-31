using Owin;
using AirCloud.Domain.Mapper;
namespace AirCloud.Web
{
    public static class AutomapperConfiguration
    {
        public static void UseAutomapper(this IAppBuilder appBuilder)
        {
            Domain.Mapper.AutomapperConfiguration.ConfigureMappings();
        }
    }
}