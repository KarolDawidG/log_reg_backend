const {pool} = require("../db");

class GradesRecord{
    constructor(obj) {
        this.id = obj.id;
        this.student_id  = obj.student_id ;
        this.subject_id  = obj.subject_id ;
        this.grade = obj.grade;
        this.timestamp = obj.timestamp;
        this.description = obj.description;
      }

    static async listAll(){
        try{
          const [results] = await pool.execute(`SELECT * FROM grades`);
        return results.map(obj => new GradesRecord(obj));
        } catch (error) {
          console.error('Error selecting grades:', error);
          throw error;
        }
    };

    static async selectBySubject(){
      try{
        const [results] = await pool.execute(`SELECT * FROM grades WHERE subject_id = ?`, [subject_id]);
        
      return results.map(obj => new GradesRecord(obj));
      } catch (error) {
        console.error('Error selecting grades:', error);
        throw error;
      }
  };
 
    static async delete(id) {
      try {
        await pool.execute("DELETE FROM grades WHERE id = ?", [id]);
      } catch (error) {
        console.error('Error deleting grades:', error);
        throw error;
      }
    };
    
  }
        
module.exports = {
    GradesRecord,
}