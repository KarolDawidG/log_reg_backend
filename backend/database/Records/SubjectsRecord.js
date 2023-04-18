const {pool} = require("../db");

class SubjectsRecord{
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.teacher = obj.teacher;
      }

    static async listAll(){
        try{
          const [results] = await pool.execute(`SELECT * FROM subjects`);
        return results.map(obj => new SubjectsRecord(obj));
        } catch (error) {
          console.error('Error selecting subjects:', error);
          throw error;
        }
    };
 
    static async delete(id) {
      try {
        await pool.execute("DELETE FROM subjects WHERE id = ?", [id]);
      } catch (error) {
        console.error('Error deleting subjects:', error);
        throw error;
      }
    };
    
  }
        
module.exports = {
  SubjectsRecord,
}