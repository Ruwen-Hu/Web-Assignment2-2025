using System.Collections.Generic;
using System.Web.Mvc;
using PilatesStudio.Models;

namespace PilatesStudio.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            // Mock data - in real application should be retrieved from database
            var instructors = new List<Instructor>
            {
                new Instructor { Id = 1, Name = "Teacher Zhang", Bio = "Senior Pilates instructor with 10 years teaching experience", Specialization = "Rehabilitation Pilates", Certification = "STOTT PILATES Certified", ExperienceYears = 10, ImageUrl = "/Content/Images/instructors/instructor1.png" },
                new Instructor { Id = 2, Name = "Teacher Li", Bio = "Dual certified Yoga and Pilates instructor", Specialization = "Prenatal Pilates", Certification = "Balanced Body Certified", ExperienceYears = 8, ImageUrl = "/Content/Images/instructors/instructor2.png" }
            };

            var testimonials = new List<Testimonial>
            {
                new Testimonial { Id = 1, ClientName = "Ms. Wang", Content = "After practicing Pilates here, my back pain has significantly improved", Rating = 5, Date = "2024-01-15" },
                new Testimonial { Id = 2, ClientName = "Mr. Chen", Content = "The instructors are very professional and the environment is comfortable", Rating = 5, Date = "2024-01-10" }
            };

            ViewBag.Instructors = instructors;
            ViewBag.Testimonials = testimonials;

            return View();
        }

        public ActionResult AboutPilates()
        {
            return View();
        }
    }
}