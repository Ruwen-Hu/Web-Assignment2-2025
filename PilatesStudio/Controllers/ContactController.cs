using System;
using System.Web.Mvc;
using PilatesStudio.Models;

namespace PilatesStudio.Controllers
{
    public class ContactController : Controller
    {
        public ActionResult Feedback()
        {
            return View();
        }

        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Feedback(ContactForm model)
        {
            if (ModelState.IsValid)
            {
                model.SubmissionDate = DateTime.Now;
                // Here the data should be saved to the database
                // _dbContext.ContactForms.Add(model);
                // _dbContext.SaveChanges();

                TempData["SuccessMessage"] = "Thank you for your feedback! We will contact you as soon as possible.";
                return RedirectToAction("Feedback");
            }

            return View(model);
        }
    }
}