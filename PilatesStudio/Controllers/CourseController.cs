using System;
using System.Collections.Generic;
using System.Linq;
using System.Web.Mvc;
using PilatesStudio.Models;

namespace PilatesStudio.Controllers
{
    public class CourseController : Controller
    {
        private List<Course> _courses;

        public CourseController()
        {
            // Mock course data
            _courses = new List<Course>
            {
                new Course {
                    Id = 1, Title = "Basic Pilates", Description = "Foundation course suitable for beginners", Instructor = "Teacher Zhang",
                    Schedule = DateTime.Today.AddDays(1).AddHours(10), Duration = "60 minutes", Level = "Beginner",
                    Price = 200, AvailableSpots = 8, Category = "Basic", ImageUrl = "/Content/Images/courses/basic-pilates.png"
                },
                new Course {
                    Id = 2, Title = "Advanced Pilates", Description = "Advanced course to enhance core strength", Instructor = "Teacher Li",
                    Schedule = DateTime.Today.AddDays(2).AddHours(14), Duration = "75 minutes", Level = "Intermediate",
                    Price = 250, AvailableSpots = 6, Category = "Advanced", ImageUrl = "/Content/Images/courses/advanced-pilates.png"
                },
                new Course {
                    Id = 3, Title = "Rehabilitation Pilates", Description = "Rehabilitation training for back pain", Instructor = "Teacher Zhang",
                    Schedule = DateTime.Today.AddDays(3).AddHours(16), Duration = "60 minutes", Level = "All Levels",
                    Price = 300, AvailableSpots = 4, Category = "Rehabilitation", ImageUrl = "/Content/Images/courses/rehab-pilates.png"
                },
                new Course {
                    Id = 4, Title = "Prenatal Pilates", Description = "Safe course specially designed for pregnant women", Instructor = "Teacher Li",
                    Schedule = DateTime.Today.AddDays(4).AddHours(11), Duration = "60 minutes", Level = "Beginner",
                    Price = 280, AvailableSpots = 5, Category = "Prenatal", ImageUrl = "/Content/Images/courses/prenatal-pilates.png"
                }
            };
        }

        [HttpGet]
        public ActionResult FilterSearch()
        {
            return View(_courses);
        }

        [HttpPost]
        public ActionResult FilterCourses(string searchTerm = "", string level = "all", string category = "all", string sortBy = "schedule")
        {
            try
            {
                System.Diagnostics.Debug.WriteLine($"Received search request: searchTerm={searchTerm}, level={level}, category={category}, sortBy={sortBy}");

                var filteredCourses = _courses.AsEnumerable();

                // Search functionality
                if (!string.IsNullOrEmpty(searchTerm))
                {
                    filteredCourses = filteredCourses.Where(c =>
                        c.Title.ToLower().Contains(searchTerm.ToLower()) ||
                        c.Description.ToLower().Contains(searchTerm.ToLower()) ||
                        c.Instructor.ToLower().Contains(searchTerm.ToLower()));
                }

                // Filter functionality
                if (!string.IsNullOrEmpty(level) && level != "all")
                {
                    filteredCourses = filteredCourses.Where(c => c.Level == level);
                }

                if (!string.IsNullOrEmpty(category) && category != "all")
                {
                    filteredCourses = filteredCourses.Where(c => c.Category == category);
                }

                // Sort functionality
                switch (sortBy)
                {
                    case "price":
                        filteredCourses = filteredCourses.OrderBy(c => c.Price);
                        break;
                    case "title":
                        filteredCourses = filteredCourses.OrderBy(c => c.Title);
                        break;
                    case "schedule":
                    default:
                        filteredCourses = filteredCourses.OrderBy(c => c.Schedule);
                        break;
                }

                var result = filteredCourses.ToList();

                return Json(new
                {
                    success = true,
                    courses = result,
                    count = result.Count
                });
            }
            catch (Exception ex)
            {
                System.Diagnostics.Debug.WriteLine($"Search error: {ex.Message}");
                return Json(new
                {
                    success = false,
                    message = "An error occurred during search: " + ex.Message
                });
            }
        }
        public ActionResult Schedule()
        {
            return View(_courses);
        }

        public ActionResult BookCourse(int id)
        {
            var course = _courses.FirstOrDefault(c => c.Id == id);
            if (course == null)
            {
                return HttpNotFound();
            }

            var booking = new Booking
            {
                CourseId = id,
                Course = course
            };

            return View(booking);
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult BookCourse(Booking booking)
        {
            if (ModelState.IsValid)
            {
                var course = _courses.FirstOrDefault(c => c.Id == booking.CourseId);
                if (course != null && course.AvailableSpots > 0)
                {
                    // Simulate saving booking
                    course.AvailableSpots--;

                    TempData["BookingSuccess"] = $"Booking successful! You have successfully booked the {course.Title} course.";
                    return RedirectToAction("Schedule");
                }
                else
                {
                    ModelState.AddModelError("", "This course is fully booked and cannot be reserved.");
                }
            }

            booking.Course = _courses.FirstOrDefault(c => c.Id == booking.CourseId);
            return View(booking);
        }
    }
}