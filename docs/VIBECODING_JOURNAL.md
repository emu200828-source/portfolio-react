# Jurnal Vibecoding

**Nama:** Imu Abdurroofi  
**Nama Proyek:** Web Portofolio Personal  
**Link Vercel:** https://imu-portfolio.vercel.app

---

## 1. Definisi Stack & Arsitektur

### Teknologi yang Digunakan

- **ReactJS + Vite** — React digunakan sebagai library utama untuk membangun UI berbasis komponen. Vite dipilih sebagai build tool karena cepat dalam proses development (Hot Module Replacement) dan optimasi build untuk production.
- **react-router-dom** — Digunakan untuk menangani routing SPA (Single Page Application) dengan empat halaman utama: Home, About, Project, dan Contact. Menggunakan `BrowserRouter`, `Routes`, dan `Route` untuk navigasi tanpa reload halaman.
- **CSS Murni (Vanilla CSS)** — Semua styling ditulis dengan CSS biasa tanpa framework. Menggunakan CSS Variables (`--bg-primary`, `--text-primary`, dll.) untuk mendukung tema gelap/terang. Setiap komponen memiliki file CSS sendiri yang diimport langsung.
- **useState** — Digunakan di halaman Contact untuk mengelola state form (nama, email, pesan) dan di komponen Navbar untuk menu mobile, serta di App untuk loading screen.
- **localStorage** — Digunakan untuk menyimpan data form Contact agar tidak hilang ketika halaman di-refresh. Juga digunakan untuk menyimpan preferensi tema (gelap/terang).
- **OpenCode / ChatGPT** — AI Assistant digunakan sebagai asisten coding untuk membantu debugging, optimalisasi kode, dan menyusun ulang komponen sesuai kebutuhan SKL.

### Alasan Pemisahan Komponen

Komponen dipisah ke dalam folder `components/`, `pages/`, dan `sections/` untuk menjaga modularitas dan reusability:

- **`pages/`** — Berisi halaman utama yang diret oleh React Router (Home, About, Projects, Contact). Setiap file mewakili satu rute.
- **`sections/`** — Berisi bagian-bagian yang digunakan di halaman Home (Hero, About, Skills, Projects, Contact, Footer). Ini adalah komponen yang bisa dipakai ulang.
- **`components/`** — Berisi komponen UI umum seperti Navbar, ThemeToggle, LoadingScreen, dan efek-efek (FloatingBlobs, MouseParallax).
- **`data/`** — Berisi file data lokal (`projects.js`) yang mengekspor array project untuk dirender menggunakan `.map()`.
- **`styles/`** — Semua file CSS dipisah per komponen agar mudah dikelola dan tidak terjadi bentrok class.
- **`context/`** — Berisi ThemeContext untuk state management tema global.

### Reusable Component

Beberapa komponen yang bersifat reusable:

- `PageTransition` — Wrapper untuk animasi transisi antar halaman menggunakan framer-motion.
- `FloatingBlobs` — Efek background animasi yang bisa dipasang di halaman mana pun.
- `MouseParallax` — Efek tilt 3D pada elemen yang dibungkus.
- `Tilt` (dari react-parallax-tilt) — Digunakan di setiap kartu project untuk efek 3D.

---

## 2. Strategi Prompting

### Prompt 1 — Fokus logika localStorage

**Prompt yang diberikan:**

> "Tolong buatkan komponen Contact form di React yang menggunakan useState untuk mengelola input name, email, dan message. Setiap kali user mengetik, data otomatis tersimpan ke localStorage. Saat halaman di-refresh, data harus muncul kembali. Tambahkan validasi sederhana dan pesan sukses setelah submit."

**Hasil evaluasi:**
AI memberikan solusi dengan inisialisasi state dari `localStorage.getItem()` dan `useEffect` untuk menyimpan data setiap kali state berubah. Solusi ini sudah sesuai, namun AI awalnya tidak menyertakan validasi untuk field kosong. Prompt perlu diperbaiki dengan menambahkan spesifikasi validasi.

**Perbaikan prompt:**

> "Tambahkan juga validasi: jika nama atau email atau message kosong, tampilkan alert peringatan dan jangan submit. Hanya tampilkan pesan sukses jika semua field sudah diisi."

### Prompt 2 — Fokus routing dan UI

**Prompt yang diberikan:**

