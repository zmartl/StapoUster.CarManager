using CarManager.DataAccess.GenericRepositoryBase;
using CarManager.Shared.Common;
using CarManager.Shared.Models;
using System.Linq;
using CarManager.DataAccess.Repositories.State;

namespace CarManager.Services.Service.Base
{
    public class EntityServiceBase<T> : IEntityServiceBase<T> where T : EntityBase
    {
        private readonly IRepositoryContext<T> _repository;
        private IStateRepository stateRepository;

        public EntityServiceBase(IRepositoryContext<T> repository)
        {
            _repository = repository;
        }

        public IQueryable<T> GetAll()
        {
            return _repository.GetAll();
        }

        public T GetSingleById(int id)
        {
            return _repository.FindSingle(id);
        }

        public RepositoryActionResult<T> Insert(T entity)
        {
            _repository.Add(entity);
            var result = _repository.Save();

            if (result > 0)
            {
                return new RepositoryActionResult<T>(entity, RepositoryActionStatus.Created);
            }

            return new RepositoryActionResult<T>(entity, RepositoryActionStatus.NothingModified, null);
        }

        public RepositoryActionResult<T> Update(T entity)
        {
            T existingEntity = _repository.FindSingle(entity.Id);

            if (existingEntity == null)
            {
                return new RepositoryActionResult<T>(entity, RepositoryActionStatus.NotFound);
            }

            _repository.Update(entity);

            var result = _repository.Save();
            if (result > 0)
            {
                return new RepositoryActionResult<T>(entity, RepositoryActionStatus.Updated);
            }

            return new RepositoryActionResult<T>(entity, RepositoryActionStatus.NothingModified, null);
        }

        public virtual RepositoryActionResult<T> Update(T oldEntity, T newEntity)
        {
            T existingEntity = _repository.FindSingle(oldEntity.Id);

            if (existingEntity == null)
            {
                return new RepositoryActionResult<T>(oldEntity, RepositoryActionStatus.NotFound);
            }

            _repository.Update(oldEntity, newEntity);

            var result = _repository.Save();
            if (result > 0)
            {
                return new RepositoryActionResult<T>(oldEntity, RepositoryActionStatus.Updated);
            }

            return new RepositoryActionResult<T>(oldEntity, RepositoryActionStatus.NothingModified, null);
        }

        public virtual RepositoryActionResult<T> Delete(int id)
        {
            T existingEntity = _repository.FindSingle(id);

            if (existingEntity == null)
            {
                return new RepositoryActionResult<T>(null, RepositoryActionStatus.NotFound);
            }

            _repository.Delete(existingEntity);

            var result = _repository.Save();
            if (result > 0)
            {
                return new RepositoryActionResult<T>(null, RepositoryActionStatus.Deleted);
            }

            return new RepositoryActionResult<T>(null, RepositoryActionStatus.NothingModified, null);
        }
    }
}
