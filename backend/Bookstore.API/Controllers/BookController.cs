using Bookstore.API.Data;
using Microsoft.AspNetCore.Mvc;

namespace Bookstore.API.Controllers;

[Route("[controller]")]
[ApiController]
public class BookController : Controller
{
    private BookDbContext _context;
    
    public BookController(BookDbContext temp)
    {
        _context = temp;
    }

    [HttpGet("AllBooks")]
    public IEnumerable<Book> GetBooks(int items = 10)
    {
        var books = _context.Books
            .Take(items)
            .ToList();
        
        return books;
    }
}