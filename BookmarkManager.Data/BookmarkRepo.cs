using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BookmarkRepo
    {
        private string _connectionString { get; set; }

        public BookmarkRepo(string cs)
        {
            _connectionString = cs;
        }

        public void Signup(User user, string password)
        {
            var hash = BCrypt.Net.BCrypt.HashPassword(password);
            user.PasswordHash = hash;
            using var context = new userDataContext(_connectionString);
            context.Users.Add(user);
            context.SaveChanges();
        }

        public User GetByEmail(string email)
        {
            using var ctx = new userDataContext(_connectionString);
            return ctx.Users.FirstOrDefault(u => u.Email == email);
        }


        public User Login(string email, string password)
        {
            var user = GetByEmail(email);
            if (user == null)
            {
                return null;
            }

            var isValidPassword = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
            if (!isValidPassword)
            {
                return null;
            }

            return user;

        }

        public void AddBookmark(BookMark bookmark)
        {
            var context = new userDataContext(_connectionString);
            context.Bookmarks.Add(bookmark);
            context.SaveChanges();
        }

        public void DeleteBookmark(int id)
        {
            var context = new userDataContext(_connectionString);
            BookMark bookmark = context.Bookmarks.FirstOrDefault(b => b.Id == id);
            context.Bookmarks.Remove(bookmark);
            context.SaveChanges();
        }

        public List<BookMark> GetBookmarks(int id)
        {
            var context = new userDataContext(_connectionString);
            return context.Bookmarks.Where(b => b.UserId == id).ToList();
        }

        public void EditBookmark(BookMark bookmark)
        {
            var context = new userDataContext(_connectionString);
            context.Bookmarks.Update(bookmark);
            context.SaveChanges();
        }

        public List<TopFive> GetFiveTop()
        {
            using var context = new userDataContext(_connectionString);
            return context.Bookmarks.GroupBy(b => b.Url)
                .OrderByDescending(b => b.Count()).Take(5)
                .Select(bm => new TopFive
                {
                    Url = bm.Key,
                    Count = bm.Count()
                }).ToList();
        }

    }
}
