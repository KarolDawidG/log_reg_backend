const {pool} = require("./db");

class UsersRecord{
    constructor(obj) {
        this.id = obj.id;
        this.username = obj.username;
        this.email = obj.email;
        this.role = obj.role;
      }

    static async listAll(){
        const [results] = await pool.execute(`SELECT * FROM accounts`);
        return results.map(obj => new UsersRecord(obj));
    }

    static async selectByEmail(email){
      const [results] = await pool.execute('SELECT * FROM accounts WHERE email = ?',email);
      return results;
    }

    static async selectByUsername(username){
      const [results] = await pool.execute('SELECT * FROM accounts WHERE username = ?', username);
      return results;
    }

    static async delete(id) {
         await pool.execute("DELETE FROM accounts WHERE id = ?", [id]);
    }

    static async insert([username, hashPassword, email]) {
      const result = await pool.execute("INSERT INTO accounts (username, password, email) VALUES (?, ?, ?)", [username, hashPassword, email]);
      return result.insertId;
    }

    }
        
module.exports = {
    UsersRecord,
}