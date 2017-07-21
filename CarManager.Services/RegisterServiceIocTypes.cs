using CarManager.Services.Service.State;
using Microsoft.Practices.Unity;

namespace CarManager.Services
{
    public static class RegisterServicesIocTypes
    {
        public static void RegisterTypes(IUnityContainer container)
        {
            container.RegisterType<IStateService, StateService>();
        }
    }
}
