import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

const getProducts = asyncHandler(async (req, res) => {
  const pageSize = 6
  const page = Number(req.query.pageNumber) || 1
  const keyword = req.query.keyword
    ? {
      name: {
        $regex: req.query.keyword,
        $options: 'i',
      },
    }
    : {}
  console.log("LUND >>>> ", keyword)
  const count = await Product.countDocuments({ ...keyword })
  const products = await Product.find({}, null, {
    sort: { createdAt: -1 },
  })
    .limit(pageSize)
    .skip(pageSize * (page - 1))
  console.log(products)
  if (products.length !== 0) {
    res.status(201).json({ products, page, pages: Math.ceil(count / pageSize) })
  } else {
    res.status(400).json({ message: 'No match found' })
  }
})

const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    res.json(product)
  } else {
    res.status(400).json({ message: 'No product found' })
  }
})

//delete product by admin

const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (product) {
    await product.remove()
    res.json({ message: 'Product removed' })
  } else {
    res.status(404)
    throw new Error('Product not found')
  }
})

//upload products by logged in user
const createProduct = asyncHandler(async (req, res) => {
  console.log('create prouduct')
  const {
    name,
    images,

    description,
    category,
    expiresOn,
    address,
    shippingCharge,
    price,
    negotiable,
  } = req.body
  const validatename = name.length
  const validatedescription = description.length
  const validateaddress = address.length
  const validatecategory = category.length

  if (validatename < 3) {
    res.status(400)
    throw new Error('Name must be of 3 characters  or more length ')
  }
  if (validatedescription < 7) {
    res.status(400)
    throw new Error('Description must be of 7 characters  or more length ')
  }
  if (validateaddress < 5) {
    res.status(400)
    throw new Error('Address must be of 5 characters  or more length ')
  }
  if (validatecategory < 5) {
    res.status(400)
    throw new Error('Category must be of 5 characters  or more length ')
  }
  var x = new Date(expiresOn)
  var y = new Date(Date.now())

  if (images[0].image1 === '') {
    res.status(400)
    throw new Error('Upload an Image')
  }
  if (x < y) {
    res.status(400)
    throw new Error('Put the upcoming date')
  }
  const product = await Product.create({
    name,
    images,
    description,
    category,
    expiresOn,
    user: req.user._id,
    shippingAddress: { address, shippingCharge },
    seller: {
      sellername: req.user.name,
      selleraddress: req.user.address,
      selleremail: req.user.email,
      phoneNo: {
        mobile: req.user.contact.phone_no,
        isVerified: req.user.contact.isVerified,
      },
    },
    Cost: { price, negotiable },
  })

  if (product) {
    res.status(201).json({
      message: 'Your property is successfully listed',
    })
  } else {
    res.status(400)
    throw new Error('Invalid Property Data')
  }
})

//update product
const updateProduct = asyncHandler(async (req, res) => {
  const {
    name,
    images,

    description,
    category,
    expiresOn,
    address,
    shippingCharge,
    price,
    negotiable,
  } = req.body

  const product = await Product.findById(req.params.id)

  var x = new Date(expiresOn)
  var y = new Date(Date.now())

  if (x < y) {
    res.status(400)
    throw new Error('Put the upcoming date')
  }
  if (
    (product && product.user.toString() === req.user._id.toString()) ||
    (product && req.user.isAdmin)
  ) {
    product.name = name || product.name
    product.images = images || product.images
    product.description = description || product.description
    product.category = category || product.category
    product.expiresOn = expiresOn || product.expiresOn
    product.shippingAddress.address = address || product.shippingAddress.address
    product.shippingAddress.shippingCharge =
      shippingCharge || product.shippingAddress.shippingCharge

    product.Cost.price = price || product.Cost.price
    product.Cost.negotiable = negotiable || product.Cost.negotiable

    const updatedProduct = await product.save()
    res.status(201).json(updatedProduct)
  } else {
    res.status(404)
    throw new Error('You cannot edit this product')
  }
})

//give product review

const reviewProduct = asyncHandler(async (req, res) => {
  const { comment } = req.body
  console.log(req.body)
  const review = {
    name: req.user.name,
    comment,
    user: req.user._id,
  }
  const product = await Product.findById(req.params.id)

  product.reviews.push(review)

  await product.save()
  res.status(201).json({ message: 'Review successfully added' })
})

export {
  getProducts,
  getProductById,
  deleteProduct,
  createProduct,
  updateProduct,
  reviewProduct,
}
