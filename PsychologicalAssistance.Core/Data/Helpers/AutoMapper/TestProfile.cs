﻿using AutoMapper;
using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Enitities;

namespace PsychologicalAssistance.Core.Data.Helpers.AutoMapper
{
    public class TestProfile : Profile
    {
        public TestProfile()
        {
            CreateMap<Test, TestDto>().ReverseMap();
        }
    }
}
