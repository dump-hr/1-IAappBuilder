using System.Reflection;
using AutoMapper;

namespace AirCloud.Domain.Mapper
{
    using ent = AirCloud.Data.Model.Entities;
    using dto = AirCloud.Domain.Entities;
    public static class AutomapperConfiguration
    {
        public static void ConfigureMappings()
        {
            AutoMapper.Mapper.Initialize((mapperConfiguration) =>
            {
                mapperConfiguration.CreateMap<ent::Reading, dto::Reading>()
                    .ReverseMap()
                    .IgnoreAllUnresolved();
            });
        }

        private static void IgnoreAllUnresolved<TSource, TDestination>(this IMappingExpression<TSource, TDestination> expression)
        {
            var flags = BindingFlags.Public | BindingFlags.Instance;
            var sourceType = typeof(TSource);
            var destinationProperties = typeof(TDestination).GetProperties(flags);

            foreach (var property in destinationProperties)
            {
                if (sourceType.GetProperty(property.Name, flags) == null)
                {
                    expression.ForMember(property.Name, opt => opt.Ignore());
                }
            }
        }
    }
}