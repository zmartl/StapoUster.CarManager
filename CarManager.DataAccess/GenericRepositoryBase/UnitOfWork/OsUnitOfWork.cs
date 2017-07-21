using System;
using System.Data.Entity;
using System.Threading.Tasks;

using CarManager.DataAccess.GenericRepositoryBase.RepositoryBase;
using CarManager.DataAccess.GenericRepositoryBase.RepositoryService;

namespace CarManager.DataAccess.GenericRepositoryBase.UnitOfWork
{
    internal class OsUnitOfWork : IOsUnitOfWork
    {
        private readonly DbContext _dbContext;
        private readonly IRepositoryService _repositoryService;

        public OsUnitOfWork(DbContext dbContext)
        {
            _dbContext = dbContext;

            if (_repositoryService == null)
            {
                _repositoryService = new RepositoryServiceImpl();
            }

            _repositoryService.DbContext = _dbContext;
        }

        int IOsUnitOfWork.Save()
        {
            return _dbContext.SaveChanges();
        }

        Task<int> IOsUnitOfWork.SaveASync()
        {
            return _dbContext.SaveChangesAsync();
        }

        void IDisposable.Dispose()
        {
            _dbContext.Dispose();
        }

        IRepositoryBase<T> IOsUnitOfWork.GetRepository<T>()
        {
            return _repositoryService.GetGenericRepository<T>();
        }
    }
}