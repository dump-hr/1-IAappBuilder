using System.Web.Http;

namespace AirCloud.Web.Controllers
{
    using service = Domain.Services;
    using dto = Domain.Entities;

    [AllowAnonymous]
    public class UsersController : ApiController
    {
        public UsersController(service::IUsersService usersService)
        {
            this.usersService = usersService;
        }
        private readonly service::IUsersService usersService;

        [HttpPost]
        public dto::User Create(dto::User createDto) => usersService.Register(userDto: createDto);
    }
}
