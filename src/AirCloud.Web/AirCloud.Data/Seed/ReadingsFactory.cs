﻿using System;
using System.Collections.Generic;
using System.Linq;

namespace AirCloud.Data.Seed
{
    using ent = Model.Entities;
    public class ReadingsFactory
    {
        public IEnumerable<ent::Reading> GetRandomReadings(DateTime date, int take = 1000)
        {
            return Enumerable.Range(0, take).Select(_ =>
            {
                var location = GenerateRandomLocation(new Location()
                {
                    Latitude = 43.513345,
                    Longitude = 16.4693514
                });

                var measurements = GetRandomMeasurements();
                return new ent::Reading()
                {
                    Id                  = _,
                    Latitude            = location.Latitude,
                    Longitude           = location.Longitude,
                    CoConcentration     = measurements.CoConcentration,
                    VocConcentration    = measurements.VocConcentration,
                    Humidity            = measurements.Humidity,
                    Temperature         = measurements.Temperature,
                    MeasuredOn          = date
                };
            });
        } 
       
        private Location GenerateRandomLocation(Location initialLocation)
        {
            var latitudeDirection = directionOffsets[random.NextDouble() < 0.5 ? 0 : 1];
            var latitudeDiff = random.NextDouble() * maxDelta * 1.2;

            var longitudeDirection = directionOffsets[random.NextDouble() < 0.5 ? 0 : 1];
            var longitudeDiff = random.NextDouble() * maxDelta * 2.0;

            return new Location
            {
                Latitude  =  initialLocation.Latitude  +  latitudeDirection  * latitudeDiff,
                Longitude =  initialLocation.Longitude +  longitudeDirection * longitudeDiff
            };
        }

        private Measurements GetRandomMeasurements()
        {
            return new Measurements
            {
                VocConcentration    = GetRandomPercentage(),
                CoConcentration     = GetRandomPercentage(),
                Humidity            = GetRandomPercentage(),
                Temperature         = GetRandomInteger()
            };
        }
        private int GetRandomInteger()    => random.Next(10, 36);
        private double GetRandomPercentage() => random.Next(0, 25) * 0.01;

        private readonly double                     maxDelta = 0.01;
        private readonly Random                     random = new Random();
        private readonly Dictionary<int, double>    directionOffsets = new Dictionary<int, double>()
        {
            { 0, -1 }, // negative offset
            { 1, 1  }  // positive offset
        };

        private class Measurements
        {
            public double   VocConcentration    { get; set; }
            public double   CoConcentration     { get; set; }
            public double   Temperature         { get; set; }
            public double   Humidity            { get; set; }
            public DateTime MeasuredOn          { get; set; }
        }
        private class Location
        {
            public double Latitude  { get; set; }
            public double Longitude { get; set; }
        }
    }
}