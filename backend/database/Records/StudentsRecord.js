const {pool} = require("../db");
const {generateRandomNumber} =require('../../config/config');


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

    static async insert( [firstName, lastName, email, year, course] ) {
      try {
        const nrIndexu = generateRandomNumber();
        const result = await pool.execute("INSERT INTO students (nrIndexu, firstName, lastName, email, year, course) VALUES ( ?, ?, ?, ?, ?, ?)", [nrIndexu, firstName, lastName, email, year, course]);
        return result.insertId;
      } catch (error) {
        console.error('Error inserting student:', error);
        throw error;
      }
    };
    
    static async update(nrIndexu, { firstName, lastName, email, year, course }) {
      try {
        const update = `UPDATE students SET firstName = ?, lastName = ?, email = ?, year = ?, course = ?
                         WHERE nrIndexu = ?`;
        await pool.execute(update, [firstName, lastName, email, year, course, nrIndexu]);
      } catch (error) {
        console.error('Error updating student:', error);
        throw error;
      }
    };

    static async getAllastName() {
      try {
        const [results] = await pool.execute('SELECT lastName FROM students');
        return results.map(obj => obj.lastName);
      } catch (error) {
        console.error('Error selecting nrIndexes:', error);
        throw error;
      }
    };

    static async selectByLastName(lastName) {
      try {
        const [results] = await pool.execute('SELECT * FROM students WHERE lastName = ?', [lastName]);
        return results.map(obj => new StudentsRecord(obj));
      } catch (error) {
        console.error('Error selecting student:', error);
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
  }
        
module.exports = {
  StudentsRecord,
}