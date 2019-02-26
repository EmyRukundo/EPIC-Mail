const signUp = (req, res) => {

    const newUser = {
            id: signUp.length + 1,
            email: req.body.email,
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            password: req.body.password

        };
        res.send(newUser);

};
 
export default signUp;