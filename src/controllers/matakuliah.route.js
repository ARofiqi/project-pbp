const router = require("express").Router();
const db = require("../connection/db");

const table = "matakuliah";

router.get("/", (req, res) => {
  db.query(`select * from ${table}`, (err, result) => {
    if (err) {
      console.log("Gagal mengambil data dari table mata_kuliah");
      return;
    }
    res.json(result);
  });
});

router.post("/", (req, res) => {
  const { nama, gelar, mata_kuliah } = req.body;
  db.query(`INSERT INTO mata_kuliah (nama, gelar, mata_kuliah) VALUES (?, ?, ?, ?)`, [nama, gelar, mata_kuliah], (err, result) => {
    if (err) {
      console.log("Gagal menambahkan data dari table mata_kuliah");
      return;
    }
    res.json(result);
  });
});

router.get("/nama_matakuliah", (req, res) => {
  db.query(`select nama_matakuliah from ${table}`, (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mata_kuliah" });
      return;
    }
    res.json(result);
  });
});

router.get("/kode_matakuliah/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  db.query(`select * from ${table} where kode_matakuliah = ?`, [kode_matakuliah], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table mata_kuliah" });
      return;
    }
    res.json(result);
  });
});

router.put("/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  const { nama_matakuliah, jumlah_sks } = req.body;
  db.query(`update ${table} set nama_matakuliah = ?, jumlah_sks = ? where nim = ?`, [nama_matakuliah, jumlah_sks, kode_matakuliah], (err, result) => {
    if (err) {
      res.json({ message: "Gagal mengambil data dari table matakuliah" });
      return;
    }
    res.json(result);
  });
});

router.delete("/:kode_matakuliah", (req, res) => {
  const kode_matakuliah = req.params.kode_matakuliah;
  db.query(`delete from ${table} where kode_matakuliah = ?`, [kode_matakuliah], (err, result) => {
    if (err) {
      res.json({ message: "Gagal menghapus data dari table matakuliah" });
      return;
    }
    res.json(result);
  });
});

module.exports = router;
