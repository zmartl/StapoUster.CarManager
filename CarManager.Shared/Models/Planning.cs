using System;
using System.Collections.Generic;
using System.Text;

namespace CarManager.Shared.Models
{
    public class Planning : EntityBase
    {
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public virtual Car Car { get; set; }
        public virtual State State { get; set; }
    }
}
