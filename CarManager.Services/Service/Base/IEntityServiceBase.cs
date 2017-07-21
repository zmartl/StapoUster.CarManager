using System.Linq;

using CarManager.Shared.Common;
using System.Collections.Generic;

namespace CarManager.Services.Service.Base
{
    public interface IEntityServiceBase<T> where T : class
    {
        IQueryable<T> GetAll();
        T GetSingleById(int id);
        RepositoryActionResult<T> Insert(T entity);
        RepositoryActionResult<T> Update(T entity);
        RepositoryActionResult<T> Update(T oldEntity, T newEntity);
        RepositoryActionResult<T> Delete(int id);
    }
}
