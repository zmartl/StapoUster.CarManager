using CarManager.Services.Service.State;
using CarManager.Shared.AutomatedMappings;
using CarManager.Shared.ViewModels;
using System;
using System.Linq;
using System.Web.Http;
using System.Web.Http.Description;

namespace CarManager.Api.Controllers
{
    [RoutePrefix("api/state")]
    public class StatesController : ApiController
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        // GET api/state
        /// <summary>
        ///     Gibt eine Liste aller Status zurück
        /// </summary>
        /// <returns>Liste der Status</returns>
        [HttpGet]
        [ResponseType(typeof(StateViewModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var allEntities = _stateService.GetAll().ToList();
                
                return Ok(allEntities.Select(AutoMapperGenerator.Mapper.Map<StateViewModel>).AsQueryable());
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // GET api/state/{id}
        /// <summary>
        ///     Gibt eine Liste aller Status zurück
        /// </summary>
        /// <returns>Liste der Status</returns>
        [HttpGet]
        [ResponseType(typeof(StateViewModel))]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var entity = _stateService.GetSingleById(id);

                return Ok(AutoMapperGenerator.Mapper.Map<StateViewModel>(entity));
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }
    }
}
