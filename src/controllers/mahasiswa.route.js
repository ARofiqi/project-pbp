const router = require("express").Router();
const db = require("../connection/db");

const table = "mahasiswa";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      console.log("Gagal mengambil data dari table mahasiswa");
      return;
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nama, nim, jurusan, semester } = req.body;
  db.query(`INSERT INTO mahasiswa (nama, nim, jurusan, semester) VALUES (?, ?, ?, ?)`, [nama, nim, jurusan, semester], (err, result) => {
    if (err) {
      console.log("Gagal menambahkan data dari table mahasiswa");
      return;
    }
    res.json(result);
  });
});

router.get("/nama", (req, res) => {
  db.query(`select nama from ${table}`, (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mahasiswa" });
      return;
    }
    res.json(result);
  });
});

router.get("/jurusan/:jurusan", (req, res) => {
  const jurusan = req.params.jurusan;
  db.query(`select * from ${table} where jurusan = ?`, [jurusan], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mahasiswa" });
      return;
    }
    res.json(result);
  });
});

router.get("/semester/:semester", (req, res) => {
  const semester = req.params.semester;
  db.query(`select * from ${table} where semester = ?`, [semester], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mahasiswa" });
      return;
    }
    res.json(result);
  });
});

router.get("/nim/:nim", (req, res) => {
  const nim = req.params.nim;
  db.query(`select * from ${table} where nim = ?`, [nim], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mahasiswa" });
      return;
    }
    res.json(result);
  });
});

router.delete("/:nim", (req, res) => {
  const nim = req.params.nim;
  db.query(`delete from ${table} where nim = ?`, [nim], (err, result) => {
    if (err) {
      res.json({ message: "Gagal menghapus data dari table mahasiswa" });
      return;
    }
    res.json(result);
  });
});

module.exports = router;
