const router = require("express").Router();
const db = require("../connection/db");

const table = "dosen";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      console.log("Gagal mengambil data dari table dosen");
      return;
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nama, gelar, mata_kuliah } = req.body;
  db.query(`INSERT INTO dosen (nama, gelar, mata_kuliah) VALUES (?, ?, ?, ?)`, [nama, gelar, mata_kuliah], (err, result) => {
    if (err) {
      console.log("Gagal menambahkan data dari table dosen");
      return;
    }
    res.json(result);
  });
});

router.get("/nama", (req, res) => {
  db.query(`select nama from ${table}`, (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table dosen" });
      return;
    }
    res.json(result);
  });
});

router.get("/nidn/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query(`select * from ${table} where nidn = ?`, [nidn], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table dosen" });
      return;
    }
    res.json(result);
  });
});

router.get("/matakuliah/:matakuliah", (req, res) => {
  const matakuliah = req.params.matakuliah;
  db.query(`select * from ${table} where mata_kuliah = ?`, [matakuliah], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table dosen" });
      return;
    }
    res.json(result);
  });
});

router.put("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  const { nama, gelar, mata_kuliah } = req.body;
  db.query(`update ${table} set nama = ?, gelar = ?, mata_kuliah = ? where nim = ?`, [nama, gelar, mata_kuliah, nidn], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table dosen" });
      return;
    }
    res.json(result);
  });
});

router.delete("/:nidn", (req, res) => {
  const nidn = req.params.nidn;
  db.query(`delete from ${table} where nidn = ?`, [nidn], (err, result) => {
    if (err) {
      res.json({ message: "Gagal menghapus data dari table dosen" });
      return;
    }
    res.json(result);
  });
});

module.exports = router;
