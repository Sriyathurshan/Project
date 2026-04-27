const express = require("express")
const {protect} = require("../middleware/authMiddleware")
const Cart = require("../models/Cart")
const Product = require("../models/Product")
const Order = require("../models/Order")
const Checkout = require("../models/Checkout")

const router = express.Router()
 
// @route POST /api/checkout
// @desc Create a new checkout session
// @access Private
router.post("/",protect, async (req, res) => {
    const { checkoutItems, shippingAddress, paymentMethod ,totalPrice} = req.body

    if(!checkoutItems || checkoutItems.length === 0) {
        return res.status(400).json({ message: "No checkout items" })
    } 

    try{
        //create a new checkout session
        const newCheckout = await Checkout.create({
            user: req.user._id,
            checkoutItems:checkoutItems,
            shippingAddress,
            paymentMethod,
            totalPrice,
            paymentStatus: "pending"
        })
        console.log(`New Checkout Created for user: ${req.user._id}`)
        res.status(201).json(newCheckout)
    }
    catch(error){
        console.error("Error creating checkout session", error)
        res.status(500).json({ message: "Server Error" })
    } 
})

// @route PUT /api/checkout/:id/pay
// @desc Update a checkout session to paid after successful payment
// @access Private
router.put("/:id/pay", protect, async (req, res) => {
    const { paymentStatus, paymentDetails } = req.body

    try{
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout) {
            return res.status(404).json({ message: "Checkout session not found" })
        }

        if(paymentStatus === "paid") {
            checkout.isPaid = true
            checkout.paidAt = Date.now()
            checkout.paymentDetails = paymentDetails
            checkout.paymentStatus = paymentStatus
            await checkout.save()
            console.log(`Checkout session ${req.params.id} marked as paid`)
            res.status(200).json({ message: "Checkout session updated to paid" })
        }
        else{
            res.status(400).json({ message: "Invalid payment status" })
        }
    }
    catch(error){
        console.error("Error updating checkout session", error)
        res.status(500).json({ message: "Server Error" })
    }
})

// @route POST /api/checkout/:id/finalize 
// @desc Finalize the checkout session and convert to an order after payment confirmed
// @access Private
router.post("/:id/finalize", protect, async (req, res) => {
    try{
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout) {
            return res.status(404).json({ message: "Checkout not found" })
        }

        if(checkout.isPaid && !checkout.finalized) {
            //create final order based on the checkout details
            const finalOrder = await Order.create({
                user: checkout.user,
                orderItems: checkout.checkoutItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid:true,
                paidAt: checkout.paidAt,
                isDelivered: false,
                paymentStatus: "paid",
                paymentDetails: checkout.paymentDetails
            })

            //mark the checkout as finalized
            checkout.isfinalized = true
            checkout.finalizedAt = Date.now()
            await checkout.save()

            //delete the cart associated with the user
            await Cart.findOneAndDelete({ user: checkout.user })
            console.log(`Checkout session ${req.params.id} finalized and converted to order`)
            res.status(201).json(finalOrder)
        }
        else if(checkout.isFinalized){
            res.status(400).json({ message: "Checkout is already finalized" })
        }else{
            res.status(400).json({ message: "Checkout is not paid yet" })
        }
    }
    catch(error){
        console.error("Error finalizing checkout session", error)
        res.status(500).json({ message: "Server Error" })
    }
})

module.exports = router
