const {pool} = require("../db");

class SubjectsRecord{
    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
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
 
    static async insert( [name, teacher ] ) {
      try {
        const result = await pool.execute("INSERT INTO subjects ( name, teacher) VALUES ( ?, ?)", [ name, teacher]);
        return result.insertId;
      } catch (error) {
        console.error('Error inserting insert:', error);
        throw error;
      }
    };


    static async getAllastName() {
      try {
        const [results] = await pool.execute('SELECT name FROM subjects');
        return results.map(obj => obj.name);
      } catch (error) {
        console.error('Error selecting getAllastName:', error);
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