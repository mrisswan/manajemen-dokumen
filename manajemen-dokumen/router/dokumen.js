const express = require("express");
const app = express();
const dokumen = require("../models/index").dokumen;
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const moment = require("moment");

const auth = require("../auth.js");
const SECRET_KEY = "INIPUNYAMANAJEMEN";

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./doc");
  },
  filename: (req, file, cb) => {
    cb(null, "doc-" + Date.now() + path.extname(file.originalname));
  },
});
let upload = multer({ storage: storage });

app.get("/", auth, async (req, res) => {
  dokumen
    .findAll()
    .then((result) => {
      res.json({
        data: result,
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.post("/", upload.single("filenya"), auth, async (req, res) => {
  if (!req.file) {
    res.json({
      message: "File Tidak Ada!",
    });
  } else {
    let data = {
      judul_dokumen: req.body.judul_dokumen,
      nama_pengunggah: req.body.nama_pengunggah,
      deskripsi: req.body.deskripsi,
      filenya: req.file.filename,
      tgl_upload: moment().format("YYYY-MM-DD"),
    };
    dokumen
      .create(data)
      .then((result) => {
        res.json({
          message: "Data Berhasil Ditambahkan",
          data: result,
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  }
});

app.put("/", upload.single("filenya"), auth, async (req, res) => {
  let param = {
    id_dokumen: req.body.id_dokumen,
  };
  let data = {
    judul_dokumen: req.body.judul_dokumen,
    nama_pengunggah: req.body.nama_pengunggah,
    deskripsi: req.body.deskripsi,
  };
  if (req.file) {
    // get data by id
    const row = dokumen
      .findOne({ where: param })
      .then((result) => {
        let oldFileName = result.filenya;

        // delete old file
        let dir = path.join(__dirname, "../doc", oldFileName);
        fs.unlink(dir, (err) => console.log(err));
      })
      .catch((error) => {
        console.log(error.message);
      });

    // set new filename
    data.filenya = req.file.filename;
  }
  dokumen
    .update(data, { where: param })
    .then((result) => {
      res.json({
        message: "Data Berhasil Diperbarui",
      });
    })
    .catch((error) => {
      res.json({
        message: error.message,
      });
    });
});

app.delete("/:id", auth, async (req, res) => {
  try {
    let param = { id_dokumen: req.params.id };
    let result = await dokumen.findOne({ where: param });
    let oldFileName = result.filenya;

    // delete old file
    let dir = path.join(__dirname, "../doc", oldFileName);
    fs.unlink(dir, (err) => console.log(err));

    // delete data
    dokumen
      .destroy({ where: param })
      .then((result) => {
        res.json({
          message: "data berhasil dihapus",
        });
      })
      .catch((error) => {
        res.json({
          message: error.message,
        });
      });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
});

module.exports = app;
