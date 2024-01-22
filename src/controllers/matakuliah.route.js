const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createPostSuccessResponse, createDeleteSuccessResponse, createSuccessResponse, createErrorResponse } = require("../../respoonse");

const table = "matakuliah";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { kode_matakuliah, nama_matakuliah, jumlah_sks } = req.body;
  db.query(`INSERT INTO ${table} (kode_matakuliah, nama_matakuliah, jumlah_sks) VALUES (?, ?, ?)`, [kode_matakuliah, nama_matakuliah, jumlah_sks], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({kode_matakuliah, nama_matakuliah, jumlah_sks }));
  });
});

router.get("/nama_matakuliah", (req, res) => {
  db.query(`select ${table} from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/kode_matakuliah/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  db.query(`select * from ${table} where kode_matakuliah = ?`, [kode_matakuliah], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.put("/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  const { nama_matakuliah, jumlah_sks } = req.body;
  db.query(`update ${table} set nama_matakuliah = ?, jumlah_sks = ? where kode_matakuliah = ?`, [nama_matakuliah, jumlah_sks, kode_matakuliah], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPutSuccessResponse({ kode_matakuliah, nama_matakuliah, jumlah_sks }));
  });
});

router.delete("/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  db.query(`delete from ${table} where kode_matakuliah = ?`, [kode_matakuliah], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createDeleteSuccessResponse());
  });
});

module.exports = router;
