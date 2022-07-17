import mongoose from 'mongoose'
const reviewSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
)
const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    name: {
      type: String,
      required: true,
    },
    images: [
      {
        image1: {
          type: String,
          required: true,
        },
      },
    ],
    reviews: [reviewSchema],

    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    Cost: {
      price: {
        type: Number,
        required: true,
        default: 0,
      },
      negotiable: {
        type: Boolean,
        required: true,
        default: false,
      },
    },
    expiresOn: {
      type: Date,
      required: true,
    },
    shippingAddress: {
      address: {
        type: String,
        required: true,
      },
      city: {
        type: String,
      },
      shippingCharge: {
        type: Number,
        required: true,
        default: 0,
      },
    },
    seller: {
      sellername: {
        type: String,
        required: true,
      },
      selleraddress: {
        type: String,
        required: true,
      },
      selleremail: {
        type: String,
        required: true,
      },
      phoneNo: {
        mobile: {
          type: String,
          required: true,
        },
        isVerified: {
          type: Boolean,
          required: true,
          default: false,
        },
      },
    },
  },
  {
    timestamps: true,
  }
)
const Product = mongoose.model('Product', productSchema)
export default Product
