using System;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

using CarManager.DataAccess.GenericRepositoryBase.UnitOfWork;

namespace CarManager.DataAccess.GenericRepositoryBase.ContextBase
{
    public class ContextBaseImpl
    {
        private readonly IOsUnitOfWork _osUnitOfWork;

        public ContextBaseImpl(DbContext databaseContext)
        {
            _osUnitOfWork = new OsUnitOfWork(databaseContext);
        }

        public int Save()
        {
            return _osUnitOfWork.Save();
        }

        public Task<int> SaveASync()
        {
            return _osUnitOfWork.SaveASync();
        }

        public void Dispose()
        {
            _osUnitOfWork.Dispose();
        }

        public void Add<T>(T toAdd) where T : class
        {
            _osUnitOfWork.GetRepository<T>().Add(toAdd);
        }

        public void AddOrUpdate<T>(T toAddOrUpdate) where T : class
        {
            _osUnitOfWork.GetRepository<T>().AddOrUpdate(toAddOrUpdate);
        }

        public void Update<T>(T toUpdate) where T : class
        {
            _osUnitOfWork.GetRepository<T>().Update(toUpdate);
        }

        public void Update<T>(T oldEntity, T newEntity) where T : class
        {
            _osUnitOfWork.GetRepository<T>().Update(oldEntity, newEntity);
        }

        public void Delete<T>(T toDelete) where T : class
        {
            _osUnitOfWork.GetRepository<T>().Delete(toDelete);
        }

        public void Delete<T>(int id) where T : class
        {
            _osUnitOfWork.GetRepository<T>().Delete(id);
        }

        public T FindBy<T>(Expression<Func<T, bool>> predicate, string includeProperties = "") where T : class
        {
            return _osUnitOfWork.GetRepository<T>().FindBy(predicate, includeProperties);
        }

        public Task<T> FindByASync<T>(Expression<Func<T, bool>> predicate, string includeProperties = "") where T : class
        {
            return _osUnitOfWork.GetRepository<T>().FindByASync(predicate, includeProperties);
        }

        public T FindSingle<T>(int id) where T : class
        {
            return _osUnitOfWork.GetRepository<T>().FindSingle(id);
        }

        public Task<T> FindSingleASync<T>(int id) where T : class
        {
            return _osUnitOfWork.GetRepository<T>().FindSingleASync(id);
        }

        public IQueryable<T> GetAll<T>(Expression<Func<T, bool>> filter = null,
           Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
           string includeProperties = "") where T : class
        {
            return _osUnitOfWork.GetRepository<T>().GetAll(filter, orderBy, includeProperties);
        }

        public Task<IQueryable<T>> GetAllASync<T>(Expression<Func<T, bool>> filter = null,
           Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
           string includeProperties = "") where T : class
        {
            return _osUnitOfWork.GetRepository<T>().GetAllASync(filter, orderBy, includeProperties);
        }
    }
}
