const {pool} = require("../db");

class TaskRecord{
    static async listAll(nameUser){
        const [results] = await pool.execute('SELECT * FROM tasks WHERE user = ? ORDER BY id DESC' ,[nameUser]);
        return results;
    }

    static async insert([nazwa, tresc, nameUser]) {
        const result = await pool.execute("INSERT INTO tasks (nazwa, tresc, user) VALUES (?, ?, ?)", [nazwa, tresc, nameUser]);
        return result.insertId;
    }

    static async delete(id) {
         await pool.execute("DELETE FROM tasks WHERE id = ?", [id]);
    }

}

module.exports = {
    TaskRecord,
}