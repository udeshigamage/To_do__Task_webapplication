using Microsoft.EntityFrameworkCore;
using server.Model;
using System;



namespace server.Dbcontext
{
    public class AppDbcontext : DbContext
    {
        public AppDbcontext(DbContextOptions<AppDbcontext> options)
        : base(options)
        {
        }

        public DbSet<Taskset> tasksets { get; set; }









    }
}
