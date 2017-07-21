using System;
using System.Collections.Generic;
using System.Text;

namespace CarManager.Shared.ViewModels
{
    public class PlanningViewModel
    {
        public int Id { get; set; }
        public DateTime StartTime { get; set; }
        public DateTime EndTime { get; set; }
        public virtual CarViewModel Car { get; set; }
        public virtual StateViewModel State { get; set; }
    }
}
