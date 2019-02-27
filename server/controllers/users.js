import jwt from 'jsonwebtoken';


const users =[{
    id:1,
    email:'rukundoemma@gmail.com',
	firstname:'Emmanuel',
	lastname:'Rukundo',
	password:'success'
},{
    id:2,
    email:'ericmugume@yahoo.com',
	firstname:'Eric',
	lastname:'mugume',
	password:'pass2019'
}]


const getUsers= (req,res)=>{
    res.send(users);
   if(!getUsers) res.status(404).send('the data was not found,Try again');
};


const login =(req, res)=>{
   
    jwt.sign({users}, 'secretkey',(err,token)=>{
        res.status(200).json({
            token
        });
    });
}


const signUp = (req, res) => {

    const newUser = {
            id: users.length + 1,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password

        };
        users.push(newUser);
        res.send(newUser);

};

 
export {
    getUsers,signUp,login
};