﻿using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Entities;
using PsychologicalAssistance.Services.Interfaces;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Web.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TrainingApplicationController : ControllerBase
    {
        private readonly ITrainingApplicationService _trainingApplicationService;
        private readonly IMapper _mapper;

        public TrainingApplicationController(ITrainingApplicationService trainingApplicationService, IMapper mapper)
        {
            _trainingApplicationService = trainingApplicationService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTrainingApplications()
        {
            var trainingApplications = await _trainingApplicationService.GetAllTrainingApplicationsAsync();
            return trainingApplications is not null ? Ok(trainingApplications) : NotFound();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTrainingApplicationById(int id)
        {
            var trainingApplication = await _trainingApplicationService.GetTrainingApplicationByIdAsync(id);
            return trainingApplication is not null ? Ok(trainingApplication) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateTrainingApplication([FromBody] TrainingApplicationDto trainingApplicationDto)
        {
            var trainingApplication = _mapper.Map<TrainingApplication>(trainingApplicationDto);
            await _trainingApplicationService.CreateAsync(trainingApplication);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTrainingApplication([FromBody] TrainingApplicationDto trainingApplicationDto)
        {
            var trainingApplication = _mapper.Map<TrainingApplication>(trainingApplicationDto);
            await _trainingApplicationService.UpdateAsync(trainingApplication);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTest(int id)
        {
            await _trainingApplicationService.DeleteAsync(id);
            return NoContent();
        }
    }
}
