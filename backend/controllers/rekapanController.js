import RekapanNota from '../models/RekapanSchema.js';
import Nota from '../models/NotaSchema.js';
import asyncHandler from 'express-async-handler';
import puppeteer from 'puppeteer';
import { promises as fs } from 'fs';
import path from 'path';

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

const generatePDF = async (rekapanId) => {
  await createPdfDir();

  const currentDir = path.resolve();
  const filename = `rekapan-${rekapanId}.pdf`;
  const filepath = `pdf/${filename}`;

  const files = await fs.readdir(path.resolve(currentDir, 'pdf'));

  const fileAlreadyExist = files.find((file) => file === filename);

  if (fileAlreadyExist) {
    return filename;
  } else {
    const browser = await puppeteer.launch({ args: ['--no-sandbox'] });
    const page = await browser.newPage();
    await page.goto(
      `https://jktrans.herokuapp.com/rekapan/${rekapanId}/cetak`,
      {
        waitUntil: 'networkidle0',
      }
    );

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

// @desc    get all rekapan
// @route   GET /api/rekapan
// @query   ?pageSize=''&pageNumber=''&noPolis=''&sopirPengirim=''&dateStart=''&dateEnd=''
// @access  Private
const getAllRekapan = asyncHandler(async (req, res) => {
  try {
    const pageSize = Number(req.query.pageSize) || 10;
    const pageNumber = Number(req.query.pageNumber) || 1;

    let keyword = {};

    req.query.sopirPengirim &&
      (keyword = {
        ...keyword,
        sopirPengirim: req.query.sopirPengirim,
      });

    req.query.noPolis && (keyword = { ...keyword, noPolis: req.query.noPolis });

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

    const rekapanCount = await RekapanNota.countDocuments({ ...keyword });

    const allRekapan = await RekapanNota.find({ ...keyword })
      .limit(pageSize)
      .skip(pageSize * (pageNumber - 1))
      .populate({
        path: 'detailRekapanNota',
        populate: {
          path: 'nota',
          select: 'noNota',
        },
      });

    if (allRekapan) {
      res.json({
        allRekapan,
        currentPage: pageNumber,
        totalRekapan: rekapanCount,
        totalPageCount: Math.ceil(rekapanCount / pageSize),
      });
    } else {
      res.status(404).json({ message: 'Belum ada nota tersimpan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    create new rekapan
// @route   POST /api/rekapan
// @access  Private
const createNewRekapan = asyncHandler(async (req, res) => {
  try {
    const { sopirPengirim, noPolis, kumpulanIdNota } = req.body;

    const kumpulanNota = await Nota.find({ _id: { $in: kumpulanIdNota } });

    const detailRekapanNota = kumpulanNota.map((nota) => {
      return {
        nota: nota._id,
        colli: nota.totalColli,
        berat: nota.totalBerat,
        confrankert: nota.totalHarga,
        penerimaBarang: nota.namaPenerima,
      };
    });

    const newRekapan = {
      sopirPengirim,
      noPolis,
      detailRekapanNota,
    };

    const createdRekapan = await RekapanNota.create(newRekapan);

    await Nota.updateMany(
      { _id: { $in: kumpulanIdNota } },
      { sudahDirekap: true }
    );

    res
      .status(201)
      .json({ message: 'Rekapan berhasil dibuat', createdRekapan });
  } catch (error) {
    console.log(error);
  }
});

// @desc    delete a rekapan by ID
// @route   DELETE /api/rekapan/:rekapanId
// @access  Private/Super User
const deleteRekapan = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      const kumpulanIdNota = rekapan.detailRekapanNota.map((nota) => nota.nota);
      const deletedRekapan = await rekapan.delete();

      await Nota.updateMany(
        { _id: { $in: kumpulanIdNota } },
        { sudahDirekap: false }
      );

      res.json({
        message: `Rekapan dengan id ${deletedRekapan._id} berhasil dihapus`,
        deletedRekapan,
        kumpulanIdNota,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    update a rekapan by ID
// @route   PUT /api/rekapan/:rekapanId
// @access  Private
const updateRekapan = asyncHandler(async (req, res) => {
  try {
    const change = req.body;
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      rekapan.sopirPengirim = change.sopirPengirim || rekapan.sopirPengirim;
      rekapan.noPolis = change.noPolis || rekapan.noPolis;
      rekapan.detailRekapanNota =
        change.detailRekapanNota || rekapan.detailRekapanNota;

      const updatedRekapan = await rekapan.save();

      res.json({
        message: `Rekapan dengan id ${updatedRekapan._id} berhasil diupdate`,
        data: updatedRekapan,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    generate PDF from rekapan by Id
// @route   GET /api/rekapan/:rekapanId/print
// @access  Private
const generatePDFbyId = asyncHandler(async (req, res) => {
  const rekapanId = req.params.rekapanId;

  try {
    const filename = await generatePDF(rekapanId);

    res.json({ filename });
  } catch (error) {
    res.status(500);
    res.json({ message: error.message });
  }
});

// @desc    change a nota status in rekapan to paid by ID
// @route   PUT /api/rekapan/:rekapanId/nota/:notaId/paid
// @access  Private/Super User
const changeRekapanStatusToPaid = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      const indexOfNota = rekapan.detailRekapanNota.findIndex((nota) => {
        return nota.nota.toString() === req.params.notaId;
      });

      if (indexOfNota !== -1) {
        rekapan.detailRekapanNota[indexOfNota].isPaid = true;
        rekapan.detailRekapanNota[indexOfNota].paidAt = Date.now();
      } else {
        res.status(404).json({ message: 'Nota tidak ditemukan dalam rekapan' });
      }

      await rekapan.save();

      res.json({
        message: `Mengubah status pembayaran nota dengan id ${req.params.notaId} di rekapan berhasil`,
      });
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

// @desc    change a rekapan status to delivered by ID
// @route   PUT /api/rekapan/:rekapanId/nota/:notaId/delivered
// @access  Private/Super User
const changeRekapanStatusToDelivered = asyncHandler(async (req, res) => {
  try {
    const rekapan = await RekapanNota.findById(req.params.rekapanId);

    if (rekapan) {
      const indexOfNota = rekapan.detailRekapanNota.findIndex((nota) => {
        return nota.nota.toString() === req.params.notaId;
      });

      if (indexOfNota !== -1) {
        rekapan.detailRekapanNota[indexOfNota].isDelivered = true;
        rekapan.detailRekapanNota[indexOfNota].deliveredAt = Date.now();

        await rekapan.save();

        res.json({
          message: `Mengubah status pengiriman nota dengan id ${req.params.notaId} di rekapan berhasil`,
        });
      } else {
        res.status(404).json({ message: 'Nota tidak ditemukan dalam rekapan' });
      }
    } else {
      res.status(404).json({ message: 'Rekapan tidak ditemukan' });
    }
  } catch (error) {
    console.log(error);
  }
});

export {
  getAllRekapan,
  createNewRekapan,
  deleteRekapan,
  updateRekapan,
  generatePDFbyId,
  changeRekapanStatusToPaid,
  changeRekapanStatusToDelivered,
};
