const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./src/connection/db");
const bodyParser = require("body-parser");
const adminAuth = require("./src/middleware/admin");
const jwt = require('jsonwebtoken');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mahasiswaRoute = require("./src/controllers/mahasiswa.route");
const dosenRoute = require("./src/controllers/dosen.route");
const matakuliahRoute = require("./src/controllers/matakuliah.route");
app.use("/mahasiswa", mahasiswaRoute);
app.use("/dosen", dosenRoute);
app.use("/matakuliah", matakuliahRoute);

app.get("/", (req, res) => {
  res.json({
    autor: "Code dibuat oleh Ahmad Rofiqi",
    path: {
      mahasiswa: ["GET /mahasiswa", "GET /mahasiswa/nama", "GET /mahasiswa/jurusan/:jurusan", "GET /mahasiswa/semester/:semester", "GET /mahasiswa/nim/:nim", "POST /mahasiswa", "DELETE /mahasiswa/:nim"],
      dosen: ["GET /dosen", "GET /dosen/nama", "GET /dosen/matakuliah/:matakuliah", "PUT /:nidn", "POST /dosen", "DELETE /:nidn"],
      matakuliah: ["GET /matakuliah", "GET /matakuliah/nama_matakuliah", "GET /matakuliah/kode_matakuliah/:kode_matakuliah", "GET /matakuliah/nidn/:nidn", "PUT /:nidn", "POST /matakuliah", "DELETE /:nidn"],
    },
  });
});

app.get("/admin", adminAuth, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

app.post("/login", (req, res) => {
  // Proses autentikasi pengguna, jika berhasil, lakukan langkah berikut:
  const user = { id: 1, username: "john.doe" };

  const token = jwt.sign(user, "secret-key");
  res.json({ token });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
