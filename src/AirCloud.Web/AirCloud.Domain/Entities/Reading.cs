using System;

namespace AirCloud.Domain.Entities
{
    public class Reading
    {
        public int          Id                  { get; set; }
        public double       Latitude            { get; set; }
        public double       Longitude           { get; set; }
        public double       VocConcentration    { get; set; }
        public double       CoConcentration     { get; set; }
        public double       Temperature         { get; set; }
        public double       Humidity            { get; set; }
        public DateTime     MeasuredOn          { get; set; }
    }
}