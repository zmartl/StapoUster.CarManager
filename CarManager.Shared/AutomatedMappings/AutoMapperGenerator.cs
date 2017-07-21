using AutoMapper;

using CarManager.Shared.Models;
using CarManager.Shared.ViewModels;

namespace CarManager.Shared.AutomatedMappings
{
    public static class AutoMapperGenerator
    {
        public static IMapper Mapper;
        public static void GenerateMappings()
        {
            var config = new MapperConfiguration(cfg =>
            {               
                cfg.CreateMap<Car, CarViewModel>().ReverseMap();
                cfg.CreateMap<Planning, PlanningViewModel>().ReverseMap();
                cfg.CreateMap<State, StateViewModel>().ReverseMap();
                cfg.CreateMap<Statistic, StatisticViewModel>().ReverseMap();
            });
            config.AssertConfigurationIsValid();
            Mapper = config.CreateMapper();
        }
    }

}