using CarManager.Services.Service.Car;
using CarManager.Services.Service.Statistic;
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
using CarManager.Api.Helpers;
using System.Data.Entity.Infrastructure;

namespace CarManager.Api.Controllers
{
    [RoutePrefix("api/statistics")]
    public class StatisticsController : ApiController
    {
        private readonly IStatisticService _statisticService;
        private readonly ICarService _carService;
        private readonly ExportHelper _exportHelper;

        public StatisticsController(IStatisticService statisticService, ICarService carService, ExportHelper exportHelper)
        {
            _statisticService = statisticService;
            _carService = carService;
            _exportHelper = exportHelper;
        }

        // GET api/statistics
        /// <summary>
        ///     Gibt eine Liste aller Status zurück
        /// </summary>
        /// <returns>Liste der Status</returns>
        [HttpGet]
        [ResponseType(typeof(StatisticViewModel))]
        public IHttpActionResult Get()
        {
            try
            {
                var allEntities = _statisticService.GetAll().ToList();
                
                return Ok(allEntities.Select(AutoMapperGenerator.Mapper.Map<StatisticViewModel>).AsQueryable());
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // GET api/statistics/{id}
        /// <summary>
        ///     Gibt einen einzelnen Status zurück
        /// </summary>
        /// <returns>Einzelnen Status</returns>
        [HttpGet]
        [ResponseType(typeof(StatisticViewModel))]
        [Route("{id:int}")]
        public IHttpActionResult Get(int id)
        {
            try
            {
                var entity = _statisticService.GetSingleById(id);

                return Ok(AutoMapperGenerator.Mapper.Map<StatisticViewModel>(entity));
            }
            catch (Exception exception)
            {
                // ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // POST api/statistics
        [HttpPost]
        [ResponseType(typeof(StatisticViewModel))]
        public IHttpActionResult Post([FromBody] StatisticViewModel statisticViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                statisticViewModel.CreationDate = DateTime.Now;

                var startDate = statisticViewModel.StartDate;
                statisticViewModel.StartDate = new DateTime(startDate.Year, startDate.Month, startDate.Day, 0, 0, 0);

                var endDate = statisticViewModel.EndDate;
                statisticViewModel.EndDate = new DateTime(endDate.Year, endDate.Month, endDate.Day, 23, 59, 59);             

                _statisticService.Insert(AutoMapperGenerator.Mapper.Map<Statistic>(statisticViewModel));
                return CreatedAtRoute("DefaultApi", new { id = statisticViewModel.Id }, statisticViewModel);
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // PUT api/statistics/{id}
        [HttpPut]
        public IHttpActionResult Put([FromBody] StatisticViewModel statisticViewModel)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                _statisticService.Update(AutoMapperGenerator.Mapper.Map<Statistic>(statisticViewModel));
                return Ok();
            }
            catch (Exception exception)
            {
                //ErrorSignal.FromCurrentContext().Raise(exception);
                return InternalServerError(exception);
            }
        }

        // DELETE api/statistics/5
        [HttpDelete]
        [Route("{id:int}")]
        public IHttpActionResult Delete(int id)
        {
            try
            {
                var statistic = _statisticService.GetSingleById(id);

                if (statistic == null)
                {
                    return NotFound();
                }

                var result = _statisticService.Delete(id);

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
