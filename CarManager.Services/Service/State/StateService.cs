using CarManager.DataAccess.Repositories.State;
using CarManager.Services.Service.Base;

namespace CarManager.Services.Service.State
{
    public class StateService : EntityServiceBase<Shared.Models.State>, IStateService
    {
        public StateService(IStateRepository stateRepository) : base(stateRepository)
        { 
        }
    }
}
