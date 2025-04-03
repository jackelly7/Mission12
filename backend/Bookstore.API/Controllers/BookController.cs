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
    public IActionResult GetBooks(int pageNum = 1, int items = 10, string sortOrder = "title_asc")
    {
        var query = _context.Books.AsQueryable();

        // Apply sorting
        query = sortOrder switch
        {
            "title_desc" => query.OrderByDescending(b => b.Title),
            _ => query.OrderBy(b => b.Title), // default is title_asc
        };

        var books = query
            .Skip((pageNum - 1) * items)
            .Take(items)
            .ToList();

        var totalBooks = _context.Books.Count();

        return Ok(new
        {
            books = books,
            total = totalBooks
        });
    }
    
}
