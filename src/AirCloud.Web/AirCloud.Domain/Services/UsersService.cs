using System;
using System.Data.Entity;
using AirCloud.Data.Model;
using Dump.Auth.Domain.Services;

namespace AirCloud.Domain.Services
{
    using ent = AirCloud.Data.Model.Entities;
    using dto = AirCloud.Domain.Entities;

    public interface IUsersService
    {
        dto::User Register(dto::User userDto);
    }
    public class UsersService : IUsersService
    {
        public UsersService(IAirCloudContext context)
        {
            this.context = context;
            usersSet = context.UsersSet<ent::User>();
        }
        private readonly IAirCloudContext context;
        private readonly IDbSet<ent::User> usersSet;

        public dto::User Register(dto::User userDto)
        {
            var userToCreate = AutoMapper.Mapper.Instance.Map<ent::User>(userDto);
            userToCreate.UserId = Guid.NewGuid();
            userToCreate.HashedPassword = new PasswordService().Hash(userDto.Password);
            usersSet.Add(userToCreate);
            context.SaveChanges();
            return AutoMapper.Mapper.Instance.Map<dto::User>(userToCreate);
        }
    }
}