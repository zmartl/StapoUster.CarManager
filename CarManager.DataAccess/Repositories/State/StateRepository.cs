using CarManager.DataAccess.Context;
using CarManager.DataAccess.GenericRepositoryBase.RepositoryContext;

namespace CarManager.DataAccess.Repositories.State
{
    public class StateRepository : RepositoryContextImpl<Shared.Models.State>, IStateRepository
    {
        public StateRepository(CarManagerDbContext databaseContext) : base(databaseContext) { }
    }
}
