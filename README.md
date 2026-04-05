This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

1. **PostgreSQL**: Üretim için SQLite kullanılmaz. [Neon](https://neon.tech), Supabase veya Vercel Postgres ile boş bir veritabanı oluştur; bağlantı dizesini kopyala (`?sslmode=require` genelde gerekir).
2. **GitHub’a push**: Repoda uygulama `site/` altındaysa Vercel’de **Root Directory** = `site` seç.
3. **Ortam değişkenleri** (Vercel → Project → Settings → Environment Variables), Production ve Preview için:

| Değişken | Açıklama |
|----------|----------|
| `DATABASE_URL` | PostgreSQL connection string |
| `NEXTAUTH_URL` | Dağıtım URL’in, örn. `https://proje-adi.vercel.app` |
| `NEXTAUTH_SECRET` | `openssl rand -base64 32` ile üret |
| `ANTHROPIC_API_KEY` | İsteğe bağlı; yoksa analiz mock rapora düşer |
| `NEXT_PUBLIC_APP_URL` | Genelde `NEXTAUTH_URL` ile aynı |

4. **İlk deploy**: `npm run build` sırasında `prisma migrate deploy` çalışır; tablolar oluşur.

Yerel geliştirme: `.env` içinde `DATABASE_URL`’i PostgreSQL’e çevir, sonra `npx prisma migrate dev` (veya `deploy`) çalıştır. Eski SQLite `dev.db` artık kullanılmıyor.
