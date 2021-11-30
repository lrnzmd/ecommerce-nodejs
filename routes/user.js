const { verifyToken, verifyTokenandAuthorization } = require('./verifyToken')
var AES = require("crypto-js/aes");
const User = require("../models/User");
const router = require("express").Router()


router.put('/:id', verifyTokenandAuthorization, async (req, res)=>{
    if(req.body.password){
        req.body.password = AES.encrypt(
            req.body.password,
            process.env.PASS_SEC
          ).toString();
          console.log(req.body.username);
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedUser);
      } catch (err) {
        res.status(500).json(err);
      }
    }
)




module.exports = router