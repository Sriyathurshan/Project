const express = require("express")
const Product = require("../models/Product")
const {protect,admin}=require("../middleware/authMiddleware")
const react = require("react")

const router=express.Router()

// @route POST /api/products
//@desc Create a new Product
//@access Private/admin

router.post("/",protect,admin,async(req,res) => {
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
            } =req.body

            const product =new Product({   
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku,
            user:req.user._id //reference to the admin user who created it
            })
            
             const createdProduct = await product.save()
             res.status(201).json(createdProduct)

       }
       catch(error){
        console.error(error)
        res.status(500).send("Server Error")
       }
    
})


//@route PUT /api/product/:id
//@desc Update and exisitng product ID
router.put("/:id",protect,admin,async(req,res) =>{
    try{
        const {
            name,
            description,
            price,
            discountPrice,
            countInStock,
            category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,
            images,
            isFeatured,
            isPublished,
            tags,
            dimensions,
            weight,
            sku
        } =req.body
    
    //Find Product by ID  
    const product = await Product.findById(req.params.id) 
    
    if(product){
        //update product fields
        product.name=name||product.name
        product.description=description||product.description
        product.price=price||product.price
        product.discountPrice=discountPrice||product.discountPrice
        product.countInStock=countInStock||product.countInStock
        product.category=category||product.category
        product.brand=brand||product.brand
        product.sizes=sizes||product.sizes
        product.colors=colors||product.colors
        product.collections=collections||product.collections
        product.material=material||product.material
        product.gender=gender||product.gender
        product.images=images||product.images
        product.isFeatured=isFeatured !== undefined? isFeatured:product.isFeatured
        product.isPublished=isPublished!==undefined?isPublished:product.isPublished
        product.tags=tags||product.tags
        product.dimensions=dimensions||product.dimensions
        product.weight=weight||product.weight
        product.sku=sku||product.sku
    
        //save the details to product
        const updatedProduct=await product.save()
        res.json(updatedProduct)
    }else{
        res.status(404).json({message:"product not found"})
    }
    }catch(error){
        console.error(error)
        res.status(500).json("server error")
    }
})

//@route DELETE /api/products/:id
//@desc Delete a product by ID
//@access private/admin

router.delete("/:id",protect,admin,async(req,res) =>{
    try{
        //find the product by id
        const product = await Product.findById(req.params.id)

        if(product){
            await product.deleteOne()
            res.json({message:"Product removed"})
        }else{
            res.status(404).json({message :"product not found"})
        }
    }catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

//@route GET /api/products
//@desc Get all products with optional query filters
// @access Public
router.get("/",async(req,res)=>{
    try{
        const {collection,size,color,gender,minPrice,maxPrice,sortBy,
            search,category,material,brand,limit
        }=req.query

        let query ={}

        //Filter Function
        if (collection && collection.toLocaleLowerCase() !== "all"){
            query.collections=collection
        }

        if (category && category.toLocaleLowerCase() !== "all"){
            query.category=category
        }

        if (material){
            query.material={$in :material.split(",")}
        }

        if(brand){
            query.brand={$in :brand.split(",")}
        }

        if(size){
            query.sizes={$in :size.split(",")}
        }

        if(color){
            query.colors={$in :color.split(",")}
        }

        if(gender){
            query.gender=gender
        }

        if(minPrice||maxPrice){
            query.price={}
            if(minPrice) query.price.$gte = Number(minPrice)
            if(maxPrice) query.price.$lte=Number(maxPrice)
        }

        if(search){
            query.$or =[
                {name:{$regex :search,$options:"i"}},
                {description:{$regex :search,$options:"i"}}
            ]
        }

        let sort={}

        if(sortBy){
            switch (sortBy){
                case "priceAsc":
                    sort={price:1}
                    break
                case "priceDesc":
                    sort={price:-1}
                    break
                case "popularity":
                    sort={rating:-1}
                    break
                default:
                    break
            }
        }

        //Fetch the product form database
        let products =await Product.find(query).sort(sort).limit(Number(limit) || 0)
        res.json(products)
    
    }
     catch(error){
        console.error(error) 
        res.status(500).json("server error")
    }
})


// @route GET /api/products/best-seller
// @desc Retrieve the product with highest rating
//@access Public
router.get("/best-seller",async(req,res) =>{
    try{
        const bestSeller = await Product.findOne().sort({rating:-1})
        if (bestSeller){
            res.json(bestSeller)
        }else{
            res.status(404).json({message:"Not Found"})
        }
    }catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})

// @route GET api/products/new-arrivals
// @desc Retrieve letest 8 products - creation date
//@access Public
router.get("/new-arrivals",async(req,res)=>{
    try{
        const newArrivals = await Product.find().sort({createdAt:-1}).limit(8)
        res.json(newArrivals)
    }catch(error){
        console.error(error)
        res.status(500).json("Server Error")
    }
})


//@route GET/ api/products/:id
//@desc Get a single product details
//@access Public
router.get("/:id",async(req,res) =>{
  
    try {
        const product=await Product.findById(req.params.id)
        if(product){
            res.json(product)
        }else{
            res.status(400).json({message:"Product Not Found"})
        }
    }catch(error){
        console.error(error)
        res.status(500).json("Server Error")
    }
})

// @route GET API/products/similar/:id
// @desc retrieve similar products based on the current product's gender and category
// @access public
router.get("/similar/:id",async(req,res) =>{
    const{id} = req.params
    try{
        const product = await Product.findById(id)

        if(!product){
            return res.status(404).json({message:"Product Not Found"})
        }

        const similarProducts = await Product.find({
            _id :{$ne:id}, //exclude the current id
            gender:product.gender,
            category:product.category
        }).limit(4)

        res.json(similarProducts)
    }catch(error){
        console.error(error)
        res.status(500).send("Server Error")
    }
})


module.exports = router;