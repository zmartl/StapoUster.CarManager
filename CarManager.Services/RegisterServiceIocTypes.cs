using CarManager.Services.Service.Car;
using CarManager.Services.Service.Planning;
using CarManager.Services.Service.State;
using CarManager.Services.Service.Statistic;
using Microsoft.Practices.Unity;

namespace CarManager.Services
{
    public static class RegisterServicesIocTypes
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<ICarService, CarService>();
            container.RegisterType<IPlanningService, PlanningService>();
            container.RegisterType<IStateService, StateService>();
            container.RegisterType<IStatisticService, StatisticService>();
        }
    }
}
