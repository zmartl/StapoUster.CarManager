using System;
using System.Data.Entity;

using CarManager.DataAccess.GenericRepositoryBase.RepositoryBase;

namespace CarManager.DataAccess.GenericRepositoryBase.RepositoryService
{
    internal interface IRepositoryService
    {
        DbContext DbContext { get; set; }

        IRepositoryBase<T> GetGenericRepository<T>() where T : class;

        T GetCustomRepository<T>(Func<DbContext, object> factory = null) where T : class;
    }
}