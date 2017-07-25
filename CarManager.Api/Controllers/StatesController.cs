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
    [RoutePrefix("api/states")]
    public class StatesController : ApiController
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        // GET api/states
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

        // GET api/states/{id}
        /// <summary>
        ///     Gibt einen einzelnen Status zurück
        /// </summary>
        /// <returns>Einzelnen Status</returns>
        [HttpGet]
        [ResponseType(typeof(StateViewModel))]
        [Route("{id:int}")]
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

        // POST api/states
        [HttpPost]
        [ResponseType(typeof(StateViewModel))]
        public IHttpActionResult Post([FromBody] StateViewModel stateViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _stateService.Insert(AutoMapperGenerator.Mapper.Map<State>(stateViewModel));
                return CreatedAtRoute("DefaultApi", new { id = stateViewModel.Id }, stateViewModel);
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // PUT api/states/{id}
        [HttpPut]
        public IHttpActionResult Put([FromBody] StateViewModel stateViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _stateService.Update(AutoMapperGenerator.Mapper.Map<State>(stateViewModel));
                return Ok();
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // DELETE api/states/5
        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var state = _stateService.GetSingleById(id);

                if (state == null)
                {
                    return NotFound();
                }

                var result = _stateService.Delete(id);

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
