﻿using AutoMapper;
using PsychologicalAssistance.Core.Data;
using PsychologicalAssistance.Core.Data.DTOs;
using PsychologicalAssistance.Core.Data.Enitities;
using PsychologicalAssistance.Core.Repositories.Abstract;
using PsychologicalAssistance.Core.Repositories.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Core.Repositories.Implementation
{
    public class UserRepository : DataRepository<User>, IUserRepository
    {
        private readonly IMapper _mapper;
        public UserRepository(ApplicationDbContext dbContext, IMapper mapper) : base(dbContext)
        {
            _mapper = mapper;
        }

        public async Task<UserDto> GetUserByIdDtoAsync(int id)
        {
            var user = await GetItemByIdAsync(id);
            if (user == null)
            {
                return null;
            }

            var userDto = _mapper.Map<UserDto>(user);
            return userDto;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersDtoAsync()
        {
            var users = await GetAllItemsAsync();
            if (users == null)
            {
                return null;
            }

            var usersDto = new List<UserDto>();
            foreach (var user in users)
            {
                usersDto.Add(_mapper.Map<User, UserDto>(user));
            }

            return usersDto;
        }
    }
}
