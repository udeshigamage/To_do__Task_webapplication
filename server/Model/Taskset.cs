using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace server.Model
{
    public class Taskset
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]

        public int Task_ID { get; set; }

        public string Task_title { get; set; }

        public DateTime Addeddatetime { get; set; }

        public string Task_description { get; set; }

        public Boolean iscompleted { get; set; }

    }
}
