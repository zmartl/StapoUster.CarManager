using CarManager.DataAccess.Repositories.State;
using Microsoft.Practices.Unity;

namespace CarManager.DataAccess
{
    public class RegisterDataAccessIocTypes
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IStateRepository, StateRepository>();
        }
    }
}
