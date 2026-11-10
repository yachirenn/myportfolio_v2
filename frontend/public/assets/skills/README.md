# Logo Skills & Tools

Simpan logo SVG, PNG, atau WebP di folder ini. SVG disarankan untuk logo tajam di berbagai ukuran.

Daftar awal: React, TypeScript, Tailwind CSS, Vite, Bun, dan Git.
Semua sudah memiliki ikon bawaan sehingga file gambar belum wajib tersedia.

Ubah `frontend/src/data/skills.ts` untuk mengganti nama, kategori, warna, dan URL tujuan.
Tambahkan properti berikut pada item yang sesuai untuk memakai logo lokal:

```ts
imageSrc: '/assets/skills/react.svg',
```

URL aset dimulai dari `/assets/skills/`, bukan `/public/assets/skills/`.
Jika gambar gagal dimuat, ikon bawaan akan ditampilkan sebagai pengganti.
Gunakan logo berlatar transparan; gambar ditampilkan dengan ukuran 40 × 40 piksel.
