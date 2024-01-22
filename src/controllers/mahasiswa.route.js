const router = require("express").Router();
const db = require("../connection/db");
const { createPutSuccessResponse, createDeleteSuccessResponse, createPostSuccessResponse, createSuccessResponse, createErrorResponse } = require("../../respoonse");

const table = "mahasiswa";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.post("/", (req, res) => {
  const { nama, nim, jurusan, semester } = req.body;
  db.query(`INSERT INTO mahasiswa (nama, nim, jurusan, semester) VALUES (?, ?, ?, ?)`, [nama, nim, jurusan, semester], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPostSuccessResponse({ nama, nim, jurusan, semester }));
  });
});

router.put("/:nim", (req, res) => {
  const nim = req.params.nim;
  const { nama, jurusan, semester } = req.body;
  db.query(`UPDATE mahasiswa SET nama = ?, jurusan = ?, semester = ? WHERE nim = ?`, [nama, jurusan, semester, nim], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createPutSuccessResponse({ nama, nim, jurusan, semester }));
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

router.get("/jurusan/:jurusan", (req, res) => {
  const jurusan = req.params.jurusan;
  db.query(`select * from ${table} where jurusan = ?`, [jurusan], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/semester/:semester", (req, res) => {
  const semester = req.params.semester;
  db.query(`select * from ${table} where semester = ?`, [semester], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.get("/nim/:nim", (req, res) => {
  const nim = req.params.nim;
  db.query(`select * from ${table} where nim = ?`, [nim], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createSuccessResponse(result));
  });
});

router.delete("/:nim", (req, res) => {
  const nim = req.params.nim;
  db.query(`delete from ${table} where nim = ?`, [nim], (err, result) => {
    if (err) {
      res.status(500).json(createErrorResponse(500, err.message));
    }
    res.json(createDeleteSuccessResponse());
  });
});

module.exports = router;
