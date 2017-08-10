using CarManager.DataAccess.Repositories.Car;
using CarManager.Services.Service.Base;

namespace CarManager.Services.Service.Car
{
    public class CarService : EntityServiceBase<Shared.Models.Car>, ICarService
    {
        public CarService(ICarRepository carRepository) : base(carRepository)
        { 
        }
    }
}
