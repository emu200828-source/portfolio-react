# Jurnal Vibecoding & Rekayasa Perangkat Lunak

**Nama:** Imu Abdurroofi

**Kelas:** XI

**Nama Proyek:** Personal Portfolio Website

**Link Vercel:** [https://imu-portfolio.vercel.app/]
**Link Github:** [https://github.com/emu200828-source/portfolio-react.git]

---

## 📦 1. Definisi Stack & Arsitektur

Pada proyek ini saya menggunakan ReactJS dengan Vite sebagai lingkungan pengembangan karena proses build dan pengembangannya cepat. Untuk navigasi antar halaman saya menggunakan React Router DOM sehingga website dapat memiliki beberapa halaman tanpa perlu melakukan reload browser.

Styling dilakukan menggunakan CSS murni agar lebih memahami dasar-dasar pengembangan antarmuka tanpa bantuan framework CSS. Untuk penyimpanan data sederhana pada halaman Contact, saya menggunakan localStorage sehingga data yang diketik pengguna tidak langsung hilang ketika halaman di-refresh.

Selain itu, saya menggunakan bantuan AI seperti ChatGPT dan OpenCode sebagai asisten dalam membantu membuat struktur kode, memperbaiki bug, serta memberikan ide desain.

### Struktur Folder

```
src/
├── components/
│   ├── Navbar
│   ├── Footer
│   ├── ProjectCard
│   └── ContactForm
├── pages/
│   ├── Home
│   ├── About
│   ├── Projects
│   └── Contact
├── assets/
├── styles/
└── App.jsx
```

### Alasan Pemisahan Komponen

Saya memisahkan komponen agar kode lebih terstruktur dan mudah dikelola. Navbar dan Footer digunakan berulang pada setiap halaman sehingga lebih efisien jika dibuat sebagai komponen terpisah. Komponen ProjectCard digunakan untuk menampilkan data project menggunakan metode `.map()` sehingga kode menjadi lebih rapi dan mudah dikembangkan.

---

## 💡 2. Strategi Prompting

### Prompt 1 (Fokus pada Logika dan State)

> Buatkan fitur Contact Form menggunakan React useState dan localStorage. Data nama, email, dan pesan harus tetap tersimpan ketika halaman di-refresh. Gunakan validasi sederhana dan tampilkan notifikasi ketika data berhasil disimpan.

### Prompt 2 (Fokus pada UI dan Routing)

> Buat website portfolio menggunakan ReactJS dan Vite dengan React Router DOM. Buat halaman Home, About, Projects, dan Contact. Gunakan CSS murni dengan desain modern, responsif, dan profesional. Setiap halaman harus memiliki navigasi yang konsisten.

### Hasil Evaluasi Prompt

AI dapat menghasilkan struktur dasar aplikasi dengan cukup baik. Namun, beberapa bagian masih perlu disesuaikan seperti perbaikan tampilan, penyesuaian warna, serta perbaikan logika localStorage. Dari pengalaman tersebut saya belajar bahwa kualitas hasil AI sangat dipengaruhi oleh kejelasan prompt yang diberikan.

---

## 🔧 3. Log Problem Solving

### Deskripsi Error / Bug

Saat melakukan deployment ke Vercel, website gagal melakukan proses build dan menampilkan error pada proses instalasi dependency.

### Langkah Investigasi

Saya memeriksa log deployment yang diberikan oleh Vercel untuk mengetahui penyebab error. Selain itu saya juga mencoba menjalankan perintah `npm run build` di komputer lokal untuk memastikan apakah aplikasi dapat dibangun tanpa masalah.

### Kolaborasi dengan AI

Saya meminta AI untuk membantu menganalisis log error dari Vercel serta memberikan langkah-langkah perbaikan yang perlu dilakukan. Saya juga menanyakan cara membuat file `.gitignore` yang benar dan cara membersihkan dependency yang bermasalah.

### Solusi Akhir

Setelah dianalisis, saya menemukan bahwa struktur project dan dependency perlu diperiksa kembali. Saya membuat file `.gitignore`, melakukan instalasi ulang dependency menggunakan `npm install`, serta memastikan aplikasi dapat berjalan dengan baik melalui `npm run build` sebelum melakukan deployment ulang ke Vercel. Dengan cara tersebut proses deployment berhasil dilakukan.

---

## 🎯 Refleksi Pribadi

Selama menggunakan metode Vibecoding, saya memahami bahwa AI bukan pengganti programmer. AI dapat membantu menulis kode lebih cepat, memberikan ide, dan membantu mencari solusi ketika terjadi error. Namun manusia tetap berperan sebagai arsitek yang menentukan tujuan aplikasi, menyusun struktur proyek, serta mengevaluasi apakah solusi yang diberikan AI sudah sesuai kebutuhan.

Saya juga belajar bahwa kemampuan memberikan prompt yang jelas sangat penting karena kualitas hasil yang diberikan AI bergantung pada instruksi yang diberikan. Oleh karena itu, programmer tetap harus memahami logika program agar dapat memanfaatkan AI secara efektif dan bertanggung jawab.