using CarManager.Services.Service.Car;
using CarManager.Services.Service.Planning;
using CarManager.Services.Service.State;
using CarManager.Shared.AutomatedMappings;
using CarManager.Shared.Common;
using CarManager.Shared.Models;
using CarManager.Shared.ViewModels;
using System;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace CarManager.Api.Controllers
{
    [RoutePrefix("api/plannings")]
    public class PlanningsController : ApiController
    {
        private readonly IPlanningService _planningService;
        private readonly ICarService _carService;
        private readonly IStateService _stateService;

        public PlanningsController(IPlanningService planningService, ICarService carService, IStateService stateService)
        {
            _planningService = planningService;
            _carService = carService;
            _stateService = stateService;
        }

        // GET api/plannings
        /// <summary>
        ///     Gibt eine Liste aller Status zurück
        /// </summary>
        /// <returns>Liste der Status</returns>
        [HttpGet]
        [ResponseType(typeof(PlanningViewModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var allEntities = _planningService.GetAll().ToList();
                
                return Ok(allEntities.Select(AutoMapperGenerator.Mapper.Map<PlanningViewModel>).AsQueryable());
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // GET api/plannings/{id}
        /// <summary>
        ///     Gibt einen einzelnen Status zurück
        /// </summary>
        /// <returns>Einzelnen Status</returns>
        [HttpGet]
        [ResponseType(typeof(PlanningViewModel))]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var entity = _planningService.GetSingleById(id);

                return Ok(AutoMapperGenerator.Mapper.Map<PlanningViewModel>(entity));
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // POST api/plannings
        [HttpPost]
        [ResponseType(typeof(PlanningViewModel))]
        public IHttpActionResult Post([FromBody] PlanningViewModel planningViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                if(planningViewModel.Car.Id > 0)
                {
                    throw new ArgumentException("Nicht alle Felder wurden korrekt gesetzt");                    
                }
                planningViewModel.Car = AutoMapperGenerator.Mapper.Map<CarViewModel>(_carService.GetSingleById(planningViewModel.Car.Id));

                if (planningViewModel.State.Id > 0)
                {
                    throw new ArgumentException("Nicht alle Felder wurden korrekt gesetzt");
                }
                planningViewModel.State = AutoMapperGenerator.Mapper.Map<StateViewModel>(_stateService.GetSingleById(planningViewModel.State.Id));


                _planningService.Insert(AutoMapperGenerator.Mapper.Map<Planning>(planningViewModel));
                return CreatedAtRoute("DefaultApi", new { id = planningViewModel.Id }, planningViewModel);
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // PUT api/plannings/{id}
        [HttpPut]
        public IHttpActionResult Put([FromBody] PlanningViewModel planningViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _planningService.Update(AutoMapperGenerator.Mapper.Map<Planning>(planningViewModel));
                return Ok();
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // DELETE api/plannings/5
        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var planning = _planningService.GetSingleById(id);

                if (planning == null)
                {
                    return NotFound();
                }

                var result = _planningService.Delete(id);

                if (result.Status == RepositoryActionStatus.NothingModified)
                {
                    return StatusCode(HttpStatusCode.NotModified);
                }
                if (result.Status == RepositoryActionStatus.NotFound)
                {
                    return NotFound();
                }

                return StatusCode(HttpStatusCode.NoContent);
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }
    }
}
