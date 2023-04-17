const {pool} = require("./db");

class AllGrades{
    constructor(obj) {
        this.id = obj.id;
        this.student_last_name  = obj.student_last_name ;
        this.grade  = obj.grade ;
        this.subject_id  = obj.subject_id ;
      }

    static async listAll(){
        try{
          const [results] = await pool.execute(`SELECT * FROM student_grades_subjects`);
        return results.map(obj => new AllGrades(obj));
        } catch (error) {
          console.error('Error selecting grades:', error);
          throw error;
        }
    };
 
    
  }
        
module.exports = {
  AllGrades,
}