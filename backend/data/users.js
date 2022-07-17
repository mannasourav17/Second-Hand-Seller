import bcrypt from 'bcryptjs'
const users = [
  {
    name: 'Admin user ',
    email: 'admin@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    address: 'Nepalgunj, Banke',
    contact: { phone_no: '9864421289', isVerified: true },
    isAdmin: true,
  },
  {
    name: 'john doe',
    email: 'johndoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    address: 'Nepalgunj, Banke',
    contact: { phone_no: '9864421289' },
  },
  {
    name: 'jane doe',
    email: 'janedoe@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    address: 'Nepalgunj, Banke',
    contact: { phone_no: '9864421289' },
  },
]

export default users
