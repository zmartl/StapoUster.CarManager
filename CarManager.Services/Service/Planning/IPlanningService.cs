using CarManager.Services.Service.Base;
using CarManager.Shared.Common;
using System;
using System.Collections.Generic;

namespace CarManager.Services.Service.Planning
{
    public interface IPlanningService : IEntityServiceBase<Shared.Models.Planning>
    { 
        new RepositoryActionResult<Shared.Models.Planning> Insert(Shared.Models.Planning entity);

        IEnumerable<Shared.Models.Planning> GetPlannedPlannings(DateTime starTime, DateTime endTime);

        int GetCountPlannedPlanningsByState(IEnumerable<Shared.Models.Planning> plannings, string state);
    }
}
