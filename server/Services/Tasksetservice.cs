
using Microsoft.EntityFrameworkCore;
using server.Dbcontext;
using server.Model;
using server.Services;


namespace server.Services
{
    public class Tasksetservice : ITasksetservice
    {
        private readonly AppDbcontext _context;

        public Tasksetservice(AppDbcontext context)
        {
            _context = context;
        }

        public async Task<(IEnumerable<Taskset> taskset, int TotalCount)> GetAllAsync(int page = 1, int pagesize = 5)
        {
            var query = _context.tasksets
                .Where(t => !t.iscompleted)
                .OrderByDescending(t => t.Addeddatetime);

            var TotalCount = await query.CountAsync();
            var taskset = await query.Skip((page - 1) * pagesize).Take(pagesize).ToListAsync();

            return (taskset, TotalCount);
        }


        public async Task<Taskset> GetByIdAsync(int id)
        {
            return await _context.tasksets.FindAsync(id);
        }

        public async Task<Taskset> AddAsync(Taskset taskset)
        {
            _context.tasksets.Add(taskset);
            await _context.SaveChangesAsync();
            return taskset;
        }
        public async Task<Taskset?> UpdateAsync(int id, Taskset taskset)
        {

            var existingtaskset = await _context.tasksets.FindAsync(id);
            if (existingtaskset == null)
            {
                return null;
            }


            existingtaskset.iscompleted = taskset.iscompleted;







            await _context.SaveChangesAsync();

            return existingtaskset;
        }




    }
}