> "Saya punya project React Vite dengan routing menggunakan react-router-dom. Saat ini route untuk halaman project adalah /projects. Tolong ubah semua navigasi dan link dari /projects menjadi /project (tanpa 's'). Perbarui Navbar, Footer, tombol CTA di Hero, dan tombol 'View All Projects' di beranda."

**Hasil evaluasi:**
AI berhasil mengidentifikasi semua file yang perlu diubah: `App.jsx`, `Navbar.jsx`, `Footer.jsx`, `Hero.jsx`, dan `sections/Projects.jsx`. Semua perubahan route berjalan dengan baik. Namun AI sempat melakukan duplikasi edit pada satu file karena prompt kurang spesifik tentang urutan perubahan.

**Perbaikan prompt:**

> "Ubah route di App.jsx terlebih dahulu, baru setelah itu perbarui semua link yang mengarah ke /projects di komponen Navbar, Footer, Hero, dan sections/Projects. Jangan ubah path di file lain selain yang disebutkan."

---

## 3. Log Problem Solving

### Bug: White Screen Setelah Deploy ke Vercel

**Masalah:**
Setelah melakukan deploy pertama ke Vercel, halaman yang muncul adalah white screen kosong. Tidak ada error yang terlihat di console browser.

**Investigasi:**
1. Pertama saya cek apakah build berhasil dengan menjalankan `npm run build` di lokal — build sukses.
2. Saya coba `npm run preview` untuk melihat hasil build — halaman muncul dengan normal.
3. Setelah deploy ulang, white screen masih muncul.
4. Saya buka Vercel Dashboard dan cek log deployment — tidak ada error build.
5. Saya cek Network tab di browser — file JavaScript dan CSS berhasil dimuat (status 200).

**Bantuan AI:**
Saya bertanya ke ChatGPT: "React app white screen after Vercel deploy but works fine locally with npm run preview."

AI menjelaskan bahwa kemungkinan masalahnya ada pada konfigurasi routing. Karena menggunakan `BrowserRouter`, Vercel tidak tahu cara menangani routing SPA. Ketika user mengakses `/about` langsung, Vercel mencari file `about.html` yang tidak ada, sehingga mengembalikan 404 dan React tidak bisa jalan.

**Solusi Akhir:**
Menambahkan file `vercel.json` di root project dengan konfigurasi rewrite rules:

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]
}
```

File ini memberitahu Vercel untuk selalu mengembalikan `index.html` untuk semua route, sehingga React Router bisa menangani routing di sisi klien. Setelah menambahkan file ini dan deploy ulang, halaman berjalan normal.

---

## 4. Refleksi Pribadi

Sebagai siswa SMK RPL, saya belajar bahwa menjadi developer bukan hanya tentang menulis kode, tetapi tentang menjadi arsitek solusi.

**Peran manusia sebagai arsitek:**
Saya menyadari bahwa AI tidak bisa menggantikan peran saya dalam memahami kebutuhan proyek. Saya yang harus menentukan struktur folder, teknologi yang digunakan, dan bagaimana komponen-komponen saling terhubung. AI hanya membantu menulis kode berdasarkan instruksi yang saya berikan.

**AI sebagai asisten coding:**
ChatGPT dan OpenCode sangat membantu dalam mempercepat proses coding, terutama untuk debugging dan mencari solusi atas error yang tidak saya pahami. Namun AI juga bisa membuat kesalahan atau memberikan solusi yang kurang optimal. Saya tetap harus memahami kode yang dihasilkan.

**Pentingnya problem solving:**
Saat menghadapi white screen setelah deploy, saya tidak langsung panik. Saya melakukan investigasi langkah demi langkah: cek build lokal, cek preview, cek log Vercel, cek Network tab. Kemampuan problem solving ini sangat penting dan tidak bisa digantikan AI.

**Pentingnya membuat prompt yang jelas:**
Dari pengalaman menggunakan AI, saya belajar bahwa prompt yang jelas dan spesifik menghasilkan kode yang lebih baik. Misalnya, saat meminta bantuan untuk localStorage, saya harus menyebutkan secara detail: state apa yang perlu disimpan, kapan harus disimpan, dan bagaimana memulihkannya saat refresh. Prompt yang ambigu menghasilkan kode yang perlu diperbaiki berkali-kali.

Kesimpulannya, AI adalah alat yang powerful, tapi saya sebagai developer tetap harus mengerti fundamental coding, arsitektur, dan problem solving agar bisa memanfaatkan AI secara efektif.
