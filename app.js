const express = require("express");
const app = express();
const PORT = 8000;
const db = require("./src/connection/db");
const bodyParser = require("body-parser");
const adminAuth = require("./src/middleware/admin");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mahasiswaRoute = require("./src/controllers/mahasiswa.route");
const dosenRoute = require("./src/controllers/dosen.route");
const matakuliahRoute = require("./src/controllers/matakuliah.route");

app.use("/api/mahasiswa", mahasiswaRoute);
app.use("/api/dosen", dosenRoute);
app.use("/api/matakuliah", matakuliahRoute);

app.get("/", (req, res) => {
  res.json({
    autor: "Code dibuat oleh Ahmad Rofiqi",
    path: {
      mahasiswa: ["GET /api/mahasiswa", "GET /api/mahasiswa/nama", "GET /api/mahasiswa/jurusan/:jurusan", "GET /api/mahasiswa/semester/:semester", "GET /api/mahasiswa/nim/:nim", "PUT /api/:nim", "POST /api/mahasiswa", "DELETE /api/mahasiswa/:nim"],
      dosen: ["GET /api/dosen", "GET /api/dosen/nama", "GET /api/dosen/matakuliah/:matakuliah", "PUT /api/dosen/:nidn", "POST /api/dosen", "DELETE /api/dosen/:nidn"],
      matakuliah: [
        "GET /api/matakuliah",
        "GET /api/matakuliah/nama_matakuliah",
        "GET /api/matakuliah/kode_matakuliah/:kode_matakuliah",
        "GET /api/matakuliah/nidn/:nidn",
        "PUT /api/matakuliah/:nidn",
        "POST /api/matakuliah",
        "DELETE /api/matakuliah/:nidn",
      ],
    },
  });
});

app.get("/admin", adminAuth, (req, res) => {
  res.json({ message: "You have access to this protected route", user: req.user });
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  const user = { username: "admin", password: "admin" };
  if (username === user.username && password === user.password) {
    const token = jwt.sign(user, "secret-key");
    res.json({ token });
  }
  res.json({ message: "kamu tidak dapat akses" });
});

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
