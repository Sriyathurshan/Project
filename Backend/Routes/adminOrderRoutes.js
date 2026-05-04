const express = require("express")
const Order = require("../models/Order")
const {protect,admin}=require("../middleware/authMiddleware")

const router=express.Router()

// @route GET /api/admin/orders
// @desc Get all orders(admin only)
// @access Private/admin
router.get("/",protect,admin,async(req,res) => {
    try{
        const orders = await Order.find({}).populate("user","id name email").sort({createdAt:-1}) //sort by most recent orders first
        res.status(200).json(orders)
    }
    catch(error){
        cosnole.error(error)
        res.status(500).json({message:"Server Error"})
    }
})


// @route GET /api/admin/orders/:id
// @desc Update order status(admin only)
// @access Private/admin
router.put("/:id",protect,admin,async(req,res) => {
    try{
        const order = await Order.findById(req.params.id)
        if(order){
            order.status = req.body.status || order.status
            order.isDelivered =
                req.body.status === "Delivered" ?true :order.isDelivered
            order.deliveredAt =
                req.body.status === "Delivered" ? Date.now() : order.deliveredAt

            const updateOrder = await order.save()
            res.json(updateOrder)
        }
        else{
            res.status(404).json({message:"Order not found"})
        }
    }
    catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

// @route DELETE /api/admin/orders/:id
// @desc Delete an order
// @access Private/admin
router.delete("/:id",protect,admin , async(req,res)=>{
    try{
        const order = await Order.findById(req.params.id)
        if(order){
            await order.deleteOne()
            res.json({message:"Order Deleted Succesfully"})
        }
        else{
            res.status(404).json("Order not found")
        }
    }
    catch(error){
        console.error(error)
        res.status(500).send("Server Error")
}
})

module.exports = router