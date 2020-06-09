const router = require('express').Router();
const mysql = require('../dbconfig');
const jwt = require('jsonwebtoken');
const {registerValidation,loginValidation} = require('../validation');
const { hashSync, genSaltSync, compareSync } = require("bcrypt");


router.post('/register',async (req,res) => {

    //Validating data
    const {error} = registerValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);


    //checking if user already exists
    mysql.query("SELECT email FROM user WHERE email =?", req.body.email, (err,rows,fields) => {
        if(err) res.status(400).send(err);
        // if(emailExist) return res.status(400).send("Email already exists");

        if(rows[0]) return res.status(400).send("Email already exists");
        else{

            //bcrypt password
            const salt = genSaltSync(10);
            const hashedPass = hashSync(req.body.password, salt);


            //create a user
            var user = {
                name : req.body.name,
                email : req.body.email,
                password : hashedPass,
                date : new Date()
            }
            try{
                // const saveUser = await user.save();
                mysql.query("INSERT INTO user set ?", user);
                res.send({user : user.name});
            }
            catch(err){
                res.status(400).send(err);
            }

        }
        
    });
        

    
});

router.post('/login', async (req,res) => {

    //Validating data
    const {error} = loginValidation(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    //checking if user already exists
    mysql.query("SELECT * FROM user WHERE email =?", req.body.email, (err,rows,fields) => {
        
        if(err) res.status(400).send(err);
        // if(emailExist) return res.status(400).send("Email already exists");

        if(!rows[0]) return res.status(400).send("Email or Passsword is incorrect / Email doesnt exist");
        
        //Checking if pass is correct
        if(!compareSync(req.body.password,rows[0].password)) return res.status(400).send("Email and Passsword doesn't match");
        else{

            const token = jwt.sign({uid : rows[0].uid}, process.env.TOKEN_SECRET);
            res.header('auth-token',token).send(token);
            

            // res.send(rows);
        }


    });

});

module.exports = router;