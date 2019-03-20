import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import verifyToken from '../middleware/authenticate';


const createGroup = (req, res) => {

      const newGroup = [
       
        req.body.name,
        req.body.userId,
    
      ];
      const sql = 'INSERT INTO group_table (name,ownerid) VALUES ($1,$2) RETURNING *';
      const groupSql =Database.executeQuery(sql, newGroup);
      
      groupSql.then((groupResult) => {
        if (groupResult.rows.length!==0) {
          return res.status(201).json({
            status: 201,
            data: groupResult.rows,
          });
        }
        return res.status(500).json({
          status: 500,
          error: 'Group could not be created',
        });
      }).catch(error => res.status(500).json({
        status: 500,
        error: `Internal server error ${error}`,
      }));
 
  };
  export default createGroup;
