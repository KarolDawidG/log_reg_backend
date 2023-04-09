const {pool} = require("./db");


class TaskRecord{
   static async listAll(){
       const [results] = await pool.execute("select * from `tasks`");
       return results;
   }
   async insert(){

       await pool.execute(
           "INSERT INTO `tasks` (`id`, `nazwa`, `tresc`) VALUES (?, ?, ?)",
           [this.id || 8 , this.nazwa || "null", this.tresc || 'null']
       );
   }

}


module.exports = {
    TaskRecord,
}