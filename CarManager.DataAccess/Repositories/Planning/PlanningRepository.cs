using CarManager.DataAccess.Context;
using CarManager.DataAccess.GenericRepositoryBase.RepositoryContext;

namespace CarManager.DataAccess.Repositories.Planning
{
    public class PlanningRepository : RepositoryContextImpl<Shared.Models.Planning>, IPlanningRepository
    {
        public PlanningRepository(CarManagerDbContext databaseContext) : base(databaseContext) { }
    }
}
