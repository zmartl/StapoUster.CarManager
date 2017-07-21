using System;
using System.Threading.Tasks;

using CarManager.DataAccess.GenericRepositoryBase.RepositoryBase;

namespace CarManager.DataAccess.GenericRepositoryBase.UnitOfWork
{
    internal interface IOsUnitOfWork : IDisposable
    {
        IRepositoryBase<T> GetRepository<T>() where T : class;

        int Save();

        Task<int> SaveASync();
    }
}