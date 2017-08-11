using CarManager.Services.Service.Base;
using CarManager.Shared.Common;

namespace CarManager.Services.Service.Statistic
{
    public interface IStatisticService : IEntityServiceBase<Shared.Models.Statistic>
    { 
        new RepositoryActionResult<Shared.Models.Statistic> Insert(Shared.Models.Statistic entity);
    }
}
