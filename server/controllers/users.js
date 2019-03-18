import jsonWebToken from 'jsonwebtoken';
import Database from '../db/db-connection';


//@@ signup user
  const signupUser = (req, res) => {
    
      const newUser = [
        req.body.email,
        req.body.firstname,
        req.body.lastname,   
        req.body.password   
       
      ];
    
      const user = Database.executeQuery(`INSERT INTO user_table (email, firstname, lastname, password)
      VALUES ($1,$2,$3,$4) RETURNING *`, newUser);
      user.then((userResult) => {
          
          
        if (userResult.rows.length) { 
            const token = jsonWebToken.sign({ user: rows }, process.env.SECRETKEY);
          return res.status(201).json({
            status: 201,
            data:token
          });
        
      }
        
      }).catch(error=> res.status(400).json({
        status: 400,
        error:'The user is already exist',
      }));
  
  };


  //@@login user

  const loginUser = (req, res) => {

    const userAccount = [
      req.body.email,
      req.body.password
    ];

    const user = Database.executeQuery(`SELECT * FROM user_table WHERE email = '${userAccount.email}'`);


    user.then((userResult) => {
      if (userResult.rows.length){
        if (Helper.comparePassword(userAccount.password, userResult.rows[0].password)) {
            const token = jsonWebToken.sign({ user: rows }, process.env.SECRETKEY);
       
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
      signupUser,loginUser
  }