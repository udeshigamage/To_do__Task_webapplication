using server.Model;

namespace server.Services
{
    public interface ITasksetservice
    {

        Task<(IEnumerable<Taskset> taskset, int TotalCount)> GetAllAsync(int page = 1, int pagesize = 5);

        Task<Taskset> GetByIdAsync(int id);

        Task<Taskset> AddAsync(Taskset taskset);

        Task<Taskset> UpdateAsync(int id, Taskset taskset);



    }
}
