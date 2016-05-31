using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AirCloud.Data.Model.Entities
{
    public class Reading
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int          Id                  { get; set; }

        public double       Latitude            { get; set; }
        public double       Longitude           { get; set; }
        public double       VocConcentration    { get; set; }
        public double       CoConcentration     { get; set; }
        public double       Temperature         { get; set; }
        public DateTime     MeasuredOn          { get; set; }
    }
}