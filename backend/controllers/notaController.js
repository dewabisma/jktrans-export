import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';
import Nota from '../models/NotaSchema.js';
import asyncHandler from 'express-async-handler';

// Functions
const createPdfDir = async () => {
  await fs.mkdir(path.join(path.resolve(), 'pdf'), {
    recursive: true,
  });
};

const pageFullyRendered = async (page) => {
  const timeout = 10000;
  const checkingTime = 500;
  const maxCheckingCount = timeout / checkingTime;
  let lastHTMLSize = 0;
  let checkingCount = 0;
  let stableCheckingIterationCount = 0;
  const minStableCheckingIterationCount = 4;

  while (checkingCount++ < maxCheckingCount) {
    let html = await page.content();
    let currentHTMLSize = html.length;

    if (lastHTMLSize != 0 && currentHTMLSize == lastHTMLSize)
      stableCheckingIterationCount++;
    else stableCheckingIterationCount = 0;

    if (stableCheckingIterationCount >= minStableCheckingIterationCount) {
      break;
    }

    lastHTMLSize = currentHTMLSize;
    await page.waitForTimeout(checkingTime);
  }
};

const browserLogin = async (page) => {
  await page.type('#email', process.env.PDF_EMAIL);
  await page.type('#password', process.env.PDF_PASSWORD);
  await page.click('#login');
};

const generatePDF = async (notaId) => {
  await createPdfDir();

  const currentDir = path.resolve();
  const filename = `nota-${notaId}.pdf`;
  const filepath = `pdf/${filename}`;

  const files = await fs.readdir(path.resolve(currentDir, 'pdf'));

  const fileAlreadyExist = files.find((file) => file === filename);

  if (fileAlreadyExist) {
    return filename;
  } else {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(`https://jktrans.herokuapp.com/nota/${notaId}/cetak`, {
      waitUntil: 'networkidle0',
    });

    await browserLogin(page);

    await page.waitForNavigation({
      waitUntil: 'networkidle0',
    });

    await pageFullyRendered(page);

    await page.pdf({ path: filepath, format: 'a4' });

    await browser.close();

    return filename;
  }
};

