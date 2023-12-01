const express = require('express')
const router = express.Router();
const User = require('../models/user');
const user = require('../models/user');

//getting all
router.get('/',async (req,res) => {
    try{
        const users =await User.find();
        res.json(users)
    }catch{
        res.status(500).json({ message: err.message })
    }
})

//getting one
router.get('/:id', getUser, (req,res) => {
    res.send(req.params.id)
})

//creating one
router.post('/',async (req,res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try{
        const newUser = await user.save();
        res.status(201).json(newUser)
    }catch(err){
        res.status(400).json({message: err.message})
    }
})

//updating one
router.patch('/', (req,res) => {
    
})

//deleting one
router.delete('/:id',getUser,async (req,res) => {
    try{
        await res.user.remove()
        res.json({message: 'user deleted'})
    }catch(err){
        res.status(500).json({ message: err.message})

    }
})

async function getUser(req,res,next){
    let user
    try{
        user = await user.findById(req.params.id)
        if(user == null){
            return res.status(404).json({message: 'Cant find user'})
        }
    }catch(err){
        return res.status(500).json({message: err.message })
    }
    res.user = user
    next()
}
module.exports = router