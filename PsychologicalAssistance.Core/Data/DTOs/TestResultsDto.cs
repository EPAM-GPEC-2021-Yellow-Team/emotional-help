﻿using PsychologicalAssistance.Core.Data.Entities;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace PsychologicalAssistance.Core.Data.DTOs
{
    public class TestResultsDto : BaseDto
    {
        public DateTime DateOfResults { get; set; }

        [Required]
        public string UserId { get; set; }

        [Required]
        public int TestId { get; set; }
        
        [Required]
        public List<VariantDto> ChosenVariants { get; set; }
    }
}