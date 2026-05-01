const express = require("express")
const Order = require("../models/Order")
const {protect} = require("../middleware/authMiddleware")

const router = express.Router()

// @route GET /api/orders/my-orders
// @desc Get all orders for the logged-in user
// @access Private
router.get("/my-orders", protect, async (req, res) => {
    try{
        //find all orders for the logged-in user
        const orders = await Order.find({user:req.user._id}).sort({createdAt:-1}) //sort by most recent orders first
        res.status(200).json(orders)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:error.message})
    }
})

// @route GET /api/orders/:id
// @desc Get a specific order by ID for the logged-in user
// @access Private
router.get("/:id", protect, async (req, res) => {
    try{
        const order = await Order.findById(req.params.id).populate("user","email")
        if(!order) {
            return res.status(404).json({message:"Order Not Found"})
        }
        //Return the order details
        res.status(200).json(order)
    }
    catch(error){
        console.error(error)
        res.status(500).json({message:error.message})
    }
})

module.exports = router