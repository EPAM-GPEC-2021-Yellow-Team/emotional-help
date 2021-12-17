﻿using AutoMapper;
using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Entities;

namespace PsychologicalAssistance.Core.Data.Helpers.AutoMapper
{
    public class UserProfile : Profile
    {
        public UserProfile()
        {
            CreateMap<UserRegistrationDto, User>()
                .ForMember(user => user.UserName, opt => opt.MapFrom(x => x.Name))
                .ForMember(user => user.UserSurname, opt => opt.MapFrom(x => x.Surname));

            CreateMap<User, UserDto>()
                .ForMember(user => user.FullName, opt => opt.MapFrom(src => src.UserName + " " + src.UserSurname));
        }
    }
}