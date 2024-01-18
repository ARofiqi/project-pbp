Project PBP

CREATE DATABASE IF NOT EXISTS db_kampus;

jangan lupa port di db connection disesuaikan

Membuat table :

CREATE TABLE IF NOT EXISTS mahasiswa (
  nim VARCHAR(20) PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  jurusan VARCHAR(50) NOT NULL,
  semester INT NOT NULL
);

CREATE TABLE IF NOT EXISTS dosen (
  nidn VARCHAR(20) PRIMARY KEY,
  nama VARCHAR(255) NOT NULL,
  gelar VARCHAR(50),
  mata_kuliah VARCHAR(100)
);

CREATE TABLE IF NOT EXISTS matakuliah (
  kode_matakuliah VARCHAR(10) PRIMARY KEY,
  nama_matakuliah VARCHAR(255) NOT NULL,
  jumlah_sks INT
);


Mengisi table dengan data:

INSERT INTO mahasiswa (nim, nama, jurusan, semester) VALUES
('12345', 'John Smith', 'Teknik Informatika', 3),
('67890', 'Jane Doe', 'Sistem Informasi', 4),
('54321', 'Bob Johnson', 'Manajemen Informatika', 2),
('98765', 'Alice Brown', 'Teknik Elektro', 5),
('13579', 'David White', 'Ilmu Komputer', 6);

INSERT INTO dosen (nidn, nama, gelar, mata_kuliah) VALUES
('123456789', 'Dr. John Doe', 'Ph.D.', 'Komputer Science'),
('234567890', 'Prof. Jane Smith', 'Prof.', 'Data Analytics'),
('345678901', 'Dr. Bob Johnson', 'Ph.D.', 'Artificial Intelligence'),
('456789012', 'Dr. Alice Brown', 'Ph.D.', 'Machine Learning'),
('567890123', 'Prof. David White', 'Prof.', 'Software Engineering');

INSERT INTO matakuliah (kode_matakuliah, nama_matakuliah, jumlah_sks) VALUES
('MK101', 'Pemrograman Web', 3),
('MK202', 'Basis Data', 4),
('MK303', 'Sistem Operasi', 3),
('MK404', 'Jaringan Komputer', 4),
('MK505', 'Algoritma dan Struktur Data', 3);

penetesan JWT token :
buat request baru di thunder client
masuk ke route POST /login
masuk ke body>form encode 
masukan username = admin, dan password admin
maka akan muncul tokennya
salin tokennya lalu
masuk ke route GET /admin
dan masuk ke tab header
tambahkan Autorization dan valuenya token tersebut
selesai
