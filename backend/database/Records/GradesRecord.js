const {pool} = require("../db");

class GradesRecord{
    constructor(obj) {
        this.id = obj.id;
        this.student_id  = obj.student_id ;
        this.subject  = obj.subject ;
        this.grade = obj.grade;
        this.timestamp = obj.timestamp;
        this.description = obj.description;
        this.student_last_name = obj.student_last_name;
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

    static async insertGrade( [student_id, student_last_name, subject, grade ] ) {
      try {
        const result = await pool.execute("INSERT INTO grades ( student_id, student_last_name, subject, grade) VALUES ( ?, ?, ?, ?)", [ student_id, student_last_name, subject, grade]);
        return result.insertId;
      } catch (error) {
        console.error('Error inserting student:', error);
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