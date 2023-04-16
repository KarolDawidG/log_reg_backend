const { TaskRecord } = require('../backend/database/TaskRecord');
const { pool } = require('../backend/database/db');
const { nameDB } = require('../backend/config/configENV');

describe('TaskRecord', () => {
  beforeAll(async () => {
    await pool.query(`USE ${nameDB}`);
    await pool.query('CREATE TABLE IF NOT EXISTS tasks (id INT AUTO_INCREMENT PRIMARY KEY, nazwa VARCHAR(255), tresc VARCHAR(255), user VARCHAR(255))');
  });

  afterAll(async () => {
    await pool.query(`USE ${nameDB}`);
    await pool.query('DROP TABLE IF EXISTS tasks');
    await pool.end();
  });

  describe('listAll', () => {
    it('should return all tasks for the specified user', async () => {
      // insert some tasks into the database
      await pool.query(`USE ${nameDB}`);
      await pool.query('INSERT INTO tasks (nazwa, tresc, user) VALUES (?, ?, ?)', ['Task 1', 'Description 1', 'User 1']);
      await pool.query(`USE ${nameDB}`);
      await pool.query('INSERT INTO tasks (nazwa, tresc, user) VALUES (?, ?, ?)', ['Task 2', 'Description 2', 'User 1']);
      await pool.query(`USE ${nameDB}`);
      await pool.query('INSERT INTO tasks (nazwa, tresc, user) VALUES (?, ?, ?)', ['Task 3', 'Description 3', 'User 2']);

      const results = await TaskRecord.listAll('User 1');
      expect(results).toHaveLength(2);
      expect(results[0].nazwa).toEqual('Task 2');
      expect(results[1].tresc).toEqual('Description 1');
    });

    it('should return an empty array if there are no tasks for the specified user', async () => {
      const results = await TaskRecord.listAll('Nonexistent User');
      expect(results).toEqual([]);
    });
  });

  describe('delete', () => {
    it('should delete the specified task from the database', async () => {
      // insert a task into the database
      const [result] = await pool.execute('INSERT INTO tasks (nazwa, tresc, user) VALUES (?, ?, ?)', ['Task to be deleted', 'Description', 'User']);
      const id = result.insertId;

      await TaskRecord.delete(id);

      const [results] = await pool.query('SELECT * FROM tasks WHERE id = ?', [id]);
      expect(results).toHaveLength(0);
    });
  });
});


