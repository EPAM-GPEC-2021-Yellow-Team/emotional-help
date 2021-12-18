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
    public class TestingApplicationController : ControllerBase
    {
        private readonly ITestingApplicationService _testingApplicationService;
        private readonly IMapper _mapper;

        public TestingApplicationController(ITestingApplicationService testingApplicationService, IMapper mapper)
        {
            _testingApplicationService = testingApplicationService;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult> GetAllTestingApplications()
        {
            var testingApplications = await _testingApplicationService.GetAllTestingApplicationsAsync();
            return testingApplications is not null ? Ok(testingApplications) : NotFound();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> GetTestingApplicationById(int id)
        {
            var testingApplication = await _testingApplicationService.GetTestingApplicationByIdAsync(id);
            return testingApplication is not null ? Ok(testingApplication) : NotFound();
        }

        [HttpGet("{id}/full")]
        public async Task<ActionResult> GetFullTestingApplicationById(int id)
        {
            var fullTestingApplication = await _testingApplicationService.GetFullTestingApplicationDtoByIdAsync(id);
            return fullTestingApplication is not null ? Ok(fullTestingApplication) : NotFound();
        }

        [HttpPost]
        public async Task<ActionResult> CreateTestingApplication([FromBody] TestingApplicationDto testingApplicationDto)
        {
            var testingApplication = _mapper.Map<TestingApplication>(testingApplicationDto);
            await _testingApplicationService.CreateAsync(testingApplication);
            return Ok();
        }

        [HttpPut]
        public async Task<ActionResult> UpdateTestingApplication([FromBody] TestingApplicationDto testingApplicationDto)
        {
            var testingApplication = _mapper.Map<TestingApplication>(testingApplicationDto);
            await _testingApplicationService.UpdateAsync(testingApplication);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteTestingApplication(int id)
        {
            await _testingApplicationService.DeleteAsync(id);
            return NoContent();
        }
    }
}