using System;
using System.Linq;
using AirCloud.Data.Model;

namespace AirCloud.Domain.Services
{
    using ent = AirCloud.Data.Model.Entities;
    using dto = AirCloud.Domain.Entities;

    public interface IReadingsService
    {
        dto::Reading Create(dto::Reading readingDto);
        IQueryable<dto::Reading> GetAll_LongDetails(int take = int.MaxValue);
    }
    public class ReadingsService : IReadingsService
    {
        public ReadingsService(IAirCloudContext context)
        {
            this.context = context;
        }
        private readonly IAirCloudContext context;

        public dto::Reading Create(dto::Reading readingDto)
        {
            var reading = AutoMapper.Mapper.Instance.Map<ent::Reading>(readingDto);
            reading.MeasuredOn = DateTime.Now;
            context.Readings.Add(reading);
            context.SaveChanges();
            return AutoMapper.Mapper.Instance.Map<dto::Reading>(reading);
        }

        public IQueryable<dto::Reading> GetAll_LongDetails(int take = int.MaxValue)
            => context.Readings
                .OrderByDescending(reading => reading.MeasuredOn)
                .Take(take)
                .ToArray()
                .Select(AutoMapper.Mapper.Instance.Map<dto::Reading>)
                .AsQueryable();
    }
}