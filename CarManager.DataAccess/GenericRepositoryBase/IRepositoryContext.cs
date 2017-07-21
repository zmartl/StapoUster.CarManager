using System;
using System.Linq;
using System.Linq.Expressions;
using System.Threading.Tasks;

namespace CarManager.DataAccess.GenericRepositoryBase
{
    public interface IRepositoryContext<T> : IDisposable where T : class
    {
        IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");

        Task<IQueryable<T>> GetAllASync(Expression<Func<T, bool>> filter = null,
            Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null,
            string includeProperties = "");

        T FindSingle(int id);

        Task<T> FindSingleASync(int id);

        Task<T> FindByASync(Expression<Func<T, bool>> predicate, string includeProperties = "");

        T FindBy(Expression<Func<T, bool>> predicate, string includeProperties = "");

        void Add(T toAdd);

        void AddOrUpdate(T toAddOrUpdate);

        void Update(T toUpdate);

        void Update(T oldEntity, T newEntity);

        void Delete(int id);

        void Delete(T entity);

        int Save();

        Task<int> SaveASync();
    }
}
