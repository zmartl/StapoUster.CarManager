using CarManager.DataAccess.GenericRepositoryBase;
using CarManager.DataAccess.Repositories.Car;
using CarManager.DataAccess.Repositories.Planning;
using CarManager.DataAccess.Repositories.State;
using CarManager.Services.Service.Base;
using CarManager.Shared.Common;
using System;

namespace CarManager.Services.Service.Planning
{
    public class PlanningService : EntityServiceBase<Shared.Models.Planning>, IPlanningService
    {
        private readonly IRepositoryContext<Shared.Models.Planning> _repository;
        private readonly IRepositoryContext<Shared.Models.Car> _carRepository;
        private readonly IRepositoryContext<Shared.Models.State> _stateRepository;

        public PlanningService(IPlanningRepository planningRepository, ICarRepository carRepository, IStateRepository stateRepository) : base(planningRepository)
        {
            _repository = planningRepository;
            _carRepository = carRepository;
            _stateRepository = stateRepository;
        }

        public RepositoryActionResult<Shared.Models.Planning> Insert(Shared.Models.Planning entity)
        {
            if (entity.Car == null)
            {
                throw new ArgumentException();
            }

            entity.Car = _carRepository.FindSingle(entity.Car.Id);

            if (entity.State == null)
            {
                throw new ArgumentException();
            }

            entity.State = _stateRepository.FindSingle(entity.State.Id);

            _repository.Add(entity);
            var result = _repository.Save();

            if (result > 0)
            {
                return new RepositoryActionResult<Shared.Models.Planning>(entity, RepositoryActionStatus.Created);
            }

            return new RepositoryActionResult<Shared.Models.Planning>(entity, RepositoryActionStatus.NothingModified, null);
        }
    }
}
