using System;

namespace PilatesStudio.Models
{
    public class Course
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Instructor { get; set; }
        public DateTime Schedule { get; set; }
        public string Duration { get; set; }
        public string Level { get; set; }
        public decimal Price { get; set; }
        public int AvailableSpots { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
    }
}