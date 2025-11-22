using System.ComponentModel.DataAnnotations;

namespace PilatesStudio.Models
{
    public class Instructor
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "Instructor name is required")]
        [Display(Name = "Instructor Name")]
        public string Name { get; set; }

        [Display(Name = "Qualification")]
        public string Qualification { get; set; }

        [Display(Name = "Teaching Experience (Years)")]
        public int ExperienceYears { get; set; }

        [Display(Name = "Specialization")]
        public string Specialization { get; set; }

        [Display(Name = "Instructor Introduction")]
        public string Introduction { get; set; }

        public string ImageUrl { get; set; }

        // Fix CS0117 error: Add Bio property
        public string Bio { get; set; }

        // Fix CS0117 error: Add Certification property
        public string Certification { get; set; }
    }
}