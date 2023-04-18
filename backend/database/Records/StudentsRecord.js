const {pool} = require("../db");
const { v4: uuidv4 } = require('uuid');

class StudentsRecord{
    constructor(obj) {
        this.nrIndexu = obj.nrIndexu;
        this.firstName = obj.firstName;
        this.lastName = obj.lastName;
        this.email = obj.email;
        this.year = obj.year;
        this.course = obj.course;
      }

    static async listAll(){
        try{
          const [results] = await pool.execute(`SELECT * FROM students`);
        return results.map(obj => new StudentsRecord(obj));
        } catch (error) {
          console.error('Error selecting student:', error);
          throw error;
        }
    };

    static async selectByCourse(course){
      try{
        const [results] = await pool.execute('SELECT * FROM students WHERE students = ?', course);
        return results;
      } catch (error) {
        console.error('Error selecting student by course:', error);
        throw error;
      }
    };

    static async selectByFullName(firstName, lastName) {
      try {
        const [results] = await pool.execute('SELECT * FROM students WHERE firstName = ? AND lastName = ?', [firstName, lastName]);
        return results;
      } catch (error) {
        console.error('Error selecting student by full name:', error);
        throw error;
      }
    };
    
    static async delete(nrIndexu) {
      try {
        await pool.execute("DELETE FROM students WHERE nrIndexu = ?", [nrIndexu]);
      } catch (error) {
        console.error('Error deleting student:', error);
        throw error;
      }
    };

    static async insertStudent( [firstName, lastName, email, year, course] ) {
      try {
        const result = await pool.execute("INSERT INTO students ( firstName, lastName, email, year, course) VALUES ( ?, ?, ?, ?, ?)", [ firstName, lastName, email, year, course]);
        return result.insertId;
      } catch (error) {
        console.error('Error inserting student:', error);
        throw error;
      }
    };
    
    static async updateStudent(nrIndexu, { firstName, lastName, email, year, course }) {
      try {
        const update = `UPDATE students SET firstName = ?, lastName = ?, email = ?, year = ?, course = ?
                         WHERE nrIndexu = ?`;
        await pool.execute(update, [firstName, lastName, email, year, course, nrIndexu]);
      } catch (error) {
        console.error('Error updating student:', error);
        throw error;
      }
    };
    
  }
        
module.exports = {
  StudentsRecord,
}