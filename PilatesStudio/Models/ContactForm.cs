using System;
using System.ComponentModel.DataAnnotations;

namespace PilatesStudio.Models
{
    public class ContactForm
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Please enter a valid email address")]
        public string Email { get; set; }

        public string Phone { get; set; }

        [Required(ErrorMessage = "Message is required")]
        public string Message { get; set; }

        public DateTime SubmissionDate { get; set; }
    }
}