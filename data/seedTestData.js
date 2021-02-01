const mongoose = require('mongoose');
require('dotenv').config();
const colors = require('colors');
const users = require('./user.js');
const nota = require('./nota.js');
const User = require('../models/userSchema.js');
const Nota = require('../models/notaSchema.js');
const RekapanNota = require('../models/RekapanSchema.js');
const Sequence = require('../models/SequenceSchema.js');
const connectDB = require('../config/db.js');

connectDB();

const importData = async () => {
  try {
    // Clear collection first
    await Nota.deleteMany();
    await User.deleteMany();
    await RekapanNota.deleteMany();
    await Sequence.deleteMany();

    // Create counter for id
    await Sequence.create({ _id: 'counter', sequenceNota: 3 });

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNota = nota.map((contohNota) => {
      return { ...contohNota, pegawai: adminUser };
    });

    const allSampleNota = await Nota.insertMany(sampleNota);

    let sampleDetailRekapanNota = allSampleNota.map((notanya) => {
      return {
        nota: notanya._id,
        colli: notanya.totalColli,
        berat: notanya.totalBerat,
        confrankert: notanya.totalHarga,
        penerimaBarang: notanya.namaPenerima,
      };
    });

    const sampleRekapan = {
      sopirPengirim: 'wayan',
      noPolis: 'AB-2123',
      detailRekapanNota: sampleDetailRekapanNota,
    };

    await RekapanNota.create(sampleRekapan);

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
