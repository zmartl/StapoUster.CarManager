using CarManager.DataAccess.GenericRepositoryBase;
using CarManager.DataAccess.Repositories.Car;
using CarManager.DataAccess.Repositories.Statistic;
using CarManager.Services.Service.Base;
using CarManager.Shared.Common;
using System;

namespace CarManager.Services.Service.Statistic
{
    public class StatisticService : EntityServiceBase<Shared.Models.Statistic>, IStatisticService
    {
        private readonly IRepositoryContext<Shared.Models.Statistic> _repository;
        private readonly IRepositoryContext<Shared.Models.Car> _carRepository;

        public StatisticService(IStatisticRepository planningRepository, ICarRepository carRepository) : base(planningRepository)
        {
            _repository = planningRepository;
            _carRepository = carRepository;
        }

        

        public new RepositoryActionResult<Shared.Models.Statistic> Insert(Shared.Models.Statistic entity)
        {
            if (entity.Car == null)
            {
                throw new ArgumentException();
            }

            entity.Car = _carRepository.FindSingle(entity.Car.Id);

            _repository.Add(entity);
            var result = _repository.Save();

            if (result > 0)
            {
                return new RepositoryActionResult<Shared.Models.Statistic>(entity, RepositoryActionStatus.Created);
            }

            return new RepositoryActionResult<Shared.Models.Statistic>(entity, RepositoryActionStatus.NothingModified, null);
        }
    }
}
