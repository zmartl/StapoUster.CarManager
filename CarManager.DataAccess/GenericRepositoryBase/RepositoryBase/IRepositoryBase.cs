using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CarManager.DataAccess.GenericRepositoryBase.RepositoryBase
{
    public interface IRepositoryBase<T> where T : class
    {
        IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null,
                      Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                      string includeProperties = "");

        Task<IQueryable<T>> GetAllASync(Expression<Func<T, bool>> filter = null,
                     Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
                     string includeProperties = "");

        T FindSingle(int id);

        Task<T> FindSingleASync(int id);

        T FindBy(Expression<Func<T, bool>> predicate, string includeProperties = "");

        Task<T> FindByASync(Expression<Func<T, bool>> predicate, string includeProperties = "");

        void Add(T toAdd);

        void AddOrUpdate(T toAddOrUpdate);

        void Update(T toUpdate);

        void Update(T oldEntity, T newEntity);

        void Delete(int id);

        void Delete(T entity);
    }
}