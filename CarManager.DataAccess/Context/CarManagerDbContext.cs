using CarManager.Shared.Models;
using System.Data.Entity;

namespace CarManager.DataAccess.Context
{
    public class CarManagerDbContext : DbContext
    {
        // Der Kontext wurde für die Verwendung einer CarManagerDbContext-Verbindungszeichenfolge aus der 
        // Konfigurationsdatei ('App.config' oder 'Web.config') der Anwendung konfiguriert. Diese Verbindungszeichenfolge hat standardmäßig die 
        // Datenbank 'CarManager.DataAccess.Context.CarManagerDbContext' auf der LocalDb-Instanz als Ziel. 
        // 
        // Wenn Sie eine andere Datenbank und/oder einen anderen Anbieter als Ziel verwenden möchten, ändern Sie die CarManagerDbContext-Zeichenfolge 
        // in der Anwendungskonfigurationsdatei.
        public CarManagerDbContext() : base("name=CarManagerDbContext")
        {
            Configuration.LazyLoadingEnabled = true;

            Database.SetInitializer(new Migrations.Configuration<CarManagerDbContext>());

            Database.Initialize(true);
        }


        // Fügen Sie ein 'DbSet' für jeden Entitätstyp hinzu, den Sie in das Modell einschließen möchten. Weitere Informationen 
        // zum Konfigurieren und Verwenden eines Code First-Modells finden Sie unter 'http://go.microsoft.com/fwlink/?LinkId=390109'.

        public virtual DbSet<State> States { get; set; }
        public virtual DbSet<Car> Cars { get; set; }
        public virtual DbSet<Planning> Plannings { get; set; }
        public virtual DbSet<Statistic> Statistics { get; set; } 
}
}