import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';


const createGroup = (req, res) => {
  
      let token = 0;
    let decodedToken = '';
    let userId = '';
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
      decodedToken = jsonWebToken.verify(token, 'secret');
      userId = decodedToken.user[0].id;
    } else {
      return res.status(403).json({
        status: 403,
        error:"you are not authorised to create a group",
      });
    }

      const newGroup = [
       
        req.body.name,
        req.body.role,
        userId,
    
      ];
      const sql = 'INSERT INTO group_table (name,role,ownerid) VALUES ($1,$2,$3) RETURNING *';
      const groupSql =Database.executeQuery(sql, newGroup);
      
      groupSql.then((groupResult) => {
        if (groupResult.rows.length!==0) {
          return res.status(201).json({
            status: 201,
            data: groupResult.rows,
          });
        }
        return res.status(400).json({
          status: 400,
          error: 'Group could not be created',
        });
      }).catch(error => res.status(500).json({
        status: 500,
        error: `Internal server error ${error}`,
      }));
 
  };
 
  //@get all groups owned by given user 
  const getGroups = (req, res) => {
   
    let token = 0;
  let decodedToken = '';
  let userId = '';
  if (req.headers.authorization) {
    token = req.headers.authorization.split(' ')[1];
    decodedToken = jsonWebToken.verify(token, 'secret');
    userId = decodedToken.user[0].id;
  } else {
    return res.status(403).json({
      status: 403,
      error:"you are not authorised to get any group",
    });
  }
  const groupSql = Database.executeQuery(`SELECT * FROM group_table WHERE ownerid = '${userId}'`);
    
  groupSql.then((result) => {

    if (result.rows.length) {

      return res.status(200).json({

        status: 200,
        data: result.rows
      });
    }
    return res.status(404).json({

      status: 404,
      error: 'You have not created any group!',

    });
  }).catch(error => res.status(500).json({

    status: 500,
    error: `Internal server error ${error}`,

  }));
};


  //@GET SPECIFIC GROUP

  const specificGroup = (req, res) => {

    const sql = `SELECT * FROM group_table WHERE id = '${req.params.id}'`;

    const groupSql = Database.executeQuery(sql);

    groupSql.then((result) => {

      if (result.rows.length) {

        return res.status(200).json({

          status: 200,
          data: result.rows
        });
      }
      return res.status(404).json({

        status: 404,
        error: 'a group with given id was not found!',

      });
    }).catch(error => res.status(500).json({

      status: 500,
      error: `Internal server error ${error}`,

    }));
  };



//@UPDATE GROUP Name

const updateGroup = (req, res) => {

    let token = 0;
    let decodedToken = '';
    let userId = '';
    if (req.headers.authorization) {
      token = req.headers.authorization.split(' ')[1];
      decodedToken = jsonWebToken.verify(token, 'secret');
      userId = decodedToken.user[0].id;
    } else {
      return res.status(403).json({
        status: 403,
        error:"Sorry,you do not have a group, first create it!!",
      });
    }

    const checkGroupSql = `SELECT * FROM group_table WHERE ownerid='${userId}'`;
    const isAvailable = Database.executeQuery(checkGroupSql);
    isAvailable.then((isValid) => {
      if (isValid.rows) {
        if (isValid.rows.length) {   
            const name =req.body.name;

              const sql = `UPDATE group_table SET name = '${name}' WHERE id = '${req.params.id}' RETURNING *`

              const editName = Database.executeQuery(sql);
              editName.then((updatenameResult) => {

                if (updatenameResult.rows) {

                  if (updatenameResult.rows.length) {

                    return res.status(201).json({
                      status: 201,
                      data: updatenameResult.rows,
                    });
                  }
                }
  
                return res.status(400).json({
                  status: 400,
                  error: 'You do not own this group ',
                });
              }).catch(error => res.status(500).json({
                status: 500,
                error: `Internal server error ${error}`,
              }));
           
        }
      }
    })
  };

  export {
      createGroup,getGroups,updateGroup,specificGroup 
    };
