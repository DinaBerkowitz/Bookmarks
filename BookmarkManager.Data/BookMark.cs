using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BookmarkManager.Data
{
    public class BookMark
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Title { get; set; }   
        public string Url { get; set; }
    }
}
