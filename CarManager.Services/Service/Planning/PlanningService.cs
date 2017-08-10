using CarManager.DataAccess.Repositories.Planning;
using CarManager.Services.Service.Base;

namespace CarManager.Services.Service.Planning
{
    public class PlanningService : EntityServiceBase<Shared.Models.Planning>, IPlanningService
    {
        public PlanningService(IPlanningRepository stateRepository) : base(stateRepository)
        { 
        }
    }
}
