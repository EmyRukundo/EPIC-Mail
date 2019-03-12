import joi from 'joi';
import jwt from 'jsonwebtoken';
import bcryptjs from "bcryptjs";
import Validation from '../helpers/validations';
import Helper from '../helpers/helpers';

const users =[{
    id:1,
    email:'rukundoemma@gmail.com',
	firstname:'Emmanuel',
	lastname:'Rukundo',
	password:'$2a$08$TgdmWQP3PuiV4mQFBPgeNONm/s4rmBe3nBsj.1kx96DM5/pZ6JIzC'
},{
    id:2,
    email:'ericmugume@yahoo.com',
	firstname:'Eric',
	lastname:'mugume',
	password:'pass2019'
}]


const getUsers= (req,res)=>{
    res.send(users);
   if(!getUsers) res.status(400).send('the data was not found,Try again');
};


const signUp = (req, res) => {

    joi.validate(req.body, Validation.userSchema, Validation.validationOption).then((result) => {

    const newUser = {
            id: users.length + 1,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password

        };
        users.push(newUser);
        res.send(newUser);
    }).catch(error => res.status(400).json({
        status: 400,
        error:`You have this error ${error}`,
      }));
};

//login


const login =(req, res)=>{

//     joi.validate(req.body, Validation.loginSchema, Validation.validationOption).then((result) => {
   
//     jwt.sign({users}, 'secretkey',(err,token)=>{
//         res.status(200).json({
//             token
//         });
//     });


// }).catch(error => res.status(400).json({
//     status: 400,
//     error:`You have this error ${error}`,
//   }));

// };


joi.validate(req.body, Validation.loginSchema, Validation.validationOption,
    (err, result) => {
     if (err) {
       return res.status(400).json({
         status: 400,
         error: err.details,
       });
     }
     const userAccount = {
       email: result.email,
       password: result.password,
     };
    
     const userResult = users.find((user) => userAccount.email == user.email);
    
    //  user.then((userResult) => {
       if (userResult) {
       
         if (Helper.comparePassword(userAccount.password, userResult.password)) {
           
           jwt.sign({user: userResult.email }, 'secret',(err,token)=>{
                 if(err){
                   console.log(err);
                 }
              res.status(200).send({ status: 200, data: userResult, token });
           });
         }else{
            console.log(userAccount.password);
            console.log(userAccount.password);
         }
       }
       else {
         return res.status(403).json({ status: 403, error: 'wrong combination  username  or password' });
       }
     });

    };

 
export {
    getUsers,signUp,login
};