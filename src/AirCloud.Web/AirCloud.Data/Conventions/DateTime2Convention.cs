﻿using System;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace AirCloud.Data.Conventions
{
    public class DateTime2Convention : Convention
    {
        public DateTime2Convention()
        {
            Properties<DateTime>().Configure(c => c.HasColumnType("datetime2"));
        }
    }
}