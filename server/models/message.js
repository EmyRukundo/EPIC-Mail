import Database from '../db/db-connection';

const selectFrom = async (tableName, id = false) => {
  
  const sql = `SELECT * FROM messages_table;`
  return Database.executeQuery(sql);
};

export default selectFrom;