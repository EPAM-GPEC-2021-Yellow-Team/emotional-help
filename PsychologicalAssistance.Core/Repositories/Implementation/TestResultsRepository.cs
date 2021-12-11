﻿using AutoMapper;
using PsychologicalAssistance.Core.Data;
using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Entities;
using PsychologicalAssistance.Core.Repositories.Abstract;
using PsychologicalAssistance.Core.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Core.Repositories.Implementation
{
    public class TestResultsRepository : DataRepository<TestResults>, ITestResultsRepository
    {
        private readonly IMapper _mapper;

        public TestResultsRepository(ApplicationDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<IEnumerable<TestResultsDto>> GetAllTestsResultsDtoAsync()
        {
            var testsResults = await GetAllItemsAsync();
            if (testsResults == null)
            {
                return null;
            }

            var testsResultsDto = _mapper.Map<IEnumerable<TestResults>, IEnumerable<TestResultsDto>>(testsResults);
            return testsResultsDto;
        }

        public async Task<TestResultsDto> GetTestResultsByIdDtoAsync(int id)
        {
            var testResults = await GetItemByIdAsync(id);
            if (testResults == null)
            {
                return null;
            }

            var testResultsDto = _mapper.Map<TestResults, TestResultsDto>(testResults);
            return testResultsDto;
        }
    }
}
