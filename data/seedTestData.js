const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const users = require('./user.js');
const nota = require('./nota.js');
const User = require('../models/userSchema.js');
const Nota = require('../models/notaSchema.js');
const connectDB = require('../config/db.js');

connectDB();

const importData = async () => {
  try {
    await Nota.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNota = nota.map((contohNota) => {
      return { ...contohNota, pegawai: adminUser };
    });

    await Nota.insertMany(sampleNota);

    console.log('Data Imported!'.green.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await Nota.deleteMany();
    await User.deleteMany();

    console.log('Data Destroyed!'.red.inverse);
    process.exit();
  } catch (error) {
    console.error(`${error}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
