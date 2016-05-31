using System.Linq;
using System.Web.Http;
using AirCloud.Domain.Services;

namespace AirCloud.Web.Controllers
{
    using dto = AirCloud.Domain.Entities;

    public class ReadingsController : ApiController
    {
        public ReadingsController(IReadingsService readingsService)
        {
            this.readingsService = readingsService;
        }
        private readonly IReadingsService readingsService;

        public IQueryable<dto::Reading> GetAll_LongDetails() => readingsService.GetAll_LongDetails();

        public dto::Reading Create(dto::Reading createDto) => readingsService.Create(createDto);
    }
}