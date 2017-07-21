using System;

namespace CarManager.Shared.ViewModels
{
    public class StatisticViewModel
    {
        public int Id { get; set; }
        public CarViewModel Car { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreationDate { get; set; }
        public string Creator { get; set; }
    }
}
