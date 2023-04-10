const {pool} = require("./db");

class TaskRecord{
    static async listAll(nameUser){
        const [results] = await pool.execute('SELECT * FROM tasks WHERE user = ? ORDER BY id DESC' ,[nameUser]);
        return results;
    }
}

module.exports = {
    TaskRecord,
}