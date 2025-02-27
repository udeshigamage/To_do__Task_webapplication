using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using server.Model;

using server.Services;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class Task_to_doController : ControllerBase
    {
        private readonly ITasksetservice _tasksetservice;

        public Task_to_doController(ITasksetservice tasksetservice)
        {
            _tasksetservice = tasksetservice;
        }

        [HttpGet]
        public async Task<IActionResult> GetAll(int page = 1, int pagesize = 5)
        {
            var (Tasks, totalcount) = await _tasksetservice.GetAllAsync(page, pagesize);
            var response = new
            {
                data = Tasks,
                totalItems = totalcount,
                totalPages = (int)Math.Ceiling((double)totalcount / pagesize),
                currentPage = page
            };

            return Ok(response);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var Tasks = await _tasksetservice.GetByIdAsync(id);
            if (Tasks == null) return NotFound();
            return Ok(Tasks);
        }

        [HttpPost]
        public async Task<IActionResult> Add(Taskset taskset)
        {
            var newTask = await _tasksetservice.AddAsync(taskset);
            return CreatedAtAction(nameof(GetById), new { id = newTask.Task_ID }, newTask);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, Taskset taskset)
        {
            var updatedTask = await _tasksetservice.UpdateAsync(id, taskset);

            if (updatedTask == null)
            {
                return NotFound();
            }

            return Ok(updatedTask);
        }





    }
}