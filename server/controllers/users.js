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
//@ get all users

const getUsers= (req,res)=>{
    res.send(users);
   if(!getUsers) res.status(400).send('the data was not found,Try again');
};

//@ create user

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
        error: error.details[0].message,
      }));
};

//@login


const login =(req, res)=>{


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
    
    
       if (userResult) {
       
         if (Helper.comparePassword(userAccount.password, userResult.password)) {
           
           jwt.sign({user: userResult.email }, 'secret',(err,token)=>{
                 if(err){
                console.log(err);
                 }
              res.status(201).send({ status: 201, data: userResult, token });
           });
         }else {
         return res.status(403).json({ status: 403, error: 'wrong combination  username  or password' });
       }}
     });

    };

 
export {
    getUsers,signUp,login
};