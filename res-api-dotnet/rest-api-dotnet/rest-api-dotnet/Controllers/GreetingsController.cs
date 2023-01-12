using Microsoft.AspNetCore.Mvc;
using rest_api_dotnet.Models;
using System.Reflection;

namespace rest_api_dotnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GreetingsController : ControllerBase
    {
        private static List<Greeting> _greetings = new List<Greeting>()
        {
            new Greeting(){Id=1, Recipient="Cizzbor", Message= "Merry whatever", Sender="Karol"},
            new Greeting(){Id=2, Recipient="Woowo", Message= "Happy hannusomething", Sender="Karol"},
            new Greeting(){Id=3, Recipient="Crazlinger", Message= "Superb season", Sender="Karol"}
        };

        // GET: api/<WidgetsController>
        [HttpGet]
        public IActionResult Get()
        {
            return new JsonResult(_greetings);
        }

        // GET api/<WidgetsController>/5
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Item not found"});
            }
            return new JsonResult(result);
        }

        // POST api/<WidgetsController>
        [HttpPost]
        public IActionResult Post([FromBody] Greeting newItem)
        {
            var newId = _greetings.Last().Id + 1;
            newItem.Id = newId;
            _greetings.Add(newItem);
            return CreatedAtAction(nameof(Get), new { id = newId }, newItem);
        }

        // PUT api/<WidgetsController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Greeting item)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Item not found" });
            }
            result.Recipient = item.Recipient;
            result.Message = item.Message;
            result.Sender = item.Sender;
            return AcceptedAtAction(nameof(Get), new { id = result.Id }, result);
        }

        // DELETE api/<WidgetsController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var result = _greetings.Find(x => x.Id == id);
            if (result == null)
            {
                return NotFound(new { Error = "Item not found" });
            }
            _greetings.Remove(result);
            return NoContent();
        }
    }
}
