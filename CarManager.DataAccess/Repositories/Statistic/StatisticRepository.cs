using CarManager.DataAccess.Context;
using CarManager.DataAccess.GenericRepositoryBase.RepositoryContext;

namespace CarManager.DataAccess.Repositories.Statistic
{
    public class StatisticRepository : RepositoryContextImpl<Shared.Models.Statistic>, IStatisticRepository
    {
        public StatisticRepository(CarManagerDbContext databaseContext) : base(databaseContext) { }
    }
}
