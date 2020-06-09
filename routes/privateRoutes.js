const router = require('express').Router();
const verify = require('./verifyTokens');

router.get('/',verify,(req,res) =>{

    res.send(req.user);

    // res.json({
    //     private : {
    //         title : "first post",
    //         description : "protected data"
    //     }
    // })
})



module.exports = router;