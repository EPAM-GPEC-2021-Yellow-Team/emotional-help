﻿using PsychologicalAssistance.Core.Data.Entities;
using PsychologicalAssistance.Core.Repositories.Interfaces;
using PsychologicalAssistance.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace PsychologicalAssistance.Services.Abstract
{
    public class BaseService<EntityType> : IBaseService<EntityType> where EntityType : BaseEntity
    {

        protected IDataRepository<EntityType> DataRepository { get; set; }
        protected IUnitOfWork _unitOfWork { get; set; }

        public BaseService(IDataRepository<EntityType> dataRepository, IUnitOfWork unitOfWork)
        {
            DataRepository = dataRepository;
            _unitOfWork = unitOfWork;
        }

        public async Task CreateAsync(EntityType item)
        {
            //TODO Create method in repository, which we can use for checking, if this object already exists
            await DataRepository.CreateAsync(item);
            await _unitOfWork.CommitAsync();
        }

        public async Task DeleteAsync(int id)
        {
            var item = await DataRepository.GetItemByIdAsync(id);
            if (item == null)
                throw new ArgumentNullException(nameof(EntityType), "Item is not found"); //TODO Try to create ExceptionHandlingMiddleware Later and own exceptions

            await DataRepository.DeleteAsync(item);
            await _unitOfWork.CommitAsync();
        }

        public async Task<EntityType> GetItemByIdAsync(int id)
        {
            var item = await DataRepository.GetItemByIdAsync(id);
            if (item is null)
                throw new ArgumentNullException(nameof(item), "Item is not found");

            return item;
        }

        public async Task<IEnumerable<EntityType>> GetAllItemsAsync()
        {
            var items = await DataRepository.GetAllItemsAsync();
            if (items is null)
                throw new ArgumentNullException(nameof(items), "Items are not found");

            return items;
        }

        public async Task UpdateAsync(EntityType item)
        {
            await DataRepository.UpdateAsync(item);
            await _unitOfWork.CommitAsync();
        }
    }
}