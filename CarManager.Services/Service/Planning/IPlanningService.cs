using CarManager.Services.Service.Base;
using CarManager.Shared.Common;

namespace CarManager.Services.Service.Planning
{
    public interface IPlanningService : IEntityServiceBase<Shared.Models.Planning>
    { 
        RepositoryActionResult<Shared.Models.Planning> Insert(Shared.Models.Planning entity);
    }
}
