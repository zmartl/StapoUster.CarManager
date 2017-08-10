using CarManager.DataAccess.Context;
using CarManager.DataAccess.GenericRepositoryBase.RepositoryContext;

namespace CarManager.DataAccess.Repositories.Car
{
    public class CarRepository : RepositoryContextImpl<Shared.Models.Car>, ICarRepository
    {
        public CarRepository(CarManagerDbContext databaseContext) : base(databaseContext) { }
    }
}
