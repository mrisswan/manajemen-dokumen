-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Waktu pembuatan: 15 Bulan Mei 2023 pada 11.43
-- Versi server: 10.4.27-MariaDB
-- Versi PHP: 8.0.25

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `manajemen_dok`
--

-- --------------------------------------------------------

--
-- Struktur dari tabel `dokumen`
--

CREATE TABLE `dokumen` (
  `id_dokumen` int(11) NOT NULL,
  `judul_dokumen` varchar(255) DEFAULT NULL,
  `nama_pengunggah` varchar(255) DEFAULT NULL,
  `deskripsi` text DEFAULT NULL,
  `filenya` varchar(255) DEFAULT NULL,
  `tgl_upload` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `dokumen`
--

INSERT INTO `dokumen` (`id_dokumen`, `judul_dokumen`, `nama_pengunggah`, `deskripsi`, `filenya`, `tgl_upload`, `createdAt`, `updatedAt`) VALUES
(1, 'file', 'admin juga', 'berisiupdate', 'doc-1684060133559.docx', '2023-05-14 00:00:00', '2023-05-14 10:28:53', '2023-05-15 01:43:06'),
(2, 'File', 'admin juga', 'berisiupdate', 'doc-1684060151754.docx', '2023-05-14 00:00:00', '2023-05-14 10:29:11', '2023-05-15 01:36:50'),
(4, 'file', 'wwkwiw', 'hwuhuwhuw', 'doc-1684111178015.docx', '2023-05-15 00:00:00', '2023-05-15 00:39:38', '2023-05-15 01:51:50');

-- --------------------------------------------------------

--
-- Struktur dari tabel `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data untuk tabel `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20230119034053-create-user.js'),
('20230119034459-create-dokumen.js');

-- --------------------------------------------------------

--
-- Struktur dari tabel `user`
--

CREATE TABLE `user` (
  `id_user` int(11) NOT NULL,
  `nama_user` varchar(255) DEFAULT NULL,
  `role` enum('admin','customer') DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data untuk tabel `user`
--

INSERT INTO `user` (`id_user`, `nama_user`, `role`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Doni_admin', 'admin', 'doniadmin', '8c87199b50e2e7158c28d9b2b5ec27a6', '2023-05-14 09:58:41', '2023-05-14 09:58:41'),
(2, 'Doni_admin', 'admin', 'doniadmin', '8c87199b50e2e7158c28d9b2b5ec27a6', '2023-05-14 09:59:25', '2023-05-14 09:59:25'),
(3, 'Doni_user', 'customer', 'doniuser', 'd707598ff8a4f2fa1c09313ddf7642cd', '2023-05-15 02:41:52', '2023-05-15 02:41:52');

--
-- Indexes for dumped tables
--

--
-- Indeks untuk tabel `dokumen`
--
ALTER TABLE `dokumen`
  ADD PRIMARY KEY (`id_dokumen`);

--
-- Indeks untuk tabel `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indeks untuk tabel `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id_user`);

--
-- AUTO_INCREMENT untuk tabel yang dibuang
--

--
-- AUTO_INCREMENT untuk tabel `dokumen`
--
ALTER TABLE `dokumen`
  MODIFY `id_dokumen` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT untuk tabel `user`
--
ALTER TABLE `user`
  MODIFY `id_user` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
