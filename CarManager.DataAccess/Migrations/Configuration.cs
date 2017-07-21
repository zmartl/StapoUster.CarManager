using CarManager.DataAccess.Context;
using CarManager.Shared.Models;
using System.Collections.Generic;
using System.Data.Entity;

namespace CarManager.DataAccess.Migrations
{

    internal sealed class Configuration<T> : CreateDatabaseIfNotExists<CarManagerDbContext>
    {

        protected override void Seed(CarManagerDbContext context)
        {
            var states = new List<State>();
            states.Add(new State { Name = "VePo" });
            states.Add(new State { Name = "Regio" });

            context.States.AddRange(states);

            context.SaveChanges();
        }
    }
}
