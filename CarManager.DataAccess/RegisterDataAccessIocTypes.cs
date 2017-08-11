using CarManager.DataAccess.Repositories.Car;
using CarManager.DataAccess.Repositories.Planning;
using CarManager.DataAccess.Repositories.State;
using CarManager.DataAccess.Repositories.Statistic;
using Microsoft.Practices.Unity;

namespace CarManager.DataAccess
{
    public class RegisterDataAccessIocTypes
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<ICarRepository, CarRepository>();
            container.RegisterType<IPlanningRepository, PlanningRepository>();
            container.RegisterType<IStateRepository, StateRepository>();
            container.RegisterType<IStatisticRepository, StatisticRepository>();

        }
    }
}
