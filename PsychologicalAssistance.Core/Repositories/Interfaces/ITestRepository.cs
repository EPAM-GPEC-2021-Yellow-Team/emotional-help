﻿using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Enitities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Core.Repositories.Interfaces
{
    public interface ITestRepository : IDataRepository<Test>
    {
        Task<IEnumerable<TestDto>> GetAllTestsDtoAsync();
        Task<TestDto> GetTestByIdDtoAsync(int id);
    }
}
