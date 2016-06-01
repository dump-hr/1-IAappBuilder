using System;
using System.Linq;
using System.Web.Http;

namespace AirCloud.Web.Controllers
{
    using dto = Domain.Entities;
    using service = Domain.Services;

    public class ReadingsController : ApiController
    {
        public ReadingsController(service::IReadingsService readingsService)
        {
            this.readingsService = readingsService;
        }
        private readonly service::IReadingsService readingsService;

        public dto::Reading Create(dto::Reading createDto) => readingsService.Create(createDto);

        public IQueryable<dto::Reading> GetAll_LongDetails([FromUri] int take = int.MaxValue)
         => readingsService.GetAll_LongDetails(take: take);

        [HttpPost]
        public IQueryable<dto::Reading> GetAll_LongDetailsForDate([FromBody] DateTime date)
            => readingsService.GetAll_LongDetailsForDate(date);

        public object GetGlobalAverages()
        {
            var globalAverages = readingsService.GetGlobalAverages();
            return new
            {
                co = globalAverages.Item1,
                voc = globalAverages.Item2
            };
        }
    }
}