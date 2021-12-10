﻿using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Enitities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Services.Interfaces
{
    public interface ITestService : IBaseService<Test>
    {
        Task<TestDto> GetTestByIdAsync(int id);
        Task<IEnumerable<TestDto>> GetAllTestsAsync();
    }
}
