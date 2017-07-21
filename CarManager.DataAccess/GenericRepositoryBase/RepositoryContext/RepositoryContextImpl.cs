using CarManager.DataAccess.GenericRepositoryBase.ContextBase;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace CarManager.DataAccess.GenericRepositoryBase.RepositoryContext
{
    public class RepositoryContextImpl<T> : ContextBaseImpl, IRepositoryContext<T> where T : class
    {
        public RepositoryContextImpl(DbContext databaseContext)
            : base(databaseContext)
        {

        }

        public IQueryable<T> GetAll(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            return base.GetAll(filter, orderBy, includeProperties);
        }

        public Task<IQueryable<T>> GetAllASync(Expression<Func<T, bool>> filter = null, Func<IQueryable<T>, IOrderedQueryable<T>> orderBy = null, string includeProperties = "")
        {
            return base.GetAllASync(filter, orderBy, includeProperties);
        }

        public virtual T FindSingle(int id)
        {
            return base.FindSingle<T>(id);
        }

        public Task<T> FindSingleASync(int id)
        {
            return base.FindSingleASync<T>(id);
        }

        public Task<T> FindByASync(Expression<Func<T, bool>> predicate, string includeProperties = "")
        {
            return base.FindByASync(predicate, includeProperties);
        }

        public virtual T FindBy(Expression<Func<T, bool>> predicate, string includeProperties = "")
        {
            return base.FindBy(predicate, includeProperties);
        }

        public virtual void Add(T toAdd)
        {
            base.Add(toAdd);
        }

        public virtual void AddOrUpdate(T toAddOrUpdate)
        {
            base.AddOrUpdate(toAddOrUpdate);
        }

        public virtual void Update(T toUpdate)
        {
            base.Update(toUpdate);
        }

        public virtual void Update(T oldEntity, T newEntity)
        {
            base.Update(oldEntity, newEntity);
        }

        public virtual void Delete(int id)
        {
            base.Delete<T>(id);
        }

        public virtual void Delete(T entity)
        {
            base.Delete<T>(entity);
        }
    }
}
