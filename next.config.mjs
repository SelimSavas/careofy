const vercelHost = process.env.VERCEL_URL?.replace(/^https?:\/\//i, "") ?? "";
/** Vercel'de NEXTAUTH_URL unutulursa çerez / middleware kırılır; build sırasında VERCEL_URL'den üret. */
const shouldInferNextAuthUrl =
  process.env.VERCEL === "1" && vercelHost.length > 0 && !process.env.NEXTAUTH_URL?.trim();

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    ...(shouldInferNextAuthUrl ? { NEXTAUTH_URL: `https://${vercelHost}` } : {}),
  },
};

export default nextConfig;
