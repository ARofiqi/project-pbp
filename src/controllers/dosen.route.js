const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createPostSuccessResponse, createDeleteSuccessResponse, createSuccessResponse, createErrorResponse } = require("../../respoonse");

const table = "dosen";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { nidn, nama, gelar, mata_kuliah } = req.body;
  db.query(`INSERT INTO dosen (nidn, nama, gelar, mata_kuliah) VALUES (?, ?, ?, ?)`, [nidn, nama, gelar, mata_kuliah], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({ nidn, nama, gelar, mata_kuliah }));
  });
});

router.get("/nama", (req, res) => {
  db.query(`select nama from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/nidn/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query(`select * from ${table} where nidn = ?`, [nidn], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/matakuliah/:matakuliah", (req, res) => {
  const matakuliah = req.params.matakuliah;
  db.query(`select * from ${table} where mata_kuliah = ?`, [matakuliah], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.put("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  const { nama, gelar, mata_kuliah } = req.body;
  db.query(`update ${table} set nama = ?, gelar = ?, mata_kuliah = ? where nidn = ?`, [nama, gelar, mata_kuliah, nidn], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPutSuccessResponse({ nidn, nama, gelar, mata_kuliah }));
  });
});

router.delete("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query(`delete from ${table} where nidn = ?`, [nidn], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createDeleteSuccessResponse());
  });
});

module.exports = router;
