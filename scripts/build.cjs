/**
 * Vercel / CI: prisma migrate deploy şema için DIRECT_URL ister.
 * Yalnızca DATABASE_URL tanımlıysa (veya DIRECT_URL boşsa) migrate için onu kullanır.
 * Neon havuzlu (-pooler) DATABASE_URL kullanıyorsanız üretimde yine de ayrı DIRECT_URL ekleyin.
 */
const { execSync } = require("node:child_process");

const env = { ...process.env };
const db = String(env.DATABASE_URL || "").trim();
const direct = String(env.DIRECT_URL || "").trim();
if (!direct && db) {
  env.DIRECT_URL = db;
  console.warn(
    "[build] DIRECT_URL tanımlı değil; prisma migrate için DATABASE_URL kullanılıyor. " +
      "Neon havuzlu bağlantı kullanıyorsanız Vercel’e doğrudan (non-pooler) DIRECT_URL ekleyin."
  );
}

function run(cmd) {
  execSync(cmd, { stdio: "inherit", env });
}

run("npx prisma generate");
run("npx prisma migrate deploy");
run("npx next build");
