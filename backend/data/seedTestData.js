import dotenv from 'dotenv';
import colors from 'colors';
import users from './user.js';
import nota from './nota.js';
import User from '../models/UserSchema.js';
import Nota from '../models/NotaSchema.js';
import RekapanNota from '../models/RekapanSchema.js';
import Sequence from '../models/SequenceSchema.js';
import connectDB from '../config/db.js';

dotenv.config();
connectDB();

const importData = async () => {
  try {
    // Clear collection first
    await Nota.deleteMany();
    await User.deleteMany();
    await RekapanNota.deleteMany();
    await Sequence.deleteMany();

    // Create counter for id
    await Sequence.create({ _id: 'counter', sequenceNota: 5 });

    const createdUsers = await User.insertMany(users);

    const adminUser = createdUsers[0]._id;

    const sampleNota = nota.map((contohNota) => {
      return { ...contohNota, pegawai: adminUser };
    });

    const allSampleNota = await Nota.insertMany(sampleNota);

    const notaForRekap = allSampleNota.filter((nota, index) => index < 3);

    const idNotaSudahDirekap = [];

    let sampleDetailRekapanNota = notaForRekap.map((notanya) => {
      idNotaSudahDirekap.push(notanya._id);

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
    await Nota.updateMany(
      { _id: { $in: idNotaSudahDirekap } },
      { sudahDirekap: true }
    );

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