// @desc    get all nota
// @route   GET /nota
// @query   ?pageSize=''&pageNumber=''&namaPengirim=''&cabang=''&dateStart=''&dateEnd=''
// @access  Private
const getAllNota = asyncHandler(async (req, res) => {
  try {
    const pageSize = req.query.pageSize ? Number(req.query.pageSize) : 10;
    const pageNumber = req.query.pageNumber ? Number(req.query.pageNumber) : 1;

    let keyword = {};

    req.query.namaPengirim &&
      (keyword = {
        ...keyword,
        namaPengirim: {
          $regex: req.query.namaPengirim,
          $options: 'i',
        },
      });

    req.query.cabang &&
      (keyword = { ...keyword, cabang: req.query.cabang.toUpperCase() });

    if (req.query.dateStart) {
      req.query.dateEnd
        ? (keyword = {
            ...keyword,
            createdAt: {
              $gt: new Date(req.query.dateStart),
              $lt: new Date(req.query.dateEnd),
            },
          })
        : (keyword = {
            ...keyword,
            createdAt: { $gt: new Date(req.query.dateStart) },
          });
    } else if (req.query.dateEnd) {
      keyword = {
        ...keyword,
        createdAt: { $lt: new Date(req.query.dateEnd) },
      };
    }

    const notaCount = await Nota.countDocuments({ ...keyword });

    const allNota = await Nota.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))
      .populate('pegawai', '-password');

    if (allNota) {
      res.json({
        allNota,
        currentPage: pageNumber,
        totalNota: notaCount,
        totalPageCount: Math.ceil(notaCount / pageSize),
      });
    } else {
      res.status(404).json({ message: 'Belum ada nota tersimpan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    get nota by Id
// @route   GET /nota/:notaId
// @access  Private
const getNotaById = asyncHandler(async (req, res) => {
  const nota = await Nota.findById(req.params.notaId).populate(
    'pegawai',
    '-password'
  );

  if (nota) {
    res.json(nota);
  } else {
    res.status(404).json({ message: 'Nota tidak ditemukan' });
  }
});

// @desc    delete nota by Id
// @route   DELETE /nota/:notaId
// @access  Private
const deleteNotaById = asyncHandler(async (req, res) => {
  const nota = await Nota.findById(req.params.notaId);

  if (nota) {
    if (nota.sudahDirekap) {
      res.status(400).json({
        message:
          'Nota tercantum dalam rekapan! Silahkan hapus rekapan tersebut terlebih dahulu!',
      });
    } else {
      const deletedNota = await nota.remove();
      if (deletedNota) {
        res.json({ message: 'Nota berhasil dihapus', deletedNota });
      } else {
        res.json({ message: 'Gagal menghapus nota' });
      }
    }
  } else {
    res.status(404).json({ message: 'Nota tidak ditemukan' });
  }
});

// @desc    create new nota
// @route   POST /nota
// @access  Private
const createNewNota = asyncHandler(async (req, res) => {
  const {
    user,
    body: {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang,
      totalColli,
      totalBerat,
      totalHarga,
    },
  } = req;

  const newNota = {
    pegawai: user._id,
    namaPengirim,
    namaPenerima,
    alamatPenerima,
    detailBarang,
    totalColli,
    totalHarga,
    totalBerat,
    cabang: user.cabang,
  };

  const createdNota = await Nota.create(newNota);

  const populatedCreatedNota = await createdNota
    .populate('pegawai', '-password')
    .execPopulate();

  if (createdNota) {
    res.status(201).json(populatedCreatedNota);
  } else {
    res.json({ message: 'Gagal membuat nota' });
  }
});

// @desc    edit nota by ID
// @route   PUT /api/nota/:notaId/edit
// @access  Private (super user only)
const editNotaById = asyncHandler(async (req, res) => {
  const {
    user,
    body: {
      namaPengirim,
      namaPenerima,
      alamatPenerima,
      detailBarang,
      totalColli,
      totalBerat,
      totalHarga,
    },
  } = req;

  const nota = await Nota.findById(req.params.notaId);
  if (nota) {
    nota.namaPengirim = namaPengirim || nota.namaPengirim;
    nota.namaPenerima = namaPenerima || nota.namaPenerima;
    nota.alamatPengirim = alamatPenerima || nota.alamatPenerima;
    nota.detailBarang = detailBarang || nota.detailBarang;
    nota.totalColli = totalColli || nota.totalColli;
    nota.totalBerat = totalBerat || nota.totalBerat;
    nota.totalHarga = totalHarga || nota.totalHarga;

    const updatedNota = await nota.save();

    await updatedNota.populate('pegawai', '-password').execPopulate();

    res.json({
      message: `Nota dengan nomor nota ${updatedNota.noNota} telah berhasil diubah`,
      data: updatedNota,
    });
  } else {
    res.status(404);
    throw new Error(`Nota dengan id ${req.params.notaId} tidak ditemukan`);
  }
});

// @desc    generate PDF from nota by Id
// @route   GET /api/nota/:notaId/print
// @access  Private
const generatePDFbyId = asyncHandler(async (req, res) => {
  const notaId = req.params.notaId;

  try {
    const filename = await generatePDF(notaId);

    res.json({ filename });
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

// @desc    request edit nota by Id
// @route   PUT /api/nota/:notaId/change-request
// @access  Private
const requestEditNotaById = asyncHandler(async (req, res) => {
  const {
    user,
    body: { alasanPerubahanNota },
  } = req;

  const nota = await Nota.findById(req.params.notaId);

  if (nota) {
    if (alasanPerubahanNota.trim()) {
      const permohonan = {
        pemohon: user._id,
        alasanPermohonan: alasanPerubahanNota,
      };

      nota.permohonanPerubahan = permohonan;
    } else {
      nota.permohonanPerubahan = null;
    }

    const updatedNota = await nota.save();

    res.status(201);
    res.json({
      message: `Permohonan perubahan telah berhasil dibuat`,
      updatedNota,
    });
  } else {
    res.status(404);
    throw new Error(`Nota dengan id ${req.params.notaId} tidak ditemukan`);
  }
});

// @desc    request delete nota by Id
// @route   PUT /api/nota/:notaId/delete-request
// @access  Private
const requestDeleteNotaById = asyncHandler(async (req, res) => {
  const {
    user,
    body: { alasanPenghapusanNota },
  } = req;

  const nota = await Nota.findById(req.params.notaId);

  if (nota) {
    if (alasanPenghapusanNota.trim()) {
      const permohonan = {
        pemohon: user._id,
        alasanPermohonan: alasanPenghapusanNota,
      };

      nota.permohonanPenghapusan = permohonan;
    } else {
      nota.permohonanPenghapusan = null;
    }

    const updatedNota = await nota.save();

    res.status(201);
    res.json({
      message: `Permohonan penghapusan telah berhasil dibuat`,
      updatedNota,
    });
  } else {
    res.status(404);
    throw new Error(`Nota dengan id ${req.params.notaId} tidak ditemukan`);
  }
});

export {
  getAllNota,
  getNotaById,
  deleteNotaById,
  createNewNota,
  editNotaById,
  generatePDFbyId,
  requestEditNotaById,
  requestDeleteNotaById,
};
