using BookmarkManager.Data;
using BookmarkManager.Web.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Http;
using System.Security.Claims;


namespace BookmarkManager.Web.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class BookmarkController : ControllerBase
    {
        private readonly string _connectionString;
        

        public BookmarkController(IConfiguration configuration)
        {
            _connectionString = configuration.GetConnectionString("Constr");
        }

        [HttpPost]
        [Route("signup")]
        public void Signup(SignupViewModel vm)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.Signup(vm, vm.Password);
        }

        [HttpPost]
        [Route("login")]
        public User Login(LoginViewModel loginViewModel)
        {
            var repo = new BookmarkRepo(_connectionString);
            var user = repo.Login(loginViewModel.Email, loginViewModel.Password);
            if (user == null)
            {
                return null;
            }

            var claims = new List<Claim>
            {
                new Claim(ClaimTypes.Email, loginViewModel.Email)
            };

            HttpContext.SignInAsync(new ClaimsPrincipal(
                new ClaimsIdentity(claims, "Cookies", ClaimTypes.Email, "role"))).Wait();

            return user;
        }

 
        [HttpPost]
        [Route("addbookmark")]
        public void AddBookmark(BookMark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            bookmark.UserId = repo.GetByEmail(User.Identity.Name).Id;          
            repo.AddBookmark(bookmark);
        }

  
        [HttpPost]
        [Route("deletebookmark")]
        public void DeleteBookmark(int id)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.DeleteBookmark(id);
        }

 
        [HttpGet]
        [Route("getbookmarks")]
        public List<BookMark> GetBookmarks()
        {
            var repo = new BookmarkRepo(_connectionString);
            int id = repo.GetByEmail(User.Identity.Name).Id;
            return repo.GetBookmarks(id);
        }

       
        [HttpPost]
        [Route("editbookmark")]
        public void EditBookmark(BookMark bookmark)
        {
            var repo = new BookmarkRepo(_connectionString);
            repo.EditBookmark(bookmark);
        }

        [HttpPost]
        [Route("logout")]
        public void Logout()
        {
            HttpContext.SignOutAsync().Wait();
        }

        [HttpGet("getFiveTop")]
        public List<TopFive> GetFiveTop()
        {
            var repo = new BookmarkRepo(_connectionString);
            return repo.GetFiveTop();
        }
    }
}
