# Portofolio Putra Izhar Gumilar

Struktur:
- public/ : situs statis (index.html, style.css, script.js, assets/)
- netlify/functions/feedback.mjs : API penilaian di /api/feedback (Netlify Blobs)

## Deploy dari GitHub
1. Buat repo kosong di GitHub, lalu dari folder ini jalankan:
   git init && git add . && git commit -m "Portofolio awal"
   git branch -M main
   git remote add origin https://github.com/USERNAME/NAMA-REPO.git
   git push -u origin main
2. Di Netlify: Add new site > Import an existing project > GitHub > pilih repo.
3. Build command dikosongkan. Publish directory: public (sudah terbaca dari netlify.toml). Klik Deploy.

## Sebelum publish
- Ganti email dan tautan GitHub/LinkedIn di bagian Kontak pada public/index.html.
- Ganti public/assets/profile.jpg dengan foto yang sudah di-crop persegi.
