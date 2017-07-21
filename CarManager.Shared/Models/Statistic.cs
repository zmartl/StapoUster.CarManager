using System;

namespace CarManager.Shared.Models
{
    public class Statistic : EntityBase
    {
        public Car Car { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreationDate { get; set; }
        public string Creator { get; set; }
    }
}
