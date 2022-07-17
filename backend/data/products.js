const products = [
  {
    name: 'Rich Dad Poor Dad',
    images: [
      { image1: '/images/book.jpeg' },
      { image1: '/images/book1.jpg' },
      { image1: '/images/book2.jpeg' },
    ],
    description:
      'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',

    category: 'Book',
    Cost: {
      price: 350,
      negotiable: true,
    },
    expiresOn: 2077 - 9 - 19,

    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },
    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti@gmail.com',
      phoneNo: { mobile: '9868383125', isVerified: true },
    },
  },

  {
    name: 'Fridge ',
    images: [
      { image1: '/images/fridge.jpg' },
      { image1: '/images/fridge1.jpg' },
      { image1: '/images/fridge2.jpg' },
    ],

    description:
      'Introducing the iPhone 11 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',

    category: 'Electronics',
    Cost: {
      price: 3500,
    },
    expiresOn: 2077 - 9 - 19,
    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },

    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti1@gmail.com',
      phoneNo: { mobile: '9868383125' },
    },
  },
  {
    name: 'Nokia Mobile',
    images: [
      { image1: '/images/mobile.jpg' },
      { image1: '/images/mobile1.jpg' },
      { image1: '/images/mobile2.jpg' },
    ],

    description:
      'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',

    category: 'Electronics',
    Cost: {
      price: 1350,
    },
    expiresOn: 2077 - 9 - 19,
    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },
    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti@gmail.com',
      phoneNo: { mobile: '9868383125' },
    },
  },
  {
    name: 'Daraz',
    images: [
      { image1: '/images/cupboard.jpeg' },
      { image1: '/images/cupboard1.jpg' },
      { image1: '/images/cupboard2.jpg' },
    ],

    description:
      'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',

    category: 'Electronics',
    Cost: {
      price: 2500,
    },
    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },
    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti@gmail.com',
      phoneNo: { mobile: '9868383125' },
    },
    expiresOn: 2077 - 9 - 19,
  },
  {
    name: 'Dining Table',
    images: [
      { image1: '/images/table.jpg' },
      { image1: '/images/table1.jpg' },
      { image1: '/images/table2.jpeg' },
    ],

    description:
      'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',

    category: 'Electronics',
    Cost: {
      price: 1500,
    },
    expiresOn: 2077 - 9 - 19,
    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },
    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti@gmail.com',
      phoneNo: { mobile: '9868383125' },
    },
  },
  {
    name: 'Old TV',
    images: [
      { image1: '/images/tv.jpg' },
      { image1: '/images/tv1.jpg' },
      { image1: '/images/tv2.jpg' },
    ],

    description:
      'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',

    category: 'Electronics',
    Cost: {
      price: 2100,
    },
    shippingAddress: {
      address: 'Bikasnagar',
      city: 'nepalgunj',
      shippingCharge: 100,
    },
    seller: {
      sellername: 'Moti Dhamala',
      selleraddress: 'Achham, Nepal',
      selleremail: 'dhamalamoti@gmail.com',
      phoneNo: { mobile: '9868383125' },
    },
    expiresOn: 2077 - 9 - 19,
  },
]
export default products
