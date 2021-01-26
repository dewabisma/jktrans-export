const bcrypt = require('bcryptjs');

const users = [
  {
    username: 'wayan',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '123456789',
    NIK: '0981234753',
    isSuperUser: true,
  },
  {
    username: 'gede',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '123456789',
    NIK: '0981234752',
  },
  {
    username: 'nengah',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '1234567891',
    NIK: '0981234751',
  },
];

module.exports = users;
