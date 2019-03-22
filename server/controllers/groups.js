import Database from '../db/db-connection';
import jsonWebToken from 'jsonwebtoken';
//@@ Create group

const createGroup = (req, res) => {
  
const newGroup=[
  req.body.name,
  req.body.userId
]
  const sql = 'INSERT INTO group_table(name,ownerid) VALUES ($1,$2) RETURNING *';
  const groupSql =Database.executeQuery(sql,newGroup);
  
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
   
  
  const groupSql = Database.executeQuery(`SELECT * FROM group_table WHERE ownerid='${req.body.userId}'`);
    
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


  //@GET all GROUPS, i AM AN ADMIN

  const specificGroup = (req, res) => {

   

    const sql = `SELECT * FROM group_table WHERE ownerid ='${userId}' `;

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

                    return res.status(200).json({
                      status: 200,
                      data: updatenameResult.rows,
                    });
                  }
                }
  
                return res.status(404).json({
                  status: 404,
                  error: 'No group found ',
                });
              }).catch(error => res.status(500).json({
                status: 500,
                error: `Internal server error ${error}`,
              }));
           
        }
      }
    })
  };

// @@DELETE GROUP

const deleteGroup = async (req, res) => {
 
    
      const tableAv = Database.executeQuery(`SELECT * FROM group_table WHERE id='${req.params.id}' and ownerid='${userId}' `);

      tableAv.then((istableAv) =>{
          
          if(istableAv.rows ==0) { return res.status(404).send('group does not exist')}});
    
  
             
  
    Database.executeQuery(`DELETE FROM group_table WHERE id = '${req.params.id}' and ownerid='${userId}' RETURNING *`).then((result) => {
      
      res.status(200).json({ status:200,message: "Deleted group successful" });
      
    }).catch(error => res.status(500).json({ status: 500, error: `Server error ${error}` }));

  }

  //@@ ADD USER TO THE GROUP

const groupMember = (req, res) => {


  
  const tableAv = Database.executeQuery(`SELECT * FROM group_table WHERE id='${req.params.id}' and ownerid='${userId}'`);

  tableAv.then((istableAv) =>{
      
      if(istableAv.rows ==0) { return res.status(404).send('group does not exist')}});


     
          const member=[
            req.params.id,
            req.body.userid,
            req.body.userole
            
          ]
                  
            const addMember = Database.executeQuery('INSERT INTO members_table(groupid,userid,userole) VALUES ($1,$2,$3) RETURNING *',member);
            
            addMember.then((memberResult) => {
        
              if (memberResult.rows) {
               
                if (memberResult.rows.length) {

                  return res.status(201).json({
                    status: 201,
                    data: memberResult.rows,
                  });
                }
              }
              return res.status(400).json({
                status: 400,
                error: 'User does not exist ',
              });
            }).catch(error => res.status(500).json({
              status: 500,
              error: `Internal server error ${error}`,
            }));
        
};

// @DELETE A MEMBER FROM A SPECIFIC GROUP

const deleteMember = async (req, res) => {
  


  const memberSql = Database.executeQuery(`SELECT * FROM group_table WHERE ownerid='${userId}'and id='${req.params.groupid}'`);

  memberSql.then((isgroupAv) =>{
      
      if(isgroupAv.rows ==0) { return res.status(404).send('Group does not exist')}});


      const deleteSql = Database.executeQuery(`DELETE FROM members_table WHERE groupid='${req.params.groupid}' and userid='${req.params.id}' RETURNING *`);

      deleteSql.then((result) =>{
          
          if(result.rows==0) { 
            res.status(404).json({ status:404,message: "The user with given ID do not exist" });}else{
              return res.status(200).send({ status:200, message: "Deleted user successful" })
            }
          });


}

//@@ send email to the group

const emailGroup = (req, res) => {
 
  
  const memberSql = Database.executeQuery(`SELECT * FROM members_table WHERE userid='${userId}' and groupid='${req.params.id}'`);

  memberSql.then((isgroupAv) =>{
      
      if(isgroupAv.rows ==0) { return res.status(404).send('Group does not exist')}});

  
          const newEmail = [
            new Date(),
            req.body.subject,
            req.body.message,
            req.body.parentMessageId,
            req.body.status,
            req.params.id
          ];
          const sql ='INSERT INTO emailgroup_table(created_on,subject,message,parentMessageId,status,groupid) VALUES ($1,$2,$3,$4,$5,$6) RETURNING *';
          const emailSql =Database.executeQuery(sql, newEmail); 
            emailSql.then((sendEmailResult) => {

              if (sendEmailResult.rows) {
                   
                if (sendEmailResult.rows) {
                  console.log(sendEmailResult.rows);
                  return res.status(201).json({
                    status: 201,
                    data: sendEmailResult.rows,
                  });
                }
              }
              return res.status(500).json({
                status: 500,
                error: `Internal server error ${error}`,
              });
            }).catch(error => res.status(500).json({
              status: 500,
              error: `Internal server error ${error}`,
            }));
         
};

  export {
      createGroup,getGroups,updateGroup,specificGroup,deleteGroup,groupMember,deleteMember,emailGroup
    };
