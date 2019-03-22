import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';
import Helper from '../helpers/helpers';
import selectFrom  from '../models/users';


//@ get users
const getUsers = async (req, res) => {
  selectFrom('user_table').then((users) => {
    if (users.rows) {
      return res.status(200).json({ status: 200, data: users.rows });
    }
  }).catch(error => res.status(500).json({ status: 500, error: `Internal server error : ${error}` }));
};




//@@ signup user
  const signupUser = (req, res) => {


        const {
            firstname,
            lastname,
            email,
            password,
        }=req.body;
     Database.executeQuery(`SELECT * FROM user_table WHERE email='${email}' `).then((result)=>{
         if(result.rows.length){
             return res.status(400).json({
                 status:400,
                 error: "The User is already exist",
             })
         }

     })
       
    const hashPassword = Helper.hashPassword(req.body.password);
    
      const newUser = [
        email,
        firstname,
        lastname,   
        hashPassword
    
      ];
      const user = Database.executeQuery(`INSERT INTO user_table (email, firstname, lastname, password)
      VALUES ($1,$2,$3,$4) RETURNING *`, newUser);
    
      user.then((userResult) => {  
     

        const token = jsonWebToken.sign({ user: userResult.rows }, process.env.SECRETKEY);
          return res.status(201).json({
            status: 201,
            data:token
          });       
      
        
      }).catch(error=> {
        
          res.status(500).json({
        status: 500,
        error:'Internal server error',
      })});
  
  };


  //@@login user

  const loginUser = (req, res) => {
    
   
   const userAccount={
       email:req.body.email,
       password:req.body.password
   }

    const user = Database.executeQuery(`SELECT * FROM user_table WHERE email = '${userAccount.email}'`);
 
    user.then((userResult) => {
        
      if (userResult.rows.length){
        if (Helper.comparePassword(userAccount.password, userResult.rows[0].password)) {
            const token = jsonWebToken.sign({ user: userResult.rows }, process.env.SECRETKEY);
            
            return res.status(200).json({ 
                status: 200, 
                data: token 
              }); 
        
        }
      }else{
        return res.status(403).json({ 
            status: 403, 
            error: 'Invalid username  or password' });
      }
    }).catch(error => res.status(500).json({
         status: 500, 
      error: `Internal server error ${error}` }));
};
  export{
      signupUser,loginUser,getUsers
  }