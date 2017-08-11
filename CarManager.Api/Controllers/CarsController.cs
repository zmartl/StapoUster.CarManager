using CarManager.Services.Service.Car;
using CarManager.Shared.AutomatedMappings;
using CarManager.Shared.Common;
using CarManager.Shared.Models;
using CarManager.Shared.ViewModels;
using System;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Web.Http;
using System.Web.Http.Description;

namespace CarManager.Api.Controllers
{
    [RoutePrefix("api/cars")]
    public class CarsController : ApiController
    {
        private readonly ICarService _carService;

        public CarsController(ICarService carService)
        {
            _carService = carService;
        }

        // GET api/cars
        /// <summary>
        ///     Gibt eine Liste aller Status zurück
        /// </summary>
        /// <returns>Liste der Status</returns>
        [HttpGet]
        [ResponseType(typeof(CarViewModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var allEntities = _carService.GetAll().ToList();
                
                return Ok(allEntities.Select(AutoMapperGenerator.Mapper.Map<CarViewModel>).AsQueryable());
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // GET api/cars/{id}
        /// <summary>
        ///     Gibt einen einzelnen Status zurück
        /// </summary>
        /// <returns>Einzelnen Status</returns>
        [HttpGet]
        [ResponseType(typeof(CarViewModel))]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var entity = _carService.GetSingleById(id);

                return Ok(AutoMapperGenerator.Mapper.Map<CarViewModel>(entity));
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // POST api/cars
        [HttpPost]
        [ResponseType(typeof(CarViewModel))]
        public IHttpActionResult Post([FromBody] CarViewModel carViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _carService.Insert(AutoMapperGenerator.Mapper.Map<Car>(carViewModel));
                return CreatedAtRoute("DefaultApi", new { id = carViewModel.Id }, carViewModel);
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // PUT api/cars/{id}
        [HttpPut]
        public IHttpActionResult Put([FromBody] CarViewModel carViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _carService.Update(AutoMapperGenerator.Mapper.Map<Car>(carViewModel));
                return Ok();
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // DELETE api/cars/5
        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var car = _carService.GetSingleById(id);

                if (car == null)
                {
                    return NotFound();
                }

                var result = _carService.Delete(id);

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
            catch (DbUpdateException e)
            {
                return Conflict();
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }
    }
}
