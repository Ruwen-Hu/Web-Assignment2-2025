using System;
using System.ComponentModel.DataAnnotations;

namespace PilatesStudio.Models
{
    public class Booking
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Please select a course")]
        public int CourseId { get; set; }

        [Required(ErrorMessage = "Please enter your name")]
        public string CustomerName { get; set; }

        [Required(ErrorMessage = "Please enter your email")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string CustomerEmail { get; set; }

        [Required(ErrorMessage = "Please enter your phone number")]
        public string CustomerPhone { get; set; }

        public string Notes { get; set; }

        public DateTime BookingDate { get; set; }

        // Navigation property
        public virtual Course Course { get; set; }
    }
}