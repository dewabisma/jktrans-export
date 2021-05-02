import bcrypt from 'bcryptjs';

const users = [
  {
    username: 'wayan@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '123456789',
    NIK: '0981234753',
    cabang: 'Super User',
    isSuperUser: true,
  },
  {
    username: 'gede@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '123456789',
    NIK: '0981234752',
    cabang: 'BALI',
  },
  {
    username: 'nengah@gmail.com',
    password: bcrypt.hashSync('123456', 10),
    alamat: 'bangli',
    noHP: '1234567891',
    NIK: '0981234751',
    cabang: 'SBY',
  },
];

export default users;
