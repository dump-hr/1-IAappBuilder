using System;
using System.Linq;
using System.Web.Http;

namespace AirCloud.Web.Controllers
{
    using dto     = Domain.Entities;
    using service = Domain.Services;

    public class ReadingsController : ApiController
    {
        public ReadingsController(service::IReadingsService readingsService)
        {
            this.readingsService = readingsService;
        }
        private readonly service::IReadingsService readingsService;

        public IQueryable<dto::Reading> GetAll_LongDetails([FromUri] DateTime date, [FromUri] int take = int.MaxValue) => readingsService.GetAll_LongDetails(take: take);

        public dto::Reading Create(dto::Reading createDto) => readingsService.Create(createDto);

        public DateTime GetFirstDateWithReading() => readingsService.GetFirstDateWithEntry();

        [HttpPost]
        public IQueryable<dto::Reading> GetAll_LongDetailsForDate([FromBody] DateTime date)
        {
            var a = readingsService.GetAll_LongDetailsForDate(date);

            return a;
        }
    }
}