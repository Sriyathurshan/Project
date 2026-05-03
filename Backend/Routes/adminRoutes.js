const express = require("express")
const User = require("../models/User")
const {protect,admin} = require("../middleware/authMiddleware")

const router = express.Router()

// @ route GET /api/admin/users
// @ desc Get all users(admin only)
// @ access Private/admin
router.get("/users",protect,admin,async(req,res) => {
    try{
        const users = await User.find({}) //exclude password field
        res.status(200).json(users)
    }
    catch(error){
        console.error(error)
    res.status(500).json({message:"Server Error"})
    }
})

// @route POST /api/admin/users
// @desc Create a new user(admin only)
// @access Private/admin
router.post("/users",protect,admin,async(req,res) => {
    const {name,email,password,role} = req.body
    try{
        let user = await User.findOne({email})
        if(user) {
            return res.status(400).json({message:"User already exists"})
        }
        user = new User({name,email,password,role})
        await user.save()
        res.status(201).json({message:"User created successfully",user})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

// @route PUT /api/admin/users/:id
// @desc Update a user(admin only)
// @access Private/admin
router.put("/users/:id",protect,admin,async(req,res) => {
    try{
        const user =await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        const {name,email,role} = req.body
        user.name = name || user.name
        user.email = email || user.email
        user.role = role || user.role
        const updatedUser = await user.save()
        res.status(200).json({message:"User updated successfully",updatedUser})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})

//@ route DELETE /api/admin/users/:id
// @desc Delete a user(admin only)
// @access Private/admin
router.delete("/users/:id",protect,admin,async(req,res) => {
    try{
        const user = await User.findById(req.params.id)
        if(!user) {
            return res.status(404).json({message:"User not found"})
        }
        await user.deleteOne()
        res.status(200).json({message:"User deleted successfully"})
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:"Server Error"})
    }
})


module.exports = router